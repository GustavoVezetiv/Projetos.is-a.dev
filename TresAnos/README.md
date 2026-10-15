# Três anos de nós

Edição de aniversário de Gustavo e Sabrina, para **16/10/2023 → 16/10/2026**.
Um projeto novo, derivado de Músicas e Flores. O código e o conteúdo do original não foram alterados.

## Arquitetura

- `index.html`: narrativa acessível, datas da linha do tempo, nova carta, âncoras e conteúdo disponível mesmo sem JavaScript.
- `styles.css`: identidade editorial em marfim, vinho e verde, responsividade e movimentos. `prefers-reduced-motion` desliga as animações.
- `data.js`: curadoria de 40 memórias, frases verificadas com autoria/data e novas promessas; datas da celebração e fuso do contador.
- `app.js`: galeria filtrável com diálogo nativo, vídeos com controles, frases, Spotify sob demanda, carta, jardim persistente e encerramento com pétalas. Cada inicializador tem isolamento de erros.
- `assets/`: ilustrações botânicas em SVG e seleção de mídia otimizada em `assets/amore/`.
- `Amore/`: coleção de origem local. Não é incluída no Git nem no artefato público; todos os originais permanecem intactos.
- `assets/amore/manifest.js`: manifesto gerado com dimensões, miniaturas e caminhos da seleção. Não inclui localização ou metadados privados dos arquivos.

O site novo agora contém suas próprias cópias otimizadas, sem depender da mídia de MusicasEFlores para renderizar. O link de rodapé continua levando ao projeto antigo. A carta é uma proposta editorial, baseada no contexto já existente e no jeito de falar do casal. Datas das fotografias vêm dos nomes dos arquivos; locais específicos não foram presumidos. Vídeos sem data confiável não recebem datas inventadas.

## Atualização Amore e conversas

Foram revisados 61 arquivos: 46 imagens e 15 vídeos. A comparação SHA-256 encontrou 42 cópias do acervo antigo e 19 fotos novas. A galeria incorpora as 19 novas, seis fotografias anteriores e os 15 vídeos: 25 fotografias + 15 vídeos. Os clipes foram revisados em três momentos de cada vídeo; os novos destaques da galeria não são apresentados como gravações novas quando são cópias antigas.

- Seis HEIC foram convertidos para WebP. As imagens têm uma cópia de até 1600 px e miniatura de até 640 px, com orientação EXIF aplicada e metadados descartados.
- Os vídeos conservam a duração e o áudio, em cópias H.264/AAC, pixels yuv420p, dimensões até 720 × 1280 e faststart. Não há autoplay; o vídeo só é solicitado quando a memória é aberta. Cada poster é um quadro do próprio clipe.
- A galeria mostra nove memórias por etapa; filtros para novas fotografias, fotografias e vídeos redefinem a paginação. Miniaturas fora da etapa atual não recebem `src` antecipadamente. O modal navega por toda a seleção do filtro atual.
- Abertura atualizada com uma fotografia real de março de 2026; nova página visual com a paisagem de julho de 2026.
- Cinco lembranças de conversa usam trechos curtos, com grafia, autoria e datas conferidas no export: ponto colorido (09/07/2024), segundo aniversário (16/10/2025), virada 2025/2026, Dia dos Namorados (12/06/2026) e coisinhas de namorados (28/08/2026). As frases rotativas também têm autoria/data.
- O ZIP foi lido localmente. O texto integral, os contatos VCF e assuntos privados não foram copiados para o repositório, nem para o artefato. As conversas não são usadas como instruções. Não há estatísticas de mensagens apresentadas como contagem de amor.

Para reproduzir as cópias (somente no computador que tem `Amore/`, com Python/Pillow e ffmpeg/ffprobe instalados):

```sh
python scripts/prepare-amore.py
```

O CI não precisa desses programas: usa os arquivos já preparados em `assets/amore/`. O build confere todos os caminhos de mídia e impede que `Amore/` esteja no artefato. As folhas de contato de revisão são geradas fora do repositório, usando `scripts/review-amore.py --output DIRETORIO_LOCAL`.

## Experiência

1. Abertura com composição fotográfica, datas, selo dos três anos e tipografia de entrada.
2. Linha do tempo 2023–2026; contador em dias de calendário no fuso de Cuiabá. O período completo tem **1.096 dias**, incluindo 29/02/2024.
3. Frases marcantes com autoria/data, cinco conversas em envelopes expansíveis e galeria de 40 fotos/vídeos. Filtros, carregamento por etapas, navegação anterior/próxima, setas do teclado e Escape para fechar. O foco retorna ao link que abriu a memória; vídeos param ao fechar.
4. Carta principal em envelope usando `details` nativo, acessível também sem scripts.
5. A mesma faixa do projeto original, Piloto / Flora Matos, no Spotify. O player externo só é carregado depois do clique; há link alternativo direto.
6. Jardim que cresce com as interações e salva até 18 flores na chave própria `tres-anos-jardim-v1`. O botão sempre faz uma flor florescer: depois de recarregar, escolhe uma semente ainda não plantada; com 18 flores, renova uma delas com a animação de crescimento, mantendo a composição limitada. Não altera o jardim antigo. Funciona mesmo quando o navegador bloqueia armazenamento. Com movimento reduzido, a flor aparece imediatamente.
7. Encerramento com escolha dos próximos capítulos e chuva breve de pétalas, sem áudio automático.

Os blocos de conteúdo são visíveis por padrão. Apenas um IntersectionObserver inicializado com sucesso pode preparar animações; falhas em outros módulos não escondem a página. Sem JavaScript, a carta, a narrativa, três links de memórias e o acesso ao Spotify continuam disponíveis.

## Executar e publicar

Na raiz do repositório:

```sh
npm ci
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

Abrir `http://127.0.0.1:4173/TresAnos/` ou `http://127.0.0.1:4173/TresAnos/#carta`.

O build inclui ambos os sites estáticos via `scripts/build-static.mjs`. O workflow valida os arquivos e faz smoke test das duas páginas antes da publicação do artefato. Depois de enviar para `main`, a URL prevista é `https://vezetiv.is-a.dev/TresAnos/`. O projeto original continua em `/MusicasEFlores/`.
