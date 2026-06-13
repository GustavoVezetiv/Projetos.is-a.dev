/* gallery.js — galeria estilo polaroid + abertura no modal compartilhado.
   Os dados vêm de data/memories.js (MF_DATA.gallery). Abrir uma memória
   planta uma florzinha no jardim. */
(function () {
  "use strict";

  // Caminho centralizado em utils.js; fallback seguro caso utils.js não carregue.
  var MEDIA_BASE = (window.MF && window.MF.MEDIA_BASE) || "Spotfy/Imagens/MeuAmor/";

  function build() {
    var grid = document.getElementById("gallery");
    if (!grid) return;
    var items = (window.MF_DATA && window.MF_DATA.gallery) || [];

    items.forEach(function (item) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "polaroid";
      btn.setAttribute("aria-label", "Abrir: " + (item.cap || "memória"));

      var media = document.createElement("span");
      media.className =
        "polaroid__media" +
        (item.type === "video" ? " polaroid__media--video" : "");

      var el;
      if (item.type === "video") {
        el = document.createElement("video");
        el.src = MEDIA_BASE + item.file;
        el.muted = true;
        el.preload = "metadata"; // não baixa o vídeo todo
      } else {
        el = document.createElement("img");
        el.src = MEDIA_BASE + item.file;
        el.alt = item.cap || "Nossa memória";
        el.loading = "lazy";
        el.decoding = "async";
      }
      media.appendChild(el);
      btn.appendChild(media);

      var cap = document.createElement("span");
      cap.className = "polaroid__cap";
      cap.textContent = item.cap || "";
      btn.appendChild(cap);

      btn.addEventListener("click", function () {
        if (window.MF) {
          window.MF.openMedia(item.type, MEDIA_BASE + item.file, item.cap);
          if (window.MF.garden) window.MF.garden.plant("mem:" + item.file);
        }
      });

      grid.appendChild(btn);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
