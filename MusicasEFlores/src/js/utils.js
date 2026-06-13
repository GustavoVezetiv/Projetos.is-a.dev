/* utils.js — funções utilitárias compartilhadas entre os módulos.
   Evita duplicação de esc() e centraliza o caminho de mídia. */
(function () {
  "use strict";

  var MF = (window.MF = window.MF || {});

  // Caminho base das mídias — troque só aqui se renomear a pasta.
  MF.MEDIA_BASE = "Spotfy/Imagens/MeuAmor/";

  // Escapa HTML para prevenir injeção acidental.
  MF.esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  };
})();
