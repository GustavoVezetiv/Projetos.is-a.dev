/* surprises.js — monta as seções interativas e fofas:
   Cofre, Números, Museu, Abrir Quando, Roletas, Raspadinha, etc. */
(function () {
  "use strict";

  function plant(id) {
    if (window.MF && window.MF.garden) window.MF.garden.plant(id);
  }
  function D() {
    return window.MF_DATA || {};
  }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) {
    return (window.MF && window.MF.esc) ? window.MF.esc(s) : String(s == null ? "" : s);
  }

  /* ---------- 1. Cofre do Nosso Amor ---------- */
  function buildVault() {
    var btn = document.getElementById("vault-btn");
    var input = document.getElementById("vault-input");
    var err = document.getElementById("vault-error");
    var content = document.getElementById("vault-content");
    var msg = document.getElementById("vault-message");
    if (!btn || !input) return;

    btn.addEventListener("click", function() {
      var vaultData = D().vault || { senha: "sabrina", mensagemSecreta: "Eu te amo" };
      if (input.value.toLowerCase().trim() === vaultData.senha.toLowerCase()) {
        err.textContent = "";
        input.disabled = true;
        btn.disabled = true;
        msg.textContent = vaultData.mensagemSecreta;
        content.hidden = false;
        content.classList.add("reveal-fast");
        plant("cofre_aberto");
      } else {
        err.textContent = "Senha incorreta. Tente de novo...";
        input.value = "";
      }
    });
  }

  /* ---------- 2. A gente em números ---------- */
  function buildStats() {
    var grid = document.getElementById("stats-grid");
    if (!grid) return;

    // Calcular dinamicamente datas
    var startDate = new Date(2023, 9, 16); // 16 de Outubro de 2023
    var now = new Date();
    
    // Dias completos
    var diffTime = now - startDate;
    var diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Anos, meses, dias aproximados
    var m1 = startDate.getMonth();
    var y1 = startDate.getFullYear();
    var d1 = startDate.getDate();
    
    var m2 = now.getMonth();
    var y2 = now.getFullYear();
    var d2 = now.getDate();
    
    var years = y2 - y1;
    var months = m2 - m1;
    var days = d2 - d1;
    
    if (days < 0) {
      months -= 1;
      // dias do mes passado
      var prevMonth = new Date(y2, m2, 0).getDate();
      days += prevMonth;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    
    var timeString = "";
    if (years > 0) timeString += years + (years > 1 ? " anos, " : " ano, ");
    if (months > 0) timeString += months + (months > 1 ? " meses " : " mês ");
    if (days > 0) timeString += "e " + days + (days > 1 ? " dias" : " dia");
    if (timeString === "") timeString = "Alguns dias...";

    // Proximo mesversario
    var nextMesv = new Date(y2, m2, 16);
    if (now > nextMesv) nextMesv.setMonth(nextMesv.getMonth() + 1);
    var daysToMesv = Math.ceil((nextMesv - now) / (1000 * 60 * 60 * 24));

    // Proximo aniversario
    var nextAniv = new Date(y2, 9, 16);
    if (now > nextAniv) nextAniv.setFullYear(nextAniv.getFullYear() + 1);
    var daysToAniv = Math.ceil((nextAniv - now) / (1000 * 60 * 60 * 24));

    var dynamicStats = [
      { rotulo: "Dias completos juntos", valorFinal: diffDays, textoLiteral: null },
      { rotulo: "Tempo escolhendo a gente", valorFinal: 0, textoLiteral: timeString },
      { rotulo: "Dias para o próximo mesversário", valorFinal: daysToMesv, textoLiteral: null },
      { rotulo: "Dias para o nosso aniversário", valorFinal: daysToAniv, textoLiteral: null }
    ];

    var allStats = dynamicStats.concat(D().stats || []);

    allStats.forEach(function(s) {
      var item = el("div", "stat-item");
      var valEl = el("div", "stat-value", "0");
      var lblEl = el("div", "stat-label", esc(s.rotulo));
      item.appendChild(valEl);
      item.appendChild(lblEl);
      grid.appendChild(item);

      if (s.textoLiteral) {
         valEl.style.fontSize = "1.8rem";
         valEl.textContent = s.textoLiteral;
      } else {
        // Animação acelerada para números grandes (ex: 173.884)
        var target = s.valorFinal;
        var current = 0;
        var inc = Math.max(1, Math.floor(target / 30));
        var interval = setInterval(function() {
          if (current >= target) {
            valEl.textContent = target.toLocaleString("pt-BR");
            clearInterval(interval);
          } else {
            current += inc;
            if (current > target) current = target;
            valEl.textContent = current.toLocaleString("pt-BR");
          }
        }, 40);
      }
    });
  }

  /* ---------- 3. Museu das Nossas Memórias ---------- */
  function buildMuseum() {
    var grid = document.getElementById("museum-grid");
    if (!grid) return;
    (D().museum || []).forEach(function(m, i) {
      var card = el("div", "museum-card");
      var img = el("img", "museum-img");
      img.src = "Spotfy/Imagens/MeuAmor/" + m.foto;
      img.alt = esc(m.titulo);
      img.loading = "lazy";
      
      var content = el("div", "museum-content");
      var title = el("h3", "museum-title", esc(m.titulo));
      var leg = el("p", "museum-legend", esc(m.legenda));
      
      content.appendChild(title);
      content.appendChild(leg);
      card.appendChild(img);
      card.appendChild(content);
      
      card.addEventListener("click", function() {
        plant("museu_" + i);
      });
      grid.appendChild(card);
    });
  }

  /* ---------- 4. Abrir quando ---------- */
  function buildOpenWhen() {
    var grid = document.getElementById("openwhen");
    if (!grid) return;
    (D().openWhen || []).forEach(function (o, i) {
      var btn = el("button", "openwhen-card");
      btn.type = "button";
      btn.innerHTML =
        '<span class="openwhen-card__emoji" aria-hidden="true">' +
        (o.emoji || "💌") +
        "</span><span>" +
        esc(o.gatilho) +
        "</span>";
      btn.addEventListener("click", function () {
        window.MF.openCard(o.gatilho, o.mensagem);
        plant("ow:" + i);
      });
      grid.appendChild(btn);
    });
  }

  /* ---------- 5. Roletas ---------- */
  function buildRoulettes() {
    var btnMem = document.getElementById("btn-roulette-memory");
    var txtMem = document.getElementById("roulette-memory-text");
    if (btnMem && txtMem) {
      btnMem.addEventListener("click", function() {
        var opts = D().memories || [];
        spin(txtMem, opts, function() { plant("roleta_mem"); });
      });
    }

    var btnEnc = document.getElementById("btn-roulette-encounter");
    var txtEnc = document.getElementById("roulette-encounter-text");
    if (btnEnc && txtEnc) {
      btnEnc.addEventListener("click", function() {
        var opts = D().encounters || [];
        spin(txtEnc, opts, function() { plant("roleta_enc"); });
      });
    }

    function spin(el, options, callback) {
      if (options.length === 0) return;
      var times = 10;
      var speed = 50;
      var count = 0;
      el.classList.remove("is-visible");
      var interval = setInterval(function() {
        el.textContent = options[Math.floor(Math.random() * options.length)];
        count++;
        if (count >= times) {
          clearInterval(interval);
          el.classList.add("is-visible");
          callback();
        }
      }, speed);
    }
  }

  /* ---------- 6. Raspadinha ---------- */
  function buildScratchCard() {
    var canvas = document.getElementById("scratch-canvas");
    var ctx = canvas ? canvas.getContext("2d") : null;
    var txt = document.getElementById("scratch-text");
    var container = document.getElementById("scratch-container");
    var resetBtn = document.getElementById("scratch-reset");
    
    if (!canvas || !ctx || !txt || !container) return;

    var isDrawing = false;
    var cards = D().scratchCards || ["Eu te amo"];

    function initCanvas() {
      // Setup hidden text
      txt.textContent = cards[Math.floor(Math.random() * cards.length)];
      
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      
      ctx.globalCompositeOperation = "source-over";
      // Fill with silver/gold pattern
      ctx.fillStyle = "#e0cba8"; // dourado suave
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "16px Poppins, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.fillText("Passe o dedo aqui", canvas.width/2, canvas.height/2 + 6);

      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 40;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
    }

    // Must wait for layout to have dimensions
    setTimeout(initCanvas, 500);
    window.addEventListener("resize", initCanvas);

    function scratch(e) {
      if (!isDrawing) return;
      e.preventDefault(); // Prevent scrolling
      var rect = canvas.getBoundingClientRect();
      var x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
      var y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
      
      ctx.lineTo(x, y);
      ctx.stroke();
      plant("raspadinha");
    }

    canvas.addEventListener("mousedown", function(e) { isDrawing = true; ctx.beginPath(); scratch(e); });
    canvas.addEventListener("mousemove", scratch);
    canvas.addEventListener("mouseup", function() { isDrawing = false; });
    canvas.addEventListener("mouseleave", function() { isDrawing = false; });

    canvas.addEventListener("touchstart", function(e) { isDrawing = true; ctx.beginPath(); scratch(e); }, {passive: false});
    canvas.addEventListener("touchmove", scratch, {passive: false});
    canvas.addEventListener("touchend", function() { isDrawing = false; });

    if (resetBtn) {
      resetBtn.addEventListener("click", initCanvas);
    }
  }

  /* ---------- 7. Motivos ---------- */
  function buildReasons() {
    var grid = document.getElementById("reasons");
    var reasons = D().loveReasons || [];
    if (grid) {
      // limit to 8 for the grid to not be huge
      reasons.slice(0, 8).forEach(function (r, i) {
        var card = el("button", "flip-card");
        card.type = "button";
        card.setAttribute("aria-label", "Virar o motivo " + (i + 1));
        card.innerHTML =
          '<span class="flip-card__inner">' +
          '<span class="flip-card__face flip-card__front">Motivo ' +
          (i + 1) +
          "</span>" +
          '<span class="flip-card__face flip-card__back">' +
          esc(r) +
          "</span></span>";
        card.addEventListener("click", function () {
          card.classList.toggle("is-flipped");
          plant("motivo:" + i);
        });
        grid.appendChild(card);
      });
    }

    var btn = document.getElementById("reason-random-btn");
    var out = document.getElementById("reason-random");
    if (btn && out) {
      btn.addEventListener("click", function () {
        var r = reasons[Math.floor(Math.random() * reasons.length)];
        out.classList.remove("is-visible");
        void out.offsetWidth;
        out.textContent = r;
        out.classList.add("is-visible");
        plant("motivo:random");
      });
    }
  }

  /* ---------- 8. Promessas ---------- */
  function buildPromises() {
    var box = document.getElementById("promises");
    if (!box) return;
    (D().promises || []).forEach(function (p) {
      box.appendChild(el("div", "postit", esc(p)));
    });
  }

  /* ---------- 9. Caixa de lembranças ---------- */
  function buildMemoryBox() {
    var box = document.getElementById("membox");
    if (!box) return;
    (D().memoryBox || []).forEach(function (m, i) {
      var btn = el("button", "membox-item");
      btn.type = "button";
      btn.innerHTML =
        '<span class="membox-item__emoji" aria-hidden="true">' +
        (m.emoji || "💝") +
        "</span><span>" +
        esc(m.rotulo) +
        "</span>";
      btn.addEventListener("click", function () {
        window.MF.openCard(m.rotulo, m.mensagem);
        plant("box:" + i);
      });
      box.appendChild(btn);
    });
  }

  /* ---------- 10. Mini quiz ---------- */
  function buildQuiz() {
    var host = document.getElementById("quiz");
    if (!host) return;
    (D().quiz || []).forEach(function (q, qi) {
      var card = el("div", "quiz-card");
      card.appendChild(el("p", "quiz__q", esc(q.pergunta)));
      var opts = el("div", "quiz__options");
      var fb = el("p", "quiz__feedback");
      fb.setAttribute("aria-live", "polite");

      (q.opcoes || []).forEach(function (op) {
        var b = el("button", "quiz__opt", esc(op));
        b.type = "button";
        b.addEventListener("click", function () {
          opts.querySelectorAll(".quiz__opt").forEach(function (x) {
            x.classList.remove("is-chosen");
          });
          b.classList.add("is-chosen");
          fb.textContent = q.mensagem;
          plant("quiz:" + qi);
        });
        opts.appendChild(b);
      });

      card.appendChild(opts);
      card.appendChild(fb);
      host.appendChild(card);
    });
  }

  function init() {
    buildVault();
    buildStats();
    buildMuseum();
    buildOpenWhen();
    buildRoulettes();
    buildScratchCard();
    buildReasons();
    buildPromises();
    buildMemoryBox();
    buildQuiz();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
