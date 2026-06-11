/* theme.js — alterna entre tema claro (dia) e escuro (noite)
   e lembra a escolha no localStorage. */
(function () {
  "use strict";

  var STORAGE_KEY = "musicas-e-flores-tema";
  var root = document.documentElement;

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      var isDark = theme === "dark";
      btn.textContent = isDark ? "☀️" : "🌙";
      btn.setAttribute(
        "aria-label",
        isDark ? "Mudar para o tema claro" : "Mudar para o tema escuro"
      );
    }
  }

  // tema inicial: a escolha salva, senão o claro (rosa/creme) — é um presente,
  // a primeira impressão deve ser suave e clara. A noite fica no botão.
  var saved = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch (e) {}

  var initial = saved === "dark" || saved === "light" ? saved : "light";
  apply(initial);

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("theme-toggle");
    apply(root.getAttribute("data-theme")); // garante o ícone certo
    if (!btn) return;

    btn.addEventListener("click", function () {
      var next =
        root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      apply(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {}
    });
  });
})();
