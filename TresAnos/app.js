import { anniversary, memories, phrases, promises } from './data.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const assetUrl = (file) => new URL(file, import.meta.url).href;
const storageKey = 'tres-anos-jardim-v1';
const maxFlowers = 18;
let seeds = new Set();
let flowerNumber = 0;

// A restricted or full localStorage never prevents the gift from opening.
try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
  if (Array.isArray(saved)) seeds = new Set(saved.filter((seed) => typeof seed === 'string').slice(0, maxFlowers));
} catch { /* The garden still works in memory. */ }

function saveGarden() {
  try { localStorage.setItem(storageKey, JSON.stringify([...seeds])); } catch { /* Optional persistence. */ }
}

function drawFlower(index, animate = true, previous = null) {
  const container = document.getElementById('garden-flowers');
  const flower = document.createElement('span');
  const colors = ['#9a626a', '#b9887a', '#bca170', '#798766', '#ac7d89'];
  // Spaced deterministically, so the saved garden keeps its composition.
  const position = 9 + ((index * 37) % 82);
  flower.className = 'garden-flower';
  flower.dataset.flowerIndex = String(index);
  flower.style.setProperty('--flower-left', `calc(${position}% - 30px)`);
  flower.style.setProperty('--flower-color', colors[index % colors.length]);
  flower.style.setProperty('--flower-scale', String(.62 + (index % 5) * .09));
  flower.style.setProperty('--lean', `${((index * 13) % 24) - 12}deg`);
  if (!animate) flower.style.animation = 'none';
  flower.innerHTML = '<svg viewBox="0 0 80 220" fill="none" aria-hidden="true"><path d="M40 211C37 150 48 96 40 51" stroke="#72815e" stroke-width="2"/><path d="M40 172C14 171 10 153 10 143c23 1 31 17 30 29ZM42 132c25-4 31-18 30-30-21 4-28 15-30 30Z" fill="#899773" fill-opacity=".75"/><g class="bloom" fill="currentColor"><ellipse cx="40" cy="29" rx="10" ry="20"/><ellipse cx="40" cy="29" rx="10" ry="20" transform="rotate(60 40 45)"/><ellipse cx="40" cy="29" rx="10" ry="20" transform="rotate(120 40 45)"/><ellipse cx="40" cy="29" rx="10" ry="20" transform="rotate(180 40 45)"/><ellipse cx="40" cy="29" rx="10" ry="20" transform="rotate(240 40 45)"/><ellipse cx="40" cy="29" rx="10" ry="20" transform="rotate(300 40 45)"/><circle cx="40" cy="45" r="8" fill="#d7bd7a"/></g></svg>';
  if (previous) previous.replaceWith(flower);
  else container.append(flower);
}

function updateGardenCount() {
  const count = seeds.size;
  document.getElementById('garden-count').textContent = count === 0
    ? 'O nosso jardim está só começando.'
    : count === 1 ? 'Uma flor. Um motivo para continuar.' : `${count} flores. E tantos motivos para continuar.`;
}

function plant(seed) {
  if (seeds.has(seed) || seeds.size >= maxFlowers) return;
  seeds.add(seed);
  drawFlower(flowerNumber++);
  saveGarden();
  updateGardenCount();
}

function initGarden() {
  document.querySelector('.fallback-flower')?.remove();
  seeds.forEach(() => drawFlower(flowerNumber++, false));
  ['o-comeco', 'aprender-junto', 'tres-anos'].forEach(plant);
  updateGardenCount();
  const button = document.getElementById('plant-flower');
  let promiseIndex = 0;
  button.hidden = false;
  button.addEventListener('click', () => {
    document.getElementById('garden-message').textContent = promises[promiseIndex % promises.length];
    if (seeds.size < maxFlowers) {
      // Saved seeds must not turn the first clicks after a reload into no-ops.
      let nextSeed = 0;
      while (seeds.has(`amanha-${nextSeed}`)) nextSeed++;
      plant(`amanha-${nextSeed}`);
    } else {
      // Keep the composition bounded, but let every new tomorrow visibly bloom.
      const flowers = document.querySelectorAll('#garden-flowers .garden-flower');
      const previous = flowers[promiseIndex % flowers.length];
      drawFlower(Number(previous.dataset.flowerIndex), true, previous);
      document.getElementById('garden-count').textContent = 'Um novo amanhã floresceu. O nosso jardim continua florido.';
    }
    promiseIndex++;
  });
}

