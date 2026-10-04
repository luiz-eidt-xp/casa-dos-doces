(function () {
  "use strict";

  var form = document.querySelector("[data-wa-form]");
  if (!form) return;

  var name = form.elements.name;
  var eventField = form.elements.event;
  var date = form.elements.date;
  var message = form.elements.message;
  var status = form.querySelector("[data-form-status]");
  var root = window.Confeitaria;
  if (!root || !root.buildWhatsAppUrl) return;

  function setError(field, text) {
    var error = document.getElementById("error-" + field.name);
    if (error) error.textContent = text || "";
    field.setAttribute("aria-invalid", text ? "true" : "false");
  }

  // Data mínima = hoje (horário local)
  var today = new Date();
  date.min = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + String(today.getDate()).padStart(2, "0");

  // O erro some assim que a pessoa corrige o campo
  name.addEventListener("input", function () { if (name.value.trim()) setError(name, ""); });
  eventField.addEventListener("change", function () { if (eventField.value) setError(eventField, ""); });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    setError(name, "");
    setError(eventField, "");

    var firstInvalid = null;
    if (!name.value.trim()) { setError(name, "Informe seu nome."); firstInvalid = firstInvalid || name; }
    if (!eventField.value) { setError(eventField, "Escolha o tipo de evento."); firstInvalid = firstInvalid || eventField; }
    if (firstInvalid) {
      status.hidden = true;
      firstInvalid.focus();
      return;
    }

    var text = "Olá! Me chamo " + name.value.trim() + ". Quero um orçamento para " + eventField.value;
    if (date.value) {
      var parts = date.value.split("-");
      text += ", data desejada: " + parts[2] + "/" + parts[1] + "/" + parts[0];
    }
    if (message.value.trim()) text += ". " + message.value.trim();

    var url = root.buildWhatsAppUrl(text);

    // window.open com "noopener" SEMPRE retorna null, o que fazia o aviso de
    // falha aparecer mesmo com o WhatsApp aberto. Abrimos normalmente e
    // cortamos o vínculo com a página depois.
    var popup = window.open(url, "_blank");
    if (popup) popup.opener = null;

    status.hidden = false;
    status.textContent = popup
      ? "Abrimos o WhatsApp para você continuar o pedido."
      : "Se o WhatsApp não abriu, use o link:";

    if (!popup) {
      var link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Abrir o WhatsApp";
      status.appendChild(document.createTextNode(" "));
      status.appendChild(link);
    }
  });
}());
