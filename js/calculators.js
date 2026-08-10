/**
 * Interactive financial calculators for the Services page.
 * - Debt payoff: balance + APR + monthly payment -> time, payoff date, interest.
 * - Investment growth: initial + monthly + return% + years -> future value + breakdown.
 *
 * Fully bilingual: all copy lives in TRANSLATIONS.<lang>.calc and results
 * re-render on the site's "ft:langchange" event. No dependencies.
 */
(function () {
  var root = document.querySelector("[data-calc]");
  if (!root) return;

  function lang() {
    return document.documentElement.getAttribute("lang") || "en";
  }

  function t(path) {
    var node = TRANSLATIONS[lang()];
    var parts = path.split(".");
    for (var i = 0; i < parts.length; i++) {
      if (node == null) return "";
      node = node[parts[i]];
    }
    return node == null ? "" : node;
  }

  function locale() {
    return lang() === "es" ? "es-ES" : "en-US";
  }

  function money(n) {
    return "$" + new Intl.NumberFormat(locale(), { maximumFractionDigits: 0 }).format(Math.round(n));
  }

  function duration(months) {
    var y = Math.floor(months / 12);
    var m = months % 12;
    var u = TRANSLATIONS[lang()].calc.units;
    var parts = [];
    if (y) parts.push(y + " " + (y === 1 ? u.year : u.years));
    if (m || !y) parts.push(m + " " + (m === 1 ? u.month : u.months));
    return parts.join(" ");
  }

  function payoffDate(months) {
    var d = new Date();
    d.setMonth(d.getMonth() + months);
    return new Intl.DateTimeFormat(locale(), { month: "long", year: "numeric" }).format(d);
  }

  function num(id) {
    var v = parseFloat(document.getElementById(id).value);
    return isFinite(v) && v >= 0 ? v : 0;
  }

  function stat(label, value, primary) {
    return (
      '<div class="calc-stat' + (primary ? " calc-stat--primary" : "") + '">' +
      '<span class="calc-stat-label">' + label + "</span>" +
      '<span class="calc-stat-value">' + value + "</span>" +
      "</div>"
    );
  }

  /* ---------- Debt payoff ---------- */
  function renderDebt() {
    var out = root.querySelector('[data-calc-results="debt"]');
    var balance = num("debt-balance");
    var rate = num("debt-rate");
    var payment = num("debt-payment");

    if (balance <= 0 || payment <= 0) {
      out.innerHTML = "";
      return;
    }

    var mRate = rate / 100 / 12;
    if (mRate > 0 && payment <= balance * mRate) {
      out.innerHTML = '<p class="calc-warning">' + t("calc.debt.warning") + "</p>";
      return;
    }

    var bal = balance;
    var months = 0;
    var interest = 0;
    if (mRate === 0) {
      months = Math.ceil(balance / payment);
    } else {
      while (bal > 0 && months < 1200) {
        var i = bal * mRate;
        interest += i;
        bal = bal + i - payment;
        months++;
      }
    }
    var totalPaid = balance + interest;

    out.innerHTML =
      '<div class="calc-stats">' +
      stat(t("calc.debt.payoffTime"), duration(months), true) +
      stat(t("calc.debt.payoffDate"), payoffDate(months)) +
      stat(t("calc.debt.totalInterest"), money(interest)) +
      stat(t("calc.debt.totalPaid"), money(totalPaid)) +
      "</div>";
  }

  /* ---------- Investment growth ---------- */
  function renderInvest() {
    var out = root.querySelector('[data-calc-results="invest"]');
    var initial = num("invest-initial");
    var monthly = num("invest-monthly");
    var rate = num("invest-rate");
    var years = num("invest-years");

    if (years <= 0 || (initial <= 0 && monthly <= 0)) {
      out.innerHTML = "";
      return;
    }

    var n = Math.round(years * 12);
    var r = rate / 100 / 12;
    var fv;
    if (r === 0) {
      fv = initial + monthly * n;
    } else {
      fv = initial * Math.pow(1 + r, n) + monthly * ((Math.pow(1 + r, n) - 1) / r);
    }
    var contrib = initial + monthly * n;
    var growth = Math.max(0, fv - contrib);
    var cPct = fv > 0 ? Math.round((contrib / fv) * 100) : 100;

    out.innerHTML =
      '<div class="calc-stats">' +
      stat(t("calc.invest.futureValue"), money(fv), true) +
      stat(t("calc.invest.totalContributions"), money(contrib)) +
      stat(t("calc.invest.totalGrowth"), money(growth)) +
      "</div>" +
      '<div class="calc-bar" aria-hidden="true">' +
      '<span class="calc-bar-seg calc-bar-seg--contrib" style="width:' + cPct + '%"></span>' +
      '<span class="calc-bar-seg calc-bar-seg--growth" style="width:' + (100 - cPct) + '%"></span>' +
      "</div>" +
      '<div class="calc-legend">' +
      '<span><i class="calc-swatch calc-swatch--contrib"></i>' + t("calc.invest.contribLabel") + "</span>" +
      '<span><i class="calc-swatch calc-swatch--growth"></i>' + t("calc.invest.growthLabel") + "</span>" +
      "</div>";
  }

  function renderAll() {
    renderDebt();
    renderInvest();
  }

  /* ---------- Tabs ---------- */
  var tabs = Array.prototype.slice.call(root.querySelectorAll("[data-calc-tab]"));
  var panels = Array.prototype.slice.call(root.querySelectorAll("[data-calc-panel]"));

  function activate(name, focusTab) {
    tabs.forEach(function (tab) {
      var on = tab.getAttribute("data-calc-tab") === name;
      tab.classList.toggle("is-active", on);
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
      if (on && focusTab) tab.focus();
    });
    panels.forEach(function (panel) {
      var on = panel.getAttribute("data-calc-panel") === name;
      panel.classList.toggle("is-active", on);
      panel.hidden = !on;
    });
  }

  tabs.forEach(function (tab, idx) {
    tab.addEventListener("click", function () {
      activate(tab.getAttribute("data-calc-tab"));
    });
    tab.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      var next = e.key === "ArrowRight" ? (idx + 1) % tabs.length : (idx - 1 + tabs.length) % tabs.length;
      activate(tabs[next].getAttribute("data-calc-tab"), true);
    });
  });

  root.addEventListener("input", renderAll);
  document.addEventListener("ft:langchange", renderAll);
  renderAll();
})();