function initLetter() {
  const letter = document.getElementById('love-letter');
  letter.addEventListener('toggle', () => {
    if (letter.open) {
      plant('a-carta');
      releasePetals(8);
    }
  });
}

function initMemories() {
  const grid = document.getElementById('memory-grid');
  const dialog = document.getElementById('memory-dialog');
  const mediaContainer = document.getElementById('dialog-media');
  let currentIndex = 0;
  let filter = 'all';
  let visibleCount = 9;
  let lastFocused;
  const supportsDialog = typeof dialog.showModal === 'function';

  function filteredIndices() {
    return memories.map((memory, index) => filter === 'all' || (filter === 'new' ? memory.isNew : memory.type === filter) ? index : -1).filter((index) => index >= 0);
  }

  const moreButton = document.getElementById('more-memories');
  function updateVisibleCards() {
    const indices = filteredIndices();
    const visible = new Set(indices.slice(0, visibleCount));
    grid.querySelectorAll('.memory-card').forEach((card, index) => {
      const show = visible.has(index);
      card.hidden = !show;
      // Do not even request off-page thumbnails until they are shown.
      const photo = card.querySelector('img');
      if (show && !photo.hasAttribute('src')) photo.src = photo.dataset.src;
    });
    const remaining = Math.max(0, indices.length - visibleCount);
    moreButton.hidden = remaining === 0;
    moreButton.textContent = `Abrir mais memórias · ${remaining} guardadas`;
    document.getElementById('gallery-status').textContent = `${Math.min(visibleCount, indices.length)} de ${indices.length} memórias`;
  }

  function openMemory(index) {
    const memory = memories[index];
    currentIndex = index;
    mediaContainer.querySelector('video')?.pause();
    mediaContainer.replaceChildren();
    const media = document.createElement(memory.type === 'video' ? 'video' : 'img');
    media.src = assetUrl(memory.file);
    if (memory.type === 'video') {
      media.controls = true;
      media.playsInline = true;
      media.preload = 'metadata';
      if (memory.poster) media.poster = assetUrl(memory.poster);
      media.setAttribute('aria-label', memory.caption);
    } else {
      media.alt = memory.alt || memory.caption;
    }
    media.addEventListener('error', () => {
      const note = document.createElement('p');
      note.textContent = 'Essa memória não carregou. Tente abrir novamente em instantes.';
      note.className = 'media-error';
      mediaContainer.replaceChildren(note);
    }, { once: true });
    mediaContainer.append(media);
    document.getElementById('dialog-caption').textContent = memory.caption;
    const indices = filteredIndices();
    document.getElementById('dialog-counter').textContent = `${String(indices.indexOf(index) + 1).padStart(2, '0')} / ${String(indices.length).padStart(2, '0')}`;
    if (!dialog.open) {
      lastFocused = document.activeElement;
      dialog.showModal();
    }
    plant(`memoria-${memory.file}`);
  }

  function closeMemory() { dialog.close(); }
  function step(direction) {
    const indices = filteredIndices();
    const position = indices.indexOf(currentIndex);
    openMemory(indices[(position + direction + indices.length) % indices.length]);
  }

  // Assemble off-DOM: a failed render leaves the original HTML gallery intact.
  const fragment = document.createDocumentFragment();
  memories.forEach((memory, index) => {
    const card = document.createElement('a');
    card.className = `memory-card${memory.featured ? ' memory-card-featured' : ''}${memory.width > memory.height ? ' memory-card-landscape' : ''}`;
    card.href = assetUrl(memory.file);
    card.dataset.type = memory.type;
    card.setAttribute('aria-label', `Abrir ${memory.type === 'video' ? 'vídeo' : 'fotografia'}: ${memory.caption}`);
    const imageWrap = document.createElement('span');
    imageWrap.className = `memory-image${memory.type === 'video' ? ' video-poster' : ''}`;
    const photo = document.createElement('img');
    photo.dataset.src = assetUrl(memory.thumb || memory.poster || memory.file);
    photo.alt = memory.alt || '';
    photo.loading = 'lazy';
    photo.decoding = 'async';
    photo.width = memory.width;
    photo.height = memory.height;
    imageWrap.append(photo);
    if (memory.type === 'video') {
      const play = document.createElement('span');
      play.className = 'play-symbol';
      play.setAttribute('aria-hidden', 'true');
      play.textContent = '▷';
      const note = document.createElement('span');
      note.className = 'video-note';
      note.textContent = 'um instante para reviver';
      imageWrap.append(play, note);
    }
    const caption = document.createElement('span');
    caption.className = 'memory-caption';
    const label = document.createElement('span');
    label.textContent = memory.caption;
    if (memory.date) {
      const date = document.createElement('small');
      date.className = 'memory-date';
      date.textContent = memory.date;
      label.append(date);
    }
    const arrow = document.createElement('span');
    arrow.textContent = '↗';
    arrow.setAttribute('aria-hidden', 'true');
    caption.append(label, arrow);
    card.append(imageWrap, caption);
    if (supportsDialog) card.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      openMemory(index);
    });
    fragment.append(card);
  });
  grid.replaceChildren(fragment);

  document.querySelector('.gallery-filters').hidden = false;
  document.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      filter = button.dataset.filter;
      visibleCount = 9;
      document.querySelectorAll('[data-filter]').forEach((candidate) => {
        candidate.classList.toggle('is-active', candidate === button);
        candidate.setAttribute('aria-pressed', String(candidate === button));
      });
      updateVisibleCards();
    });
  });
  moreButton.addEventListener('click', () => { visibleCount += 9; updateVisibleCards(); });
  updateVisibleCards();

  if (!supportsDialog) return;
  document.getElementById('close-dialog').addEventListener('click', closeMemory);
  document.getElementById('previous-memory').addEventListener('click', () => step(-1));
  document.getElementById('next-memory').addEventListener('click', () => step(1));
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeMemory();
  });
  dialog.addEventListener('close', () => {
    mediaContainer.querySelector('video')?.pause();
    mediaContainer.replaceChildren();
    lastFocused?.focus({ preventScroll: true });
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.target.tagName === 'VIDEO') return;
    if (event.key === 'ArrowRight') { event.preventDefault(); step(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); }
  });
}

