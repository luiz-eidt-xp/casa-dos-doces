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
  function setError(field, text) {
    var error = document.getElementById("error-" + field.name);
    if (error) error.textContent = text || "";
    field.setAttribute("aria-invalid", text ? "true" : "false");
  }
  var today = new Date();
  date.min = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + String(today.getDate()).padStart(2, "0");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    setError(name, ""); setError(eventField, "");
    var valid = true;
    if (!name.value.trim()) { setError(name, "Informe seu nome."); valid = false; }
    if (!eventField.value) { setError(eventField, "Escolha o tipo de evento."); valid = false; }
    if (!valid) { status.hidden = true; return; }
    var messageText = "Olá! Me chamo " + name.value.trim() + ". Quero um orçamento para " + eventField.value;
    if (date.value) { var parts = date.value.split("-"); messageText += ", data desejada: " + parts[2] + "/" + parts[1] + "/" + parts[0]; }
    if (message.value.trim()) messageText += ". " + message.value.trim();
    var url = root.buildWhatsAppUrl(messageText);
    var popup = window.open(url, "_blank", "noopener");
    status.hidden = false;
    status.textContent = popup ? "Abrimos o WhatsApp para você continuar o pedido." : "Se o WhatsApp não abriu, use o botão abaixo.";
    if (!popup) { var link = document.createElement("a"); link.href = url; link.target = "_blank"; link.rel = "noopener noreferrer"; link.textContent = "Abrir o WhatsApp"; status.appendChild(document.createTextNode(" ")); status.appendChild(link); }
  });
}());
