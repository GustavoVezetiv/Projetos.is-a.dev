/* =========================================================
   data/messages.js — TEXTOS da jornada (fácil de editar)
   Carta, "Abrir quando", motivos, promessas, caixa de lembranças,
   quiz, segredos e a pergunta final. Edite à vontade. 💌
   ========================================================= */
window.MF_DATA = Object.assign(window.MF_DATA || {}, {
  // --- Carta (parágrafos) ---
  letter: {
    paragrafos: [
      "Sabrina, eu fiz essa página porque escrever no papel nunca foi o meu forte, e mesmo assim eu precisava te dizer essas coisas de um jeito que ficasse pra sempre. Aqui estão mais de 600 dias da gente, e eu nem sei por onde começar.",
      "Eu queria te dar o mundo inteiro. E se eu não conseguir te dar, então eu quero conquistar ele junto com você, do seu lado, no mesmo passo. A melhor vida possível pra mim é qualquer vida que tenha você dentro.",
      "Você nem imagina, mas tudo me lembra de você. Uma música boba, uma flor na rua, um silêncio no fim do dia. E olha, amor é quando até o silêncio entre a gente tem sentido. Você é meu presente.",
      "Eu sei que ainda não sei demonstrar tudo o que eu sinto. Sou lerdo, chato, às vezes emburrado. Mas eu quero aprender, com gesto, com palavra, com atitude. Quero te provar todo dia que valeu a pena ter me escolhido.",
      "Essa distância é difícil, eu não vou mentir. Mas eu prefiro ter pouco de você de longe do que muito de qualquer outra coisa de perto. Você me faz querer ser melhor mesmo a quilômetros daqui.",
      "Por isso eu te lembro do que a gente já sabe: amores de domingo são bonitos, mas o nosso amor é pro cansaço da segunda, pra estranheza da terça, pra ansiedade da quarta, pra animação da quinta, pra felicidade da sexta, pras loucuras do sábado e pro sossego do domingo."
    ]
  },

  // --- Abrir quando... ---
  openWhen: [
    { gatilho: "Abrir quando estiver com saudade", emoji: "🌧️",
      mensagem: "Eu sei, a distância pesa. Mas pega esse bilhete e lembra: cada quilômetro entre a gente é só um quilômetro a menos pra te abraçar de novo. Já são mais de 600 dias te escolhendo, e eu escolheria de novo agora, sem pensar. Fecha os olhos que eu tô aí." },
    { gatilho: "Abrir quando estiver triste", emoji: "🫂",
      mensagem: "Vem cá. Você não precisa estar bem agora, eu fico com você do jeito que você estiver. Lembra do poema: o nosso amor é pro cansaço da segunda e pra estranheza da terça também, não só pros dias bonitos. Respira. Isso passa, e eu não vou pra lugar nenhum." },
    { gatilho: "Abrir quando quiser rir", emoji: "😄",
      mensagem: "Pensa no tanto que eu te emburro e te encho a paciência e mesmo assim você me aguenta esse tempo todo. Isso já valia medalha. Agora imagina minha cara tentando ser romântico sem estragar tudo. Pronto, você riu." },
    { gatilho: "Abrir quando duvidar do quanto eu te amo", emoji: "💗",
      mensagem: "Olha, eu ainda não sei demonstrar tudo o que sinto, e isso me dá raiva de mim mesmo. Mas tudo o que eu vivo me faz lembrar de você, todo dia. Eu quero te dar o mundo, ou conquistar ele junto com você. Se a dúvida bateu, a resposta é simples: muito. Mais do que eu consigo escrever." },
    { gatilho: "Abrir quando quiser lembrar da gente", emoji: "💞",
      mensagem: "A gente começou de longe e foi construindo isso aos poucos, conversa por conversa, madrugada por madrugada. Você é meu presente, Sabrina, no sentido literal. Amor é quando até o silêncio entre a gente tem sentido, e o nosso tem. Guarda isso." },
    { gatilho: "Abrir quando precisar de carinho", emoji: "🤍",
      mensagem: "Chega aqui, deita um pouco. Imagina minha mão no seu cabelo e a minha voz dizendo que vai ficar tudo bem. Eu quero te dar a melhor vida possível, e por enquanto faço isso com palavra, gesto e esse bilhete. Você é cuidada, sempre. Por mim." }
  ],

  // --- Motivos pelos quais eu te amo ---
  loveReasons: [
    "Porque você me aguenta sendo lerdo, chato e emburrado, e ainda escolhe ficar.",
    "Porque com você até o silêncio entre a gente tem sentido.",
    "Porque você transforma a distância em saudade boa, e não em desculpa pra desistir.",
    "Porque seu nome aparecendo na tela ainda muda o meu dia inteiro.",
    "Porque você entende meus humores sem eu precisar explicar nada.",
    "Porque a gente briga, se ajeita, e continua querendo o mesmo futuro.",
    "Porque você é a primeira pessoa em quem eu penso quando algo bom acontece.",
    "Porque com você eu virei alguém que quer dar certo, não só passar o tempo.",
    "Porque você ri das minhas besteiras mesmo quando elas não têm graça nenhuma.",
    "Porque mesmo longe você sempre dá um jeito de estar perto.",
    "Porque você me faz querer ser melhor sem nunca me cobrar isso.",
    "Porque cada conversa nossa que vira madrugada vale mais que dormir cedo.",
    "Porque você me lembra todo dia que casa não é lugar, é gente.",
    "Porque você tem paciência com a minha demora pra demonstrar o que sinto.",
    "Porque tudo que eu vivo, até o mais bobo, me faz lembrar de você.",
    "Porque com você eu quero o cansaço da segunda e o sossego do domingo, o pacote inteiro.",
    "Porque você acredita na gente nos dias em que eu fico em dúvida de mim.",
    "Porque você é o meu presente, e eu nem precisei pedir.",
    "Porque depois de mais de 600 dias eu ainda te escolheria de novo, do zero.",
    "Porque você faz a vida comum parecer a melhor vida possível, e eu só quero vivê-la do seu lado."
  ],

  // --- Promessas pequenas (post-its) ---
  promises: [
    "Prometo tentar te entender mesmo quando eu estiver emburrado.",
    "Prometo te ouvir de verdade, mesmo nos dias em que eu falo pouco.",
    "Prometo encurtar essa distância do jeito que der, todo dia um pouco.",
    "Prometo aprender a te mostrar com gestos o que ainda não sei dizer com palavras.",
    "Prometo te escolher de novo na segunda cansada e na terça estranha.",
    "Prometo não desistir da gente, mesmo sendo teimoso do jeito que eu sou.",
    "Prometo construir o mundo com você, e se não der pra te dar ele inteiro, conquisto junto.",
    "Prometo lembrar de você em tudo, porque já não consigo de outro jeito."
  ],

  // --- Caixa de lembranças ---
  memoryBox: [
    { rotulo: "Uma foto", emoji: "📷", mensagem: "Olha a gente ali. Eu ainda não acreditava na sorte que era te ter." },
    { rotulo: "Uma música", emoji: "🎶", mensagem: "Toda vez que toca, eu volto pra perto de você sem sair do lugar." },
    { rotulo: "Uma frase", emoji: "💬", mensagem: "Amor é quando até o silêncio entre a gente tem sentido." },
    { rotulo: "Uma promessa", emoji: "🤞", mensagem: "A melhor vida possível é a que eu vou viver do seu lado. Continua comigo?" },
    { rotulo: "Uma saudade", emoji: "🌙", mensagem: "São mais de 600 dias e a saudade não cansa. Só me lembra o quanto vale." },
    { rotulo: "Um momento", emoji: "🌻", mensagem: "Nosso amor é pro cansaço da segunda e pro sossego do domingo. Pra tudo. Você é meu presente." }
  ],

  // --- Mini quiz ---
  quiz: [
    { pergunta: "Qual é o nosso tipo de amor?",
      opcoes: ["Amor de domingo, só no descanso", "Amor da semana inteira, no caos e na paz", "Amor de feriado prolongado", "Amor que dá trabalho (do bom)"],
      mensagem: "Resposta certa é qualquer uma, porque o nosso amor aguenta a semana toda. Eu te escolho na segunda cansada e no domingo de sossego." },
    { pergunta: "O que me lembra você?",
      opcoes: ["Uma música que toca do nada", "Uma flor no meio do caminho", "O silêncio bom no fim do dia", "Tudo, sinceramente tudo"],
      mensagem: "Pegadinha: a resposta é tudo. Você mora em cada coisinha do meu dia, mesmo de longe." },
    { pergunta: "Quantos dias a gente já venceu juntos?",
      opcoes: ["Uns pouquinhos", "Mais de 600 e contando", "Perdi a conta de tão feliz", "Os suficientes pra eu ter certeza"],
      mensagem: "Mais de 600 dias, e eu contaria cada um de novo só pra chegar até aqui com você." }
  ],

  // --- Segredos (easter eggs) ---
  secrets: [
    "Você achou um cantinho secreto. Igual você achou um cantinho no meu peito sem nem pedir licença.",
    "Psiu: mesmo de longe, eu durmo pensando em você e acordo do mesmo jeito.",
    "Segredo número três: não tem segredo. Eu te amo na cara dura, todo dia, sem freio."
  ],

  // --- Pergunta final ---
  finalQuestion: {
    pergunta: "Então, Sabrina: quer continuar vivendo essa bagunça linda comigo, mesmo eu sendo lerdo, chato e emburrado de vez em quando?",
    simLabel: "Quero sim",
    claroLabel: "Claro que quero, bobo!",
    mensagemFinal: "Eu sabia. E eu prometo continuar tentando ser melhor pra você, com gesto, palavra e atitude, até a distância virar só uma história que a gente conta rindo. Te amo, do cansaço da segunda ao sossego do domingo. Você é meu presente."
  }
});
