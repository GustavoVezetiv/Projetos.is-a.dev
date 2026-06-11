/* saudade.js — "Modo saudade": deixa a página noturna e estrelada,
   mostra uma frase e planta uma florzinha. Tem botão para voltar. */
(function () {
  "use strict";

  var FRASE = "Mesmo longe, você continua sendo a parte mais perto de mim. 🌙";

  function init() {
    var btn = document.getElementById("saudade-toggle");
    var phrase = document.getElementById("saudade-phrase");
    if (!btn) return;
    if (phrase) phrase.textContent = FRASE;

    btn.addEventListener("click", function () {
      var on = document.body.classList.toggle("saudade");
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.innerHTML = on ? "Voltar ao normal ☀️" : "Modo saudade 🌙";
      if (on && window.MF && window.MF.garden) {
        window.MF.garden.plant("saudade");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
