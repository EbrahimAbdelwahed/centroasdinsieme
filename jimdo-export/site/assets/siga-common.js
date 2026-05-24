(function () {
  var root = document.querySelector(".siga-site, .siga-block");
  if (!root) return;

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
