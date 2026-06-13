/* letter.js — abre o envelope e exibe a carta em capítulos.
   O texto vem de data/messages.js (MF_DATA.letter.capitulos). */
(function () {
  "use strict";

  function init() {
    var envelope = document.getElementById("envelope");
    if (!envelope) return;

    var container = document.getElementById("letter-chapters");
    var data = (window.MF_DATA && window.MF_DATA.letter) || { capitulos: [] };
    var chapters = data.capitulos || [];
    var currentChapter = 0;
    var opened = false;
    var reduce = window.MF && window.MF.prefersReduced;

    if (container) container.innerHTML = "";

    function typeChapter(index) {
      if (!container || index >= chapters.length) return;
      var chap = chapters[index];
      
      var block = document.createElement("div");
      block.className = "chapter-block reveal-fast"; // Classe para fade-in suave
      
      var title = document.createElement("h3");
      title.className = "chapter-title";
      title.textContent = chap.titulo;
      
      var textEl = document.createElement("p");
      textEl.className = "chapter-text";
      
      block.appendChild(title);
      block.appendChild(textEl);
      container.appendChild(block);

      if (reduce) {
        textEl.textContent = chap.texto;
        showNextButton(index, block);
        return;
      }

      var i = 0;
      var fullText = chap.texto;
      var caret = document.createElement("span");
      caret.className = "caret";
      caret.textContent = " ";
      textEl.appendChild(caret);

      (function tick() {
        if (i < fullText.length) {
          caret.insertAdjacentText("beforebegin", fullText.charAt(i));
          i += 1;
          setTimeout(tick, 20); // velocidade de digitação
        } else {
          caret.remove();
          showNextButton(index, block);
        }
      })();
    }

    function showNextButton(index, block) {
      if (index < chapters.length - 1) {
        var btn = document.createElement("button");
        btn.className = "btn btn--sm chapter-next-btn";
        btn.textContent = "Ler próximo capítulo";
        btn.style.marginTop = "20px";
        btn.style.marginBottom = "30px";
        btn.addEventListener("click", function () {
          btn.remove(); // remove button when clicked
          currentChapter++;
          if (window.MF && window.MF.garden) window.MF.garden.plant("carta_cap_" + currentChapter);
          typeChapter(currentChapter);
        });
        block.appendChild(btn);
      } else {
        // Last chapter ending
        var endMsg = document.createElement("p");
        endMsg.className = "chapter-end";
        endMsg.textContent = "♥";
        endMsg.style.textAlign = "center";
        endMsg.style.marginTop = "30px";
        endMsg.style.color = "var(--mf-accent)";
        block.appendChild(endMsg);
      }
    }

    function open() {
      if (opened) return;
      opened = true;
      envelope.classList.add("is-open");
      envelope.setAttribute("aria-expanded", "true");
      var hint = envelope.querySelector(".envelope__hint");
      if (hint) hint.textContent = "💌";
      
      if (window.MF && window.MF.garden) window.MF.garden.plant("carta_aberta");
      setTimeout(function() { typeChapter(0); }, 650);
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
