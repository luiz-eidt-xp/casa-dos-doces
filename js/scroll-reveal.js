(function () {
  "use strict";
  var header = document.querySelector("[data-header]");
  if (header) {
    var sentinel = document.createElement("span");
    sentinel.className = "sr-only";
    sentinel.setAttribute("aria-hidden", "true");
    header.parentNode.insertBefore(sentinel, header);
    if ("IntersectionObserver" in window) {
      var headerObserver = new IntersectionObserver(function (entries) { header.classList.toggle("is-scrolled", !entries[0].isIntersecting); });
      headerObserver.observe(sentinel);
    } else header.classList.add("is-scrolled");
  }
  var items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  if (!("IntersectionObserver" in window)) { items.forEach(function (item) { item.classList.add("is-visible"); }); return; }
  var observer = new IntersectionObserver(function (entries, currentObserver) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });
  items.forEach(function (item, index) { item.style.setProperty("--reveal-delay", (index % 8) * 80 + "ms"); observer.observe(item); });
}());
