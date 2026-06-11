/* surprises.js — monta as seções interativas e fofas:
   "Abrir quando", motivos (cards que viram + motivo aleatório),
   promessas (post-its), caixa de lembranças e mini quiz.
   Cada interação planta uma florzinha no jardim. */
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
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* ---------- Abrir quando ---------- */
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

  /* ---------- Motivos (cards que viram + aleatório) ---------- */
  function buildReasons() {
    var grid = document.getElementById("reasons");
    var reasons = D().loveReasons || [];
    if (grid) {
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
          plant("motivo");
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
        plant("motivo");
      });
    }
  }

  /* ---------- Promessas (post-its) ---------- */
  function buildPromises() {
    var box = document.getElementById("promises");
    if (!box) return;
    (D().promises || []).forEach(function (p) {
      box.appendChild(el("div", "postit", esc(p)));
    });
  }

  /* ---------- Caixa de lembranças ---------- */
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

  /* ---------- Mini quiz ---------- */
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
    buildOpenWhen();
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
