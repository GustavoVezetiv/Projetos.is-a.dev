/* letter.js — abre o envelope e "digita" a carta.
   O texto vem de data/messages.js (MF_DATA.letter.paragrafos),
   então é lá que você edita a carta. Abrir a carta planta uma flor. */
(function () {
  "use strict";

  function init() {
    var envelope = document.getElementById("envelope");
    if (!envelope) return;

    var textEl = envelope.querySelector(".letter__text");
    var data = (window.MF_DATA && window.MF_DATA.letter) || { paragrafos: [] };
    var fullText = data.paragrafos.join("\n\n");
    var opened = false;

    var reduce = window.MF && window.MF.prefersReduced;
    if (textEl) textEl.textContent = "";

    function typeText() {
      if (!textEl) return;
      if (reduce) {
        textEl.textContent = fullText;
        return;
      }
      var i = 0;
      var caret = document.createElement("span");
      caret.className = "caret";
      caret.textContent = " ";
      textEl.appendChild(caret);
      (function tick() {
        if (i < fullText.length) {
          caret.insertAdjacentText("beforebegin", fullText.charAt(i));
          i += 1;
          setTimeout(tick, 22);
        } else {
          setTimeout(function () {
            caret.remove();
          }, 1200);
        }
      })();
    }

    function open() {
      if (opened) return;
      opened = true;
      envelope.classList.add("is-open");
      envelope.setAttribute("aria-expanded", "true");
      var hint = envelope.querySelector(".envelope__hint");
      if (hint) hint.textContent = "💌";
      if (window.MF && window.MF.garden) window.MF.garden.plant("carta");
      setTimeout(typeText, 650);
    }

    envelope.addEventListener("click", open);
    envelope.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
