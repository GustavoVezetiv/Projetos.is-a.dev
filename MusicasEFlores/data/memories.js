/* =========================================================
   data/memories.js — LINHA DO TEMPO e GALERIA (fácil de editar)
   As fotos/vídeos ficam em Spotfy/Imagens/MeuAmor/ (o caminho base
   está em src/js/gallery.js). Aqui você edita só os dados.
   ========================================================= */
window.MF_DATA = Object.assign(window.MF_DATA || {}, {
  // --- Nossa jornada (timeline) ---
  timeline: [
    { titulo: "Onde tudo começou", data: "Outubro de 2023", icone: "💬",
      foto: "IMG_20231020_230101_960.webp",
      frase: "A gente só começou a conversar e eu já não conseguia mais parar. Uma conversa boba que virou a melhor parte dos meus dias." },
    { titulo: "A primeira vez que te vi", data: "Outubro de 2023", icone: "📸",
      foto: "IMG_20231020_230203_484.webp",
      frase: "Te ver de pertinho na tela e pensar: é ela. Não teve distância que apagasse isso." },
    { titulo: "Nossa primeira virada", data: "Dezembro de 2023", icone: "🎆",
      foto: "IMG_20231231_175205_986.webp",
      frase: "A virada longe de você foi estranha. Mas ali eu já sabia: o próximo ano, e todos os outros, eu queria contar do seu lado." },
    { titulo: "Nossa música", data: "Fevereiro de 2024", icone: "🎵",
      foto: "IMG_20240213_211925_641.webp",
      frase: "Tem uma música que virou nossa. Hoje eu não consigo escutar sem você aparecer na minha cabeça inteira." },
    { titulo: "Um meio de ano da gente", data: "Junho de 2024", icone: "🌷",
      foto: "IMG_20240601_221006_003.webp",
      frase: "Nem todo dia é especial, mas com você os comuns também ficam. Esse foi um que eu guardei." },
    { titulo: "Uma lembrança que ficou", data: "Julho de 2024", icone: "🌙",
      foto: "IMG_20240707_003145_268.webp",
      frase: "Tem dias que eu guardo só pra mim, pra puxar quando a saudade aperta. Esse é um deles." },
    { titulo: "Mais um ano contigo", data: "Março de 2025", icone: "💫",
      foto: "IMG_20250315_210158_691.webp",
      frase: "O tempo passou e a vontade só cresceu. Mais um pedaço de história nossa pra somar." },
    { titulo: "Hoje", data: "Hoje, mais de 600 dias", icone: "❤️",
      foto: "IMG_20250420_195334_363.webp",
      frase: "Sou lerdo, chato, emburrado às vezes, e mesmo assim você fica. Ainda tô aprendendo a te mostrar tudo que sinto. Aceita continuar essa caminhada comigo?" }
  ],

  // --- Nossas memórias (galeria polaroid) ---
  // type: "image" | "video"  ·  file: nome do arquivo  ·  cap: legenda curta
  gallery: [
    { type: "image", file: "IMG_20231020_230101_960.webp", cap: "onde começou 💬" },
    { type: "image", file: "IMG_20231020_230203_484.webp", cap: "a primeira vez 📸" },
    { type: "video", file: "VID-20231015-WA0029.mp4", cap: "um vídeo nosso 🎥" },
    { type: "image", file: "IMG_20231231_175205_986.webp", cap: "nossa virada 🎆" },
    { type: "image", file: "IMG_20240213_211925_641.webp", cap: "nossa música 🎵" },
    { type: "image", file: "IMG_20240601_221006_003.webp", cap: "meio de ano 🌷" },
    { type: "video", file: "VID-20240414-WA0041.mp4", cap: "rindo à toa 😄" },
    { type: "image", file: "IMG_20240707_003145_268.webp", cap: "madrugada boa 🌙" },
    { type: "image", file: "IMG_20240915_010603_632.webp", cap: "só a gente ✨" },
    { type: "image", file: "IMG_20250315_210158_691.webp", cap: "mais um ano 💫" },
    { type: "video", file: "VID_20250323_001603_638.mp4", cap: "guardei esse 💞" },
    { type: "image", file: "IMG_20250420_195334_363.webp", cap: "hoje ❤️" },
    { type: "image", file: "IMG_20250420_195536_219.webp", cap: "sua presença 🌸" },
    { type: "image", file: "IMG_20240601_221030_552.webp", cap: "detalhes nossos 💗" }
  ]
});
