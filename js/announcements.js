/**
 * Renders content/announcements.json into the "Latest updates" section on
 * the homepage. Content is edited via the Decap CMS at /admin — this file
 * just fetches and displays it, no build step involved. Re-renders on
 * language switch (see the "ft:langchange" event dispatched by i18n.js).
 */
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}

function formatAnnouncementDate(dateStr, lang) {
  const date = new Date(`${dateStr}T00:00:00`);
  if (isNaN(date)) return dateStr || "";
  return date.toLocaleDateString(lang === "es" ? "es" : "en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function renderAnnouncements(items) {
  const list = document.querySelector("[data-announcements-list]");
  const empty = document.querySelector("[data-announcements-empty]");
  if (!list) return;

  const lang = getCurrentLanguage();
  list.innerHTML = "";

  if (!items.length) {
    if (empty) empty.hidden = false;
    return;
  }
  if (empty) empty.hidden = true;

  items
    .slice()
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
    .forEach((item) => {
      const title = (lang === "es" && item.title_es) || item.title_en || "";
      const body = (lang === "es" && item.body_es) || item.body_en || "";
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <span class="card-tag">${escapeHtml(formatAnnouncementDate(item.date, lang))}</span>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(body)}</p>
      `;
      list.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector("[data-announcements-list]");
  if (!list) return;

  fetch("content/announcements.json")
    .then((res) => (res.ok ? res.json() : { items: [] }))
    .then((data) => {
      const items = data.items || [];
      renderAnnouncements(items);
      document.addEventListener("ft:langchange", () => renderAnnouncements(items));
    })
    .catch(() => {
      const empty = document.querySelector("[data-announcements-empty]");
      if (empty) empty.hidden = false;
    });
});
