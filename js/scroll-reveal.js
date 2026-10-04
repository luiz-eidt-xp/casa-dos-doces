(function () {
  "use strict";

  var hasIO = "IntersectionObserver" in window;

  /* ---------- Header: estado "rolado" ---------- */
  var header = document.querySelector("[data-header]");
  if (header) {
    if (hasIO) {
      var sentinel = document.createElement("span");
      sentinel.className = "sr-only";
      sentinel.setAttribute("aria-hidden", "true");
      document.body.insertBefore(sentinel, document.body.firstChild);
      new IntersectionObserver(function (entries) {
        header.classList.toggle("is-scrolled", !entries[0].isIntersecting);
      }).observe(sentinel);
    } else {
      header.classList.add("is-scrolled");
    }
  }

  /* ---------- Link ativo no menu conforme a seção visível ---------- */
  var links = document.querySelectorAll(".site-nav__link[href^='#']");
  if (hasIO && links.length) {
    var map = {};
    links.forEach(function (link) { map[link.getAttribute("href").slice(1)] = link; });
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = map[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("is-active"); l.removeAttribute("aria-current"); });
          link.classList.add("is-active");
          link.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
  }

  /* ---------- Reveal ---------- */
  var items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  if (!hasIO) {
    items.forEach(function (item) { item.classList.add("is-visible"); });
    return;
  }

  // Stagger só entre irmãos (cards de uma mesma grade), com teto de 240ms.
  items.forEach(function (item) {
    var siblings = item.parentElement.querySelectorAll(":scope > .reveal");
    var index = Array.prototype.indexOf.call(siblings, item);
    item.style.setProperty("--reveal-delay", Math.min(index, 4) * 60 + "ms");
  });

  var observer = new IntersectionObserver(function (entries, current) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      current.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  items.forEach(function (item) { observer.observe(item); });
}());
