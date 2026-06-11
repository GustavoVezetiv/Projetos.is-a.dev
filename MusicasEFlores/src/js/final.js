/* final.js — a pergunta final, a chuva de corações, o jardim que
   floresce por completo e o botão de voltar ao início. */
(function () {
  "use strict";

  function heartRain(ms) {
    if (!window.MF || !window.MF.heartBurst || window.MF.prefersReduced) return;
    var until = ms || 4000;
    var elapsed = 0;
    var t = setInterval(function () {
      window.MF.heartBurst();
      elapsed += 450;
      if (elapsed >= until) clearInterval(t);
    }, 450);
  }

  function init() {
    var host = document.getElementById("finalq");
    if (!host) return;
    var q = (window.MF_DATA && window.MF_DATA.finalQuestion) || {};

    var question = document.getElementById("finalq-question");
    var buttons = document.getElementById("finalq-buttons");
    var result = document.getElementById("finalq-result");
    if (question) question.textContent = q.pergunta || "";

    var answered = false;
    function accept() {
      if (answered) return;
      answered = true;
      if (result) {
        result.textContent = q.mensagemFinal || "";
        result.classList.add("is-visible");
      }
      heartRain(4500);
      if (typeof window.drawHeart === "function") window.drawHeart();
      if (window.MF && window.MF.garden) {
        window.MF.garden.plant("sim");
        window.MF.garden.bloomAll();
      }
      var jardim = document.getElementById("jardim-final");
      if (jardim) {
        setTimeout(function () {
          jardim.scrollIntoView({ behavior: "smooth" });
        }, 1400);
      }
      var top = document.getElementById("back-top");
      if (top) top.hidden = false;
    }

    if (buttons) {
      var sim = document.createElement("button");
      sim.type = "button";
      sim.className = "btn btn--lg";
      sim.textContent = q.simLabel || "Sim";
      sim.addEventListener("click", accept);

      var claro = document.createElement("button");
      claro.type = "button";
      claro.className = "btn btn--lg";
      claro.textContent = q.claroLabel || "Claro que sim!";
      claro.addEventListener("click", accept);

      // botão brincalhão que foge (no máximo 3 vezes, pra não irritar)
      var shy = document.createElement("button");
      shy.type = "button";
      shy.className = "btn btn--ghost btn--shy";
      shy.textContent = "Deixa eu pensar...";
      var dodges = 0;
      var canHover =
        window.matchMedia && window.matchMedia("(hover: hover)").matches;
      if (canHover && !(window.MF && window.MF.prefersReduced)) {
        shy.addEventListener("mouseenter", function () {
          if (dodges >= 3) return;
          dodges++;
          var dx = (Math.random() - 0.5) * 180;
          var dy = (Math.random() - 0.5) * 80;
          shy.style.transform = "translate(" + dx + "px," + dy + "px)";
        });
      }
      shy.addEventListener("click", function () {
        shy.style.transform = "";
        window.MF.openCard("É, né...", "Pensar tudo bem, mas a resposta você já sabe. 😏💗");
      });

      buttons.appendChild(sim);
      buttons.appendChild(claro);
      buttons.appendChild(shy);
    }

    var back = document.getElementById("back-top");
    if (back) {
      back.addEventListener("click", function () {
        var topEl = document.getElementById("inicio");
        if (topEl) topEl.scrollIntoView({ behavior: "smooth" });
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
