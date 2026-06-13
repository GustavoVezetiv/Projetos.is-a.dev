/* memories.js — monta a linha do tempo "Nossa jornada".
   Dados em data/memories.js (MF_DATA.timeline). */
(function () {
  "use strict";

  function build() {
    var tl = document.getElementById("timeline");
    if (!tl) return;
    var items = (window.MF_DATA && window.MF_DATA.timeline) || [];
    var BASE = (window.MF && window.MF.MEDIA_BASE) || "Spotfy/Imagens/MeuAmor/";
    var esc = (window.MF && window.MF.esc) || function (s) { return String(s == null ? "" : s); };

    items.forEach(function (m) {
      var item = document.createElement("div");
      item.className = "tl-item reveal";

      var html =
        '<span class="tl-item__dot" aria-hidden="true">' +
        (m.icone || "💗") +
        "</span>" +
        '<h3 class="tl-item__title">' +
        esc(m.titulo) +
        "</h3>" +
        '<p class="tl-item__date">' +
        esc(m.data || "") +
        "</p>";

      if (m.foto) {
        html +=
          '<img class="tl-item__photo" loading="lazy" alt="' +
          esc(m.titulo) +
          '" src="' +
          BASE +
          m.foto +
          '">';
      }
      html += '<p class="tl-item__text">' + esc(m.frase) + "</p>";
      item.innerHTML = html;
      tl.appendChild(item);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();

