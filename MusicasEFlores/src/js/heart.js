/* heart.js — desenha um coração animado num canvas que cobre a tela.
   Expõe window.drawHeart() para ser chamado por botões/surpresas. */
(function () {
  "use strict";

  var drawing = false;

  function getCanvas() {
    var canvas = document.getElementById("heartCanvas");
    if (!canvas) return null;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    return canvas;
  }

  // equações paramétricas clássicas do coração
  function heartX(k) {
    return 16 * Math.pow(Math.sin(k), 3);
  }
  function heartY(k) {
    return (
      13 * Math.cos(k) -
      5 * Math.cos(2 * k) -
      2 * Math.cos(3 * k) -
      Math.cos(4 * k)
    );
  }

  window.drawHeart = function drawHeart() {
    var canvas = getCanvas();
    if (!canvas || drawing) return;
    drawing = true;

    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var scale = Math.min(canvas.width, canvas.height) / 45;
    var offsetX = canvas.width / 2;
    var offsetY = canvas.height / 2;

    ctx.strokeStyle = "#ff5d8f";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.shadowColor = "rgba(255, 93, 143, 0.6)";
    ctx.shadowBlur = 12;
    ctx.beginPath();

    var i = 0;
    var steps = 628; // ~2*PI*100

    function step() {
      if (i >= steps) {
        setTimeout(function () {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          drawing = false;
        }, 2200);
        return;
      }
      var t = i / 100;
      var x = heartX(t) * scale;
      var y = heartY(t) * scale;
      if (i === 0) ctx.moveTo(offsetX + x, offsetY - y);
      else ctx.lineTo(offsetX + x, offsetY - y);
      ctx.stroke();
      i += 1;
      requestAnimationFrame(step);
    }
    step();
  };
})();
