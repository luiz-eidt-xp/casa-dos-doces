(function () {
  "use strict";

  // Ano automático do rodapé
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  // Parallax leve do hero (desligado com prefers-reduced-motion)
  var heroImage = document.querySelector("[data-parallax]");
  if (!heroImage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var ticking = false;

  function update() {
    var y = Math.min(window.scrollY, 500);
    heroImage.style.transform = "translate3d(0," + (y * 0.045) + "px,0)";
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}());
