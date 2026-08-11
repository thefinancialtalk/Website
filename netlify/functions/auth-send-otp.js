// netlify/functions/auth-send-otp.js
// Generates a 6-digit OTP, stores it in Supabase, emails it via Resend.
// POST { email: "user@example.com" }

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY   // service role key — never expose to browser
);

function generateOTP() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  let email;
  try {
    ({ email } = JSON.parse(event.body));
    email = String(email || '').trim().toLowerCase();
    if (!email || !email.includes('@')) throw new Error('Invalid email');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Valid email required' }) };
  }

  // Open access: anyone who submits a valid email is sent a 6-digit code.
  const otp        = generateOTP();
  const expiresAt  = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 min

  // Upsert OTP record — one row per email, always overwritten on resend
  const { error: dbError } = await supabase
    .from('otp_codes')
    .upsert({ email, otp, expires_at: expiresAt, used: false }, { onConflict: 'email' });

  if (dbError) {
    console.error('Supabase upsert error:', dbError);
    return { statusCode: 500, body: JSON.stringify({ error: 'Could not store OTP' }) };
  }

  // Send email via Resend (https://resend.com — free tier: 3,000 emails/month)
  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
    },
    body: JSON.stringify({
      from:    'The Financial Talk <noreply@thefinancialtalk.com>',  // must be a Resend-verified domain
      to:      [email],
      subject: 'Your Budget Dashboard access code',
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;">
          <h2 style="font-size:20px;font-weight:600;margin:0 0 8px;">Your access code</h2>
          <p style="color:#6b7280;margin:0 0 24px;font-size:14px;">
            Enter this code on The Financial Talk to unlock your Budget Dashboard.
            It expires in 10 minutes.
          </p>
          <div style="background:#f3f4f6;border-radius:10px;padding:20px;text-align:center;margin-bottom:24px;">
            <span style="font-size:36px;font-weight:700;letter-spacing:10px;color:#1a1917;">${otp}</span>
          </div>
          <p style="color:#9ca3af;font-size:12px;margin:0;">
            If you did not request this, ignore this email. No account has been created.
          </p>
        </div>
      `
    })
  });

  if (!emailRes.ok) {
    const detail = await emailRes.text();
    console.error('Resend error:', detail);
    return { statusCode: 500, body: JSON.stringify({ error: 'Could not send email' }) };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: true })
  };
};
