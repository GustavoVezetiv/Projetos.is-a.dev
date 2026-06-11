/* card/script.js — abre/fecha o cartão sem jQuery.
   No desktop: passa o mouse. No celular: toca. */
(function () {
  "use strict";

  var area = document.getElementById("card-area");
  if (!area) return;

  var card = area.querySelector(".card");
  if (!card) return;

  // desktop (hover)
  area.addEventListener("mouseenter", function () {
    card.classList.add("up");
  });
  area.addEventListener("mouseleave", function () {
    card.classList.remove("up");
  });

  // celular / toque (alterna ao clicar)
  area.addEventListener("click", function () {
    card.classList.toggle("up");
  });
})();
