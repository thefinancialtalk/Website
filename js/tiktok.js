/**
 * Renders a "Latest on TikTok" grid on the What's new page.
 *
 * TO ADD / CHANGE VIDEOS: paste the video links into TIKTOK_VIDEOS below —
 * one per line, in quotes. Grab a link from the TikTok app or website via
 * the video's "Share → Copy link" button. Full URLs or bare video IDs both
 * work. Reorder or delete lines freely; the newest usually goes first.
 *
 * Example:
 *   const TIKTOK_VIDEOS = [
 *     "https://www.tiktok.com/@thefinancialtalk/video/7412345678901234567",
 *     "https://www.tiktok.com/@thefinancialtalk/video/7398765432109876543",
 *   ];
 *
 * No videos listed yet? The section shows a "Follow on TikTok" card instead.
 */
const TIKTOK_HANDLE = "thefinancialtalk";
const TIKTOK_PROFILE = `https://www.tiktok.com/@${TIKTOK_HANDLE}`;

const TIKTOK_VIDEOS = [
  "https://www.tiktok.com/@thefinancialtalk/video/7644000508826455314",
  // Add more videos here — one link per line, newest first.
];

/** Pull the numeric video id out of a full URL or return a bare id as-is. */
function tiktokVideoId(urlOrId) {
  const str = String(urlOrId).trim();
  const match = str.match(/video\/(\d+)/);
  if (match) return match[1];
  return /^\d+$/.test(str) ? str : "";
}

function renderTikTok() {
  const list = document.querySelector("[data-tiktok-list]");
  const fallback = document.querySelector("[data-tiktok-empty]");
  if (!list) return;

  const ids = TIKTOK_VIDEOS.map(tiktokVideoId).filter(Boolean);

  if (!ids.length) {
    if (fallback) fallback.hidden = false;
    return;
  }
  if (fallback) fallback.hidden = true;

  list.innerHTML = ids
    .map(
      (id) => `
      <blockquote class="tiktok-embed" cite="${TIKTOK_PROFILE}/video/${id}"
        data-video-id="${id}" style="max-width:605px;min-width:325px;margin:0;">
        <section><a href="${TIKTOK_PROFILE}/video/${id}" target="_blank" rel="noopener noreferrer">@${TIKTOK_HANDLE}</a></section>
      </blockquote>`
    )
    .join("");

  loadTikTokScript();
}

/**
 * Load (or re-run) TikTok's embed script. It scans the page for
 * .tiktok-embed blockquotes and swaps them for real video players. We add it
 * only after the blockquotes exist so it finds them on first load.
 */
function loadTikTokScript() {
  const existing = document.getElementById("tiktok-embed-script");
  if (existing) {
    // Script already present — ask it to re-scan for the new blockquotes.
    if (window.tiktokEmbed && window.tiktokEmbed.lib) {
      window.tiktokEmbed.lib.render(document.querySelectorAll(".tiktok-embed"));
    }
    return;
  }
  const script = document.createElement("script");
  script.id = "tiktok-embed-script";
  script.async = true;
  script.src = "https://www.tiktok.com/embed.js";
  document.body.appendChild(script);
}

document.addEventListener("DOMContentLoaded", renderTikTok);
