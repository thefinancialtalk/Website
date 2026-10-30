/**
 * Events page — "event collaborators" cards.
 *
 * HAND-OFF FRIENDLY — to add, remove, or reorder a collaborator you only touch
 * the COLLABORATORS list below:
 *   1. (Optional) Drop their photo/logo into  assets/images/events/
 *      — a square image (about 400x400px) looks best.
 *   2. Add a line with their name, Instagram handle (no @), and image path.
 * The Events page updates automatically. If an image file is missing, their
 * initials are shown instead, so the card always looks finished.
 */
(function () {
  var COLLABORATORS = [
    { name: "My Inner Fire Healing", handle: "my_inner_fire_healing",            image: "assets/images/events/my-inner-fire-healing.jpg" },
    { name: "Miss Nancita Bonita",   handle: "miss_nancita_bonita_promotions",   image: "assets/images/events/miss-nancita-bonita.jpg" },
    { name: "Paola Rojas",           handle: "paolarojas0216",                   image: "assets/images/events/paola-rojas.jpg" },
    { name: "Largo",                 handle: "drinklargo",                       image: "assets/images/events/largo.jpg" },
    { name: "Pure Luxe",             handle: "pureluxecareofficial",             image: "assets/images/events/pure-luxe.jpg" }
  ];

  function initials(name) {
    return name.split(/\s+/).slice(0, 2).map(function (w) { return w.charAt(0); }).join("").toUpperCase();
  }

  function makeCard(c) {
    var a = document.createElement("a");
    a.className = "card collab-card";
    a.href = "https://www.instagram.com/" + c.handle;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("data-reveal", "scale");
    a.setAttribute("aria-label", c.name + " — Instagram @" + c.handle);

    var avatar = document.createElement("span");
    avatar.className = "collab-avatar";
    var fallback = document.createElement("span");
    fallback.className = "collab-initials";
    fallback.textContent = initials(c.name);
    avatar.appendChild(fallback);

    var img = document.createElement("img");
    img.src = c.image;
    img.alt = c.name;
    img.loading = "lazy";
    // Only show the image once it has actually loaded; otherwise keep initials.
    img.addEventListener("load", function () {
      avatar.textContent = "";
      avatar.appendChild(img);
    });

    var name = document.createElement("h3");
    name.textContent = c.name;

    var handle = document.createElement("p");
    handle.className = "collab-handle";
    handle.textContent = "@" + c.handle;

    a.appendChild(avatar);
    a.appendChild(name);
    a.appendChild(handle);
    return a;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var grid = document.querySelector("[data-collab-grid]");
    if (!grid) return;
    COLLABORATORS.forEach(function (c) { grid.appendChild(makeCard(c)); });
  });
})();
