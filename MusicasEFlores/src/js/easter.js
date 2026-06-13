/* easter.js — pequenos segredos escondidos. As mensagens vêm de
   data/messages.js (MF_DATA.hiddenSecrets). */
(function () {
  "use strict";

  function getSecret(i) {
    var s = (window.MF_DATA && window.MF_DATA.hiddenSecrets) || [];
    if (i < s.length) return s[i];
    return "Você encontrou um pedacinho escondido do meu coração. 💗";
  }

  function init() {
    // 1) coraçãozinho discreto no rodapé
    var heart = document.getElementById("secret-heart");
    if (heart) {
      heart.addEventListener("click", function () {
        window.MF.openCard("Shhh...", getSecret(0));
        if (window.MF && window.MF.garden) window.MF.garden.plant("secret_0");
      });
    }

    // 2) presentinho flutuante
    var gift = document.getElementById("gift-egg");
    if (gift) {
      gift.addEventListener("click", function () {
        window.MF.openCard("Um presentinho 🎁", getSecret(1));
        if (typeof window.drawHeart === "function") window.drawHeart();
        if (window.MF && window.MF.garden) window.MF.garden.plant("secret_1");
      });
    }

    // 3) toque 3x na foto do início
    var photo = document.querySelector(".hero__photo");
    if (photo) {
      var clicks = 0,
        timer = null;
      photo.style.cursor = "pointer";
      photo.addEventListener("click", function () {
        clicks++;
        clearTimeout(timer);
        timer = setTimeout(function () {
          clicks = 0;
        }, 800);
        if (clicks >= 3) {
          clicks = 0;
          window.MF.openCard("", getSecret(2));
          if (window.MF && window.MF.garden) window.MF.garden.plant("secret_2");
        }
      });
    }

    // Gerar easter eggs aleatórios
    var secretsArr = (window.MF_DATA && window.MF_DATA.hiddenSecrets) || [];
    for (var i = 3; i < secretsArr.length; i++) {
        var el = document.createElement("button");
        el.className = "secret-heart";
        el.textContent = "♡";
        el.style.position = "absolute";
        el.style.opacity = "0.08";
        el.style.fontSize = "16px";
        el.style.border = "none";
        el.style.background = "none";
        el.style.cursor = "pointer";
        el.style.zIndex = "10";
        el.setAttribute("aria-label", "Um segredinho escondido");
        
        // Random placement near the edges (10% to 90%)
        el.style.top = (Math.random() * 80 + 10) + "%";
        el.style.left = (Math.random() * 80 + 10) + "%";
        
        // Use closure to capture index
        (function(idx, elem) {
          elem.addEventListener("click", function() {
              window.MF.openCard("Você achou!", getSecret(idx));
              if (window.MF && window.MF.garden) window.MF.garden.plant("secret_" + idx);
              elem.style.transform = "scale(2)";
              elem.style.opacity = "0";
              setTimeout(function(){ elem.remove(); }, 300);
          });
        })(i, el);
        
        document.body.appendChild(el);
    }

    // Clique na "Sabrina" (easter egg do nome)
    var sabs = document.querySelectorAll(".name-sabrina");
    sabs.forEach(function(el) {
        el.style.cursor = "pointer";
        el.style.position = "relative";
        el.addEventListener("click", function() {
            window.MF.openCard("Ei!", "Ué, achei que seu nome era amor.");
            if (window.MF && window.MF.garden) window.MF.garden.plant("secret_sabrina");
            el.style.color = "var(--accent)";
        });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
