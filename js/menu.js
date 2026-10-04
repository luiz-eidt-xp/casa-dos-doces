(function () {
  "use strict";

  var toggle = document.querySelector("[data-menu-toggle]");
  var menu = document.querySelector("[data-menu]");
  var backdrop = document.querySelector("[data-menu-backdrop]");
  var closeBtn = document.querySelector("[data-menu-close]");
  if (!toggle || !menu || !backdrop) return;

  // O menu só é "drawer" abaixo de 1100px (mesmo ponto de quebra do CSS).
  var mobile = window.matchMedia("(max-width: 1100px)");
  var firstLink = menu.querySelector("a");

  function isOpen() {
    return menu.classList.contains("is-open");
  }

  // Fora do modo mobile o menu é navegação normal: nada de aria-hidden/inert.
  function syncState() {
    if (mobile.matches) {
      var open = isOpen();
      menu.inert = !open;
      menu.setAttribute("aria-hidden", String(!open));
    } else {
      menu.inert = false;
      menu.removeAttribute("aria-hidden");
      if (isOpen()) setOpen(false);
    }
  }

  function setOpen(open) {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    backdrop.hidden = !open;
    document.documentElement.classList.toggle("scroll-locked", open);
    if (mobile.matches) {
      menu.inert = !open;
      menu.setAttribute("aria-hidden", String(!open));
    }
    if (open && firstLink) firstLink.focus();
  }

  function close() {
    setOpen(false);
    toggle.focus();
  }

  toggle.addEventListener("click", function () { setOpen(!isOpen()); });
  backdrop.addEventListener("click", close);
  if (closeBtn) closeBtn.addEventListener("click", close);

  // Clicar num link fecha o menu; o foco segue o scroll nativo da âncora.
  menu.addEventListener("click", function (event) {
    if (event.target.closest("a") && isOpen()) setOpen(false);
  });

  document.addEventListener("keydown", function (event) {
    if (!isOpen()) return;
    if (event.key === "Escape") { close(); return; }

    // Mantém o Tab dentro do menu enquanto ele está aberto.
    if (event.key === "Tab") {
      var items = menu.querySelectorAll("a[href], button:not([disabled])");
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  if (mobile.addEventListener) mobile.addEventListener("change", syncState);
  else mobile.addListener(syncState);
  syncState();
}());
