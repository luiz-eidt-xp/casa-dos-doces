(function () {
  "use strict";
  var toggle = document.querySelector("[data-menu-toggle]");
  var menu = document.querySelector("[data-menu]");
  var backdrop = document.querySelector("[data-menu-backdrop]");
  if (!toggle || !menu || !backdrop) return;
  var firstLink = menu.querySelector("a");
  function setOpen(open) {
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    backdrop.hidden = !open;
    document.documentElement.classList.toggle("scroll-locked", open);
    if (open && firstLink) firstLink.focus();
  }
  toggle.addEventListener("click", function () { setOpen(!menu.classList.contains("is-open")); });
  backdrop.addEventListener("click", function () { setOpen(false); toggle.focus(); });
  menu.addEventListener("click", function (event) { if (event.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", function (event) { if (event.key === "Escape" && menu.classList.contains("is-open")) { setOpen(false); toggle.focus(); } });
  window.addEventListener("resize", function () { if (window.innerWidth > 1100 && menu.classList.contains("is-open")) setOpen(false); });
}());
