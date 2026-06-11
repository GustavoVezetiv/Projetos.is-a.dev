/* garden.js — o jardim que cresce conforme a Sabrina interage.
   Cada ação (abrir carta, ver música, abrir memória, etc.) planta uma
   florzinha. O estado fica salvo no navegador, então o jardim continua
   crescido quando ela voltar. */
(function () {
  "use strict";

  var MF = (window.MF = window.MF || {});
  var KEY = "mf-jardim";
  var seeds = new Set();

  try {
    var saved = JSON.parse(localStorage.getItem(KEY) || "[]");
    if (Array.isArray(saved)) saved.forEach(function (s) { seeds.add(s); });
  } catch (e) {}

  function persist() {
    try {
      localStorage.setItem(KEY, JSON.stringify(Array.from(seeds)));
    } catch (e) {}
  }

  function flowerNode(animate) {
    var f = document.createElement("div");
    f.className = "g-flower";
    f.innerHTML =
      '<span class="g-flower__stem"></span><span class="g-flower__bloom"></span>';
    if (!animate || MF.prefersReduced) f.style.animation = "none";
    return f;
  }

  function updateCount() {
    var el = document.getElementById("garden-count");
    if (!el) return;
    var n = seeds.size;
    el.textContent =
      n === 0
        ? "Explore a página e veja o nosso jardim florescer. 🌱"
        : n + (n === 1 ? " florzinha nasceu " : " florzinhas nasceram ") + "🌸";
  }

  function appendFlower(animate) {
    var garden = document.getElementById("garden");
    if (!garden) return;
    garden.appendChild(flowerNode(animate));
  }

  var garden = {
    plant: function (seedId) {
      if (!seedId || seeds.has(seedId)) return false;
      seeds.add(seedId);
      persist();
      appendFlower(true);
      updateCount();
      return true;
    },
    count: function () {
      return seeds.size;
    },
    // floresce tudo no final (garante um jardim cheio)
    bloomAll: function () {
      var alvo = 18;
      var faltam = Math.max(0, alvo - seeds.size);
      var i = 0;
      for (var k = 0; k < faltam; k++) {
        seeds.add("bloom:" + Date.now() + ":" + k);
      }
      persist();
      // planta as que faltam com um pequeno atraso entre elas
      (function plantNext() {
        if (i >= faltam) {
          updateCount();
          return;
        }
        appendFlower(true);
        i++;
        setTimeout(plantNext, MF.prefersReduced ? 0 : 90);
      })();
      updateCount();
    },
    render: function () {
      var g = document.getElementById("garden");
      if (!g) return;
      g.innerHTML = "";
      seeds.forEach(function () {
        appendFlower(false);
      });
      updateCount();
    }
  };

  MF.garden = garden;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      garden.render();
    });
  } else {
    garden.render();
  }
})();
