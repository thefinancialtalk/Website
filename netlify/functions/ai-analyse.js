// netlify/functions/ai-analyse.js
// Accepts a sanitised summary of the user's budget (no raw transactions)
// and returns a streamed analysis from Claude.
//
// POST {
//   period:     "Jul 28 – Aug 10, 2026",
//   categories: [ { label, actual, target, variance, pct } ],
//   income:     { employment, gov, refunds, total },
//   net:        number,
//   debt:       { total, student, cc },
//   trends:     [ { period, spent, income } ],   // last 6 periods
//   lang:       "en" | "es"
// }
// Authorization: Bearer <jwt>

const crypto = require('crypto');

function base64url(buf) {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function verifyJWT(token) {
  try {
    const [header, body, sig] = token.split('.');
    const expected = base64url(
      crypto.createHmac('sha256', process.env.JWT_SECRET)
            .update(`${header}.${body}`)
            .digest()
    );
    if (sig !== expected) return null;
    const payload = JSON.parse(Buffer.from(body, 'base64').toString());
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

function fmt(n) {
  return '$' + Math.abs(n).toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function buildPrompt(data, lang) {
  const langNote = lang === 'es'
    ? 'Respond entirely in Spanish (Canadian context, CAD currency).'
    : 'Respond in English (Canadian context, CAD currency).';

  const catRows = data.categories
    .filter(c => c.actual > 0 || c.target > 0)
    .map(c => {
      const status = c.pct >= 100 ? 'OVER BUDGET' : c.pct >= 85 ? 'near limit' : 'within budget';
      return `  - ${c.label}: ${fmt(c.actual)} spent of ${fmt(c.target)} target (${c.pct.toFixed(0)}% — ${status})`;
    }).join('\n');

  const trendRows = (data.trends || [])
    .map(t => `  - ${t.period}: spent ${fmt(t.spent)}, income ${fmt(t.income)}, net ${fmt(t.income - t.spent)}`)
    .join('\n');

  return `You are a practical personal finance advisor reviewing a Canadian user's bi-weekly budget dashboard. ${langNote}

PERIOD: ${data.period}

SPENDING BY CATEGORY:
${catRows}

INCOME THIS PERIOD:
  - Employment: ${fmt(data.income.employment)}
  - Government / GST / rebates: ${fmt(data.income.gov)}
  - Refunds & reimbursements: ${fmt(data.income.refunds)}
  - Total income: ${fmt(data.income.total)}

NET CASH FLOW: ${fmt(data.net)} (${data.net >= 0 ? 'surplus' : 'deficit'})

DEBT PAYMENTS:
  - Credit card payments: ${fmt(data.debt.cc)}
  - Student loans: ${fmt(data.debt.student)}
  - Total debt payments: ${fmt(data.debt.total)}

RECENT 6-PERIOD TREND:
${trendRows || '  (no trend data yet)'}

Based on this data, provide a structured analysis with these exact sections:

**Spending patterns** — 2–3 specific observations using the actual numbers. Note any categories that are over budget or trending upward.

**Recommendations** — 2–3 concrete, actionable steps to improve cash flow or reduce spending this period. Be specific, not generic.

**Savings & debt outlook** — One observation about debt payment trajectory and one about savings opportunity given the current net flow.

**Overall summary** — One direct sentence assessing financial health this period.

Rules:
- Use the actual dollar amounts from the data.
- Do not provide investment advice or recommend specific financial products.
- Do not be preachy. Be direct and practical.
- Keep the full response under 350 words.
- Do not add disclaimers beyond one short note at the end if legally necessary.`;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const auth = event.headers['authorization'] || '';
  const token = auth.replace('Bearer ', '').trim();
  const payload = verifyJWT(token);

  if (!payload) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Invalid or expired session' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const prompt = buildPrompt(body, body.lang || 'en');

  // Call Claude — non-streaming (Netlify Functions have a 10s default timeout;
  // streaming requires background functions or Response Streaming, noted below)
  const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type':         'application/json',
      'x-api-key':            process.env.ANTHROPIC_API_KEY,
      'anthropic-version':    '2023-06-01'
    },
    body: JSON.stringify({
      model:      'claude-sonnet-4-6',
      max_tokens: 1024,
      messages:   [{ role: 'user', content: prompt }]
    })
  });

  if (!claudeRes.ok) {
    const detail = await claudeRes.text();
    console.error('Claude API error:', detail);
    return { statusCode: 502, body: JSON.stringify({ error: 'AI analysis unavailable' }) };
  }

  const claudeData = await claudeRes.json();
  const analysis   = claudeData.content?.[0]?.text || '';

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: true, analysis })
  };
};
