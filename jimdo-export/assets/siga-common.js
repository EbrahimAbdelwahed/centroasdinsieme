(function () {
  document.documentElement.classList.add("siga-js");

  var root = document.querySelector(".siga-site, .siga-block");
  if (!root) return;

  var icons = {
    home: '<svg class="siga-nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5"></path><path d="M5 10v10h14V10"></path><path d="M9 20v-6h6v6"></path></svg>',
    services: '<svg class="siga-nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path><path d="M8 5v14"></path></svg>',
    contacts: '<svg class="siga-nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6.5h16v11H4z"></path><path d="m4 7 8 6 8-6"></path></svg>',
    search: '<svg class="siga-nav-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"></circle><path d="m16 16 4 4"></path></svg>',
    back: '<svg class="siga-back-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 14 4 9l5-5"></path><path d="M4 9h10a6 6 0 0 1 0 12h-2"></path></svg>'
  };

  function normalizeLabel(text) {
    return (text || "").toLowerCase().replace(/\s+/g, " ").trim();
  }

  function iconForLabel(label) {
    if (label.indexOf("home") !== -1) return icons.home;
    if (label.indexOf("servizi") !== -1 || label.indexOf("fitness") !== -1) return icons.services;
    if (label.indexOf("contatti") !== -1) return icons.contacts;
    if (label.indexOf("cerca") !== -1) return icons.search;
    if (label.indexOf("torna") !== -1) return icons.back;
    return "";
  }

  document.querySelectorAll(".siga-floating-nav a, .siga-floating-nav button").forEach(function (item) {
    var label = item.getAttribute("aria-label") || normalizeLabel(item.textContent);
    var icon = iconForLabel(label);
    if (!icon) return;
    item.setAttribute("aria-label", label.charAt(0).toUpperCase() + label.slice(1));
    item.innerHTML = icon + '<span class="siga-sr-only">' + label + '</span>';
  });

  document.querySelectorAll(".siga-btn-back").forEach(function (item) {
    var label = item.textContent.trim() || "Torna indietro";
    item.innerHTML = icons.back + '<span class="siga-back-label">' + label + '</span>';
  });

  var heroCopy = document.querySelector(".siga-hero-copy, .siga-hero-grid > div:first-child");
  if (heroCopy) heroCopy.setAttribute("data-siga-reveal", "");

  var revealItems = document.querySelectorAll(".siga-hero-copy[data-siga-reveal]");
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach(function (item) {
      item.classList.add("siga-is-revealed");
    });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("siga-is-revealed");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.22 });
    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  }

  var floating = document.querySelector(".siga-floating-nav");
  function updateFloating() {
    if (!floating) return;
    floating.classList.toggle("siga-is-visible", window.scrollY > 220);
  }
  updateFloating();
  window.addEventListener("scroll", updateFloating, { passive: true });

  var searchPanel = document.querySelector(".siga-search-panel");
  var searchInput = document.querySelector("[data-siga-search-input]");
  var searchResults = document.querySelector("[data-siga-search-results]");
  var toggles = document.querySelectorAll("[data-siga-search-toggle]");
  var pages = [
    ["Home", "index.html", "/"],
    ["Servizi", "servizi.html", "/servizi/"],
    ["Contatti", "contatti.html", "/contatti/"],
    ["Neuropsichiatria Infantile", "services/neuropsichiatria-infantile.html", "/servizi/neuropsichiatria-infantile/"],
    ["Valutazione Diagnostica DSA", "services/valutazione-diagnostica-dsa.html", "/servizi/valutazione-diagnostica-dsa/"],
    ["Doposcuola specializzato DSA", "services/doposcuola-specializzato-dsa.html", "/servizi/doposcuola-specializzato-dsa/"],
    ["Training attenzione e memoria", "services/training-attenzione-memoria.html", "/servizi/training-attenzione-memoria/"],
    ["Logopedia", "services/logopedia.html", "/servizi/logopedia/"],
    ["Neuropsicomotricita", "services/neuropsicomotricita.html", "/servizi/neuropsicomotricita/"],
    ["Counseling", "services/counseling.html", "/servizi/counseling/"],
    ["Dietistica", "services/dietistica.html", "/servizi/dietistica/"],
    ["Fitness", "services/fitness.html", "/servizi/fitness/"],
    ["Piloga", "services/fitness-piloga.html", "/servizi/fitness-piloga/"],
    ["Body Sculpture", "services/fitness-body-sculpture.html", "/servizi/fitness-body-sculpture/"],
    ["Ginnastica posturale", "services/fitness-ginnastica-posturale.html", "/servizi/fitness-ginnastica-posturale/"]
  ];

  function isLocalPreview() {
    return window.location.pathname.indexOf("/jimdo-export/site/") !== -1 ||
      window.location.pathname.slice(-5) === ".html";
  }

  function resolveHref(item) {
    if (!isLocalPreview()) return item[2];
    var prefix = window.location.pathname.indexOf("/services/") !== -1 ? "../" : "";
    return prefix + item[1];
  }

  function renderResults(query) {
    if (!searchResults) return;
    var q = (query || "").toLowerCase().trim();
    var matches = pages.filter(function (item) {
      return !q || item[0].toLowerCase().indexOf(q) !== -1;
    }).slice(0, 8);
    searchResults.innerHTML = matches.map(function (item) {
      return '<a href="' + resolveHref(item) + '">' + item[0] + '</a>';
    }).join("");
  }

  function openSearch() {
    if (!searchPanel) return;
    searchPanel.classList.add("siga-is-open");
    searchPanel.setAttribute("aria-hidden", "false");
    renderResults(searchInput ? searchInput.value : "");
    if (searchInput) searchInput.focus();
  }

  toggles.forEach(function (button) {
    button.addEventListener("click", openSearch);
  });

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      renderResults(searchInput.value);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && searchPanel) {
      searchPanel.classList.remove("siga-is-open");
      searchPanel.setAttribute("aria-hidden", "true");
    }
  });
}());