function initPhrases() {
  const button = document.getElementById('next-quote');
  const quote = document.getElementById('quote-title');
  let index = 0;
  button.hidden = false;
  button.addEventListener('click', () => {
    index = (index + 1) % phrases.length;
    const phrase = phrases[index];
    quote.textContent = `“${phrase.text}”`;
    document.getElementById('quote-context').textContent = `${phrase.author} · ${phrase.date}`;
    document.getElementById('quote-announcement').textContent = `${phrase.text}. ${phrase.author}, ${phrase.date}`;
    if (!reducedMotion.matches && typeof quote.animate === 'function') quote.animate([
      { opacity: .1, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' },
    ], { duration: 650, easing: 'ease-out' });
    plant(`frase-${index}`);
  });
}

function initSavedWords() {
  document.querySelectorAll('.saved-conversation').forEach((conversation) => {
    conversation.addEventListener('toggle', () => {
      if (conversation.open) plant(`bilhete-${conversation.dataset.memory}`);
    });
  });
}

function initMusic() {
  const button = document.getElementById('load-music');
  button.hidden = false;
  button.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://open.spotify.com/embed/track/07DskqQ1NbTiotX1WIV7ob?utm_source=generator&theme=0';
    iframe.title = 'Piloto, Flora Matos — nossa música no Spotify';
    iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    iframe.height = '152';
    document.getElementById('spotify-player').replaceChildren(iframe);
    document.querySelector('.music-art').classList.add('is-playing');
    button.hidden = true;
    document.querySelector('.music-note').textContent = 'Aperte o play no player. Se preferir, abra no Spotify.';
    plant('nossa-musica');
  }, { once: true });
}

