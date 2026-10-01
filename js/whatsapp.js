(function () {
  "use strict";
  var root = window.Confeitaria = window.Confeitaria || {};
  root.WA_NUMBER = "5500000000000";
  root.buildWhatsAppUrl = function (message) {
    return "https://wa.me/" + root.WA_NUMBER + "?text=" + encodeURIComponent(message || "Olá! Vim pelo site e gostaria de fazer uma encomenda 🧁");
  };
  document.querySelectorAll("[data-wa]").forEach(function (link) {
    var type = link.getAttribute("data-wa");
    var message = "Olá! Vim pelo site da Casa dos Doces e gostaria de fazer uma encomenda 🧁";
    if (type === "contact") message = "Olá! Vim pelo site da Casa dos Doces e gostaria de pedir um orçamento.";
    link.href = root.buildWhatsAppUrl(message);
  });
}());
