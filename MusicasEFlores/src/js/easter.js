/* easter.js — pequenos segredos escondidos. As mensagens vêm de
   data/messages.js (MF_DATA.secrets). Discreto, só 3 segredinhos. */
(function () {
  "use strict";

  function secret(i) {
    var s = (window.MF_DATA && window.MF_DATA.secrets) || [];
    return s[i] || "Você encontrou um pedacinho escondido do meu coração. 💗";
  }

  function init() {
    // 1) coraçãozinho discreto no rodapé
    var heart = document.getElementById("secret-heart");
    if (heart) {
      heart.addEventListener("click", function () {
        window.MF.openCard("Shhh...", secret(0));
      });
    }

    // 2) presentinho flutuante
    var gift = document.getElementById("gift-egg");
    if (gift) {
      gift.addEventListener("click", function () {
        window.MF.openCard("Um presentinho 🎁", secret(1));
        if (typeof window.drawHeart === "function") window.drawHeart();
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
          window.MF.openCard("", secret(2));
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