function initAnniversary() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: anniversary.timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(new Date());
  const part = (type) => parts.find((item) => item.type === type).value;
  const today = Date.UTC(Number(part('year')), Number(part('month')) - 1, Number(part('day')));
  const target = Date.parse(`${anniversary.celebration}T00:00:00Z`);
  const days = Math.round((target - today) / 86400000);
  document.getElementById('anniversary-status').textContent = days > 0
    ? `${days === 1 ? 'Falta 1 dia' : `Faltam ${days} dias`} para o nosso terceiro aniversário. Essa história já é a minha favorita.`
    : days === 0 ? 'É hoje. Feliz três anos, meu amor. ♡' : 'Desde 16 de outubro de 2023. Três anos celebrados em 16 de outubro de 2026 — e a história continua.';
}

function releasePetals(count) {
  if (reducedMotion.matches) return;
  const layer = document.querySelector('.petals');
  const colors = ['#b17a84', '#cfaca2', '#ccbb96', '#e2c8bd'];
  for (let i = 0; i < count; i++) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.style.setProperty('--x', `${Math.random() * 100}%`);
    petal.style.setProperty('--size', `${7 + Math.random() * 8}px`);
    petal.style.setProperty('--duration', `${5 + Math.random() * 3}s`);
    petal.style.setProperty('--delay', `${Math.random() * 1.2}s`);
    petal.style.setProperty('--drift', `${Math.random() * 170 - 85}px`);
    petal.style.setProperty('--color', colors[i % colors.length]);
    petal.addEventListener('animationend', () => petal.remove(), { once: true });
    layer.append(petal);
    // Also clean up if the motion preference changes during the animation.
    setTimeout(() => petal.remove(), 11000);
  }
}

function initFinale() {
  const button = document.getElementById('choose-us');
  button.hidden = false;
  button.addEventListener('click', () => {
    document.getElementById('finale-answer').textContent = 'Então vem. Ainda tem muita vida bonita pra gente viver. Te amo, Sabrina.';
    button.textContent = 'A gente. Hoje e nos próximos capítulos. ♡';
    button.disabled = true;
    for (let i = seeds.size; i < maxFlowers; i++) plant(`florescer-${i}`);
    releasePetals(26);
  }, { once: true });
}

function initReadingProgress() {
  const progress = document.querySelector('.reading-progress');
  let ticking = false;
  const update = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0})`;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}

function initReveals() {
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;
  const targets = [...document.querySelectorAll('.reveal')];
  let observer;
  const revealAll = () => {
    targets.forEach((target) => { target.classList.remove('is-pending'); target.classList.add('is-revealed'); });
    observer?.disconnect();
  };
  try {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('is-pending');
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .06 });
    targets.forEach((target) => {
      observer.observe(target);
      // Do not hide content already in view, including a directly opened anchor.
      const rect = target.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) target.classList.add('is-pending');
    });
    reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) revealAll(); });
  } catch { revealAll(); }
}

// Each enhancement has its own boundary. A secondary failure cannot blank the page.
for (const init of [initGarden, initLetter, initMemories, initPhrases, initSavedWords, initMusic, initAnniversary, initFinale, initReadingProgress, initReveals]) {
  try { init(); } catch (error) { console.error(`Três Anos: ${init.name}`, error); }
}
