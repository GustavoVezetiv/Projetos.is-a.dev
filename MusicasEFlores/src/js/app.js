/* app.js — núcleo da experiência: namespace MF, modal compartilhado,
   pétalas, "revelar ao rolar", navegação por pontos e abertura do presente. */
(function () {
  "use strict";

  var MF = (window.MF = window.MF || {});

  var prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  MF.prefersReduced = prefersReduced;

  /* ---------------- Modal compartilhado ---------------- */
  var modal, inner, lastFocused;

  function buildModal() {
    modal = document.createElement("div");
    modal.className = "modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Janela");
    modal.innerHTML =
      '<div class="modal__inner">' +
      '<button class="modal__close" type="button" aria-label="Fechar (Esc)">&times;</button>' +
      '<div class="modal__body"></div>' +
      "</div>";
    document.body.appendChild(modal);
    inner = modal.querySelector(".modal__body");

    modal.addEventListener("mousedown", function (e) {
      // só fecha se clicar no fundo (não dentro do conteúdo)
      if (e.target === modal) MF.closeModal();
    });
    modal.querySelector(".modal__close").addEventListener("click", MF.closeModal);
    document.addEventListener("keydown", function (e) {
      if (!modal || !modal.classList.contains("is-open")) return;
      if (e.key === "Escape") MF.closeModal();
      if (e.key === "Tab") trapFocus(e);
    });
  }

  function trapFocus(e) {
    var f = modal.querySelectorAll(
      'button, a[href], video, [tabindex]:not([tabindex="-1"])'
    );
    if (!f.length) return;
    var first = f[0],
      last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  MF.openModal = function (node) {
    if (!modal) buildModal();
    lastFocused = document.activeElement;
    inner.innerHTML = "";
    inner.appendChild(node);
    modal.classList.add("is-open");
    var closeBtn = modal.querySelector(".modal__close");
    if (closeBtn) closeBtn.focus();
  };

  MF.openMedia = function (type, src, caption) {
    var wrap = document.createElement("div");
    wrap.className = "modal__media";
    var el;
    if (type === "video") {
      el = document.createElement("video");
      el.src = src;
      el.controls = true;
      el.autoplay = true;
      el.playsInline = true;
    } else {
      el = document.createElement("img");
      el.src = src;
      el.alt = caption || "Memória";
    }
    wrap.appendChild(el);
    if (caption) {
      var cap = document.createElement("p");
      cap.className = "modal__caption";
      cap.textContent = caption;
      wrap.appendChild(cap);
    }
    MF.openModal(wrap);
  };

  MF.openCard = function (title, message) {
    var card = document.createElement("div");
    card.className = "modal__card";
    if (title) {
      var h = document.createElement("h3");
      h.textContent = title;
      card.appendChild(h);
    }
    var p = document.createElement("p");
    p.textContent = message;
    card.appendChild(p);
    MF.openModal(card);
  };

  MF.closeModal = function () {
    if (!modal) return;
    modal.classList.remove("is-open");
    inner.innerHTML = ""; // para vídeos pararem
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  };

  /* ---------------- Pétalas flutuantes ---------------- */
  function makePetals() {
    var layer = document.getElementById("petals");
    if (!layer || prefersReduced) return;
    var glyphs = ["❀", "✿", "❤", "🌸", "💗"];
    var count = window.innerWidth < 600 ? 8 : 14;
    for (var i = 0; i < count; i++) {
      var p = document.createElement("span");
      p.className = "petal";
      p.textContent = glyphs[i % glyphs.length];
      p.style.left = Math.random() * 100 + "%";
      p.style.fontSize = 0.9 + Math.random() * 1.4 + "rem";
      p.style.animationDuration = 9 + Math.random() * 10 + "s";
      p.style.animationDelay = -Math.random() * 12 + "s";
      layer.appendChild(p);
    }
  }

  /* ---------------- Revelar ao rolar ---------------- */
  function revealOnScroll() {
    var items = document.querySelectorAll(".reveal");
    var bwItems = document.querySelectorAll(".bw-to-color");
    
    if (!items.length && !bwItems.length) return;
    
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      bwItems.forEach(function (el) { el.classList.add("is-colored"); });
      return;
    }
    
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (entry.target.classList.contains("bw-to-color")) {
                entry.target.classList.add("is-colored");
            }
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    
    items.forEach(function (el) { io.observe(el); });
    bwItems.forEach(function (el) { 
      if (!el.classList.contains("reveal")) io.observe(el); 
    });
  }

  /* ---------------- Navegação por pontos ---------------- */
  function dotNav() {
    var dots = document.querySelectorAll(".dotnav a");
    if (!dots.length || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.id;
            dots.forEach(function (d) {
              d.classList.toggle(
                "is-active",
                d.getAttribute("href") === "#" + id
              );
            });
          }
        });
      },
      { threshold: 0.5 }
    );
    dots.forEach(function (d) {
      var sec = document.querySelector(d.getAttribute("href"));
      if (sec) io.observe(sec);
    });
  }

  /* ---------------- Abertura do presente ---------------- */
  function presentOpen() {
    var btn = document.getElementById("open-gift");
    if (!btn) return;
    btn.addEventListener("click", function () {
      heartBurst();
      if (window.MF.garden) window.MF.garden.plant("abertura");
    });
  }

  MF.heartBurst = heartBurst;
  function heartBurst() {
    if (prefersReduced) return;
    var n = 14;
    for (var i = 0; i < n; i++) {
      (function (i) {
        var h = document.createElement("span");
        h.className = "rain-heart";
        h.textContent = "❤";
        h.style.left = Math.random() * 100 + "vw";
        var dur = 2.6 + Math.random() * 2.2;
        h.style.animationDuration = dur + "s";
        h.style.fontSize = 0.9 + Math.random() * 1.6 + "rem";
        document.body.appendChild(h);
        setTimeout(function () {
          h.remove();
        }, dur * 1000 + 200);
      })(i);
    }
  }

  function init() {
    makePetals();
    revealOnScroll();
    dotNav();
    presentOpen();
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();

    // planta uma flor ao chegar na seção do jardim
    var jardimEl = document.getElementById("jardim-final");
    if (jardimEl && "IntersectionObserver" in window) {
      var jardimObs = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          if (window.MF && window.MF.garden) window.MF.garden.plant("chegou-jardim");
          jardimObs.disconnect();
        }
      }, { threshold: 0.25 });
      jardimObs.observe(jardimEl);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
