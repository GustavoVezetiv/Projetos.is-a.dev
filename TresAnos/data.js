import { preparedMedia } from './assets/amore/manifest.js';

// Somente a seleção revisada e otimizada. Os originais de Amore ficam locais.
export const anniversary = { start: '2023-10-16', celebration: '2026-10-16', timeZone: 'America/Cuiaba' };

function memory(id, caption, alt, options = {}) {
  if (!preparedMedia[id]) throw new Error(`Mídia não preparada: ${id}`);
  return { ...preparedMedia[id], caption, alt: alt || caption, ...options };
}

export const memories = [
  memory('IMG_20260308_203827_019', 'Ainda é você. Bem pertinho.', 'Selfie de Gustavo e Sabrina, com uma parede verde ao fundo', { featured: true, isNew: true, date: 'MARÇO DE 2026' }),
  memory('20251231_222202', 'Um beijo antes de outro começo.', 'Gustavo beijando a testa de Sabrina na virada para 2026', { isNew: true, date: 'DEZEMBRO DE 2025' }),
  memory('VID_129940216_024341_860', 'O sorriso que eu volto pra ver.'),
  memory('20260712_131441', 'Um mundo bonito. E nós dois nele.', 'Gustavo e Sabrina diante de uma lagoa azul cercada por paredões de pedra', { isNew: true, date: 'JULHO DE 2026' }),
  memory('IMG-20261004-WA0062', 'Mais um dia comum que eu guardaria.', 'Gustavo e Sabrina sentados juntos em uma mesa', { isNew: true, date: 'OUTUBRO DE 2026' }),
  memory('VID_373141130_072442_402', 'A gente, no meio do caminho.'),
  memory('20260216_205145', 'A melhor companhia pra fotografia.', 'Gustavo e Sabrina sorrindo juntos', { isNew: true, date: 'FEVEREIRO DE 2026' }),
  memory('20250914_024108', 'Meu par. Na foto e na vida.', 'Uma selfie de Gustavo e Sabrina em um encontro com amigos', { isNew: true, date: 'SETEMBRO DE 2025' }),
  memory('VID_20250504_115051_274', 'Nossos segundos de bobagem.'),
  memory('20250614_224016', 'É bom não ter pressa com você.', 'Gustavo e Sabrina deitados, fazendo uma fotografia divertida', { isNew: true, date: 'JUNHO DE 2025' }),
  memory('20250706_021950', 'Até o passeio vira história.', 'Sabrina em um brinquedo de parque e Gustavo sorrindo em primeiro plano', { isNew: true, date: 'JULHO DE 2025' }),
  memory('20250921_005034', 'O simples também fica.', 'Gustavo e Sabrina sentados lado a lado', { isNew: true, date: 'SETEMBRO DE 2025' }),
  memory('20250928_205200', 'Um pouquinho mais perto.', 'Selfie de Gustavo e Sabrina em casa', { isNew: true, date: 'SETEMBRO DE 2025' }),
  memory('20250928_205215', 'Mais uma, só pra guardar.', 'Gustavo e Sabrina no sofá', { isNew: true, date: 'SETEMBRO DE 2025' }),
  memory('20251031_183619', 'Os nossos jeitos de sorrir.', 'Gustavo e Sabrina juntos diante de uma parede alaranjada', { isNew: true, date: 'OUTUBRO DE 2025' }),
  memory('20251231_222324', 'Que venham todos os próximos anos.', 'Sabrina sorrindo enquanto Gustavo a beija no rosto', { isNew: true, date: 'DEZEMBRO DE 2025' }),
  memory('20260315_180214', 'O meu tipo de paz.', 'Gustavo e Sabrina juntinhos no sofá', { isNew: true, date: 'MARÇO DE 2026' }),
  memory('20260411_153023', 'Levar a gente pra passear.', 'Gustavo e Sabrina fazendo uma selfie ao ar livre', { isNew: true, date: 'ABRIL DE 2026' }),
  memory('20260712_131449', 'Outra paisagem. A mesma escolha.', 'Gustavo e Sabrina em pé perto da lagoa, com vegetação ao fundo', { isNew: true, date: 'JULHO DE 2026' }),
  memory('motion_photo_3360288516225348448', 'O carinho mora nos detalhes.', 'Gustavo e Sabrina abraçados diante de uma parede verde', { isNew: true }),
  memory('motion_photo_4245745456141610112', 'Meu lugar continua sendo aqui.', 'Sabrina abraçando Gustavo em uma selfie', { isNew: true }),
  memory('file_000000002428720e9f5f9704180f3339', 'Tantos pedacinhos. A mesma história.', 'Colagem de fotografias de Gustavo e Sabrina em diferentes momentos', { isNew: true }),
  memory('IMG_20231020_230101_960', 'Lá no começo, já era a gente.', 'Uma das primeiras fotografias guardadas, de outubro de 2023', { date: 'OUTUBRO DE 2023' }),
  memory('IMG_20240213_211925_641', 'As primeiras páginas continuam aqui.', 'Gustavo e Sabrina em uma selfie de fevereiro de 2024', { date: 'FEVEREIRO DE 2024' }),
  memory('20241102_170313', 'A gente sempre encontra um caminho.', 'Gustavo e Sabrina em um passeio ao ar livre', { date: 'NOVEMBRO DE 2024' }),
  memory('20250419_121703', 'Um abraço sem hora pra acabar.', 'Sabrina descansando junto de Gustavo', { date: 'ABRIL DE 2025' }),
  memory('IMG_20250504_144844_971-1', 'A melhor parte da mesa é você.', 'Gustavo e Sabrina sentados juntos em um passeio', { date: 'MAIO DE 2025' }),
  memory('20250608_001615', 'Uma das minhas partes favoritas.', 'Gustavo e Sabrina em uma selfie, lado a lado', { date: 'JUNHO DE 2025' }),
  memory('VID-20231015-WA0029', 'Um sorriso lá do comecinho.'),
  memory('VID-20240414-WA0041', 'Deixa eu reviver esse instante.'),
  memory('VID_20250118_172108_336', 'Só a gente, sem roteiro.'),
  memory('VID_20250315_180852_695', 'A câmera também guarda nossas risadas.'),
  memory('VID_20250323_001603_638', 'Um pedacinho de nós, em movimento.'),
  memory('VID_20250504_114918_046', 'As pequenas bobagens que eu amo.'),
  memory('VID_20250512_150034_510', 'Um olhar que eu conheço de perto.'),
  memory('VID_31521223_133938_337', 'Mais um instante que virou lembrança.'),
  memory('VID_373110502_035425_290', 'O caminho fica melhor com você.'),
  memory('VID_58540707_195417_397', 'O riso que faz falta quando você vai.'),
  memory('VID_69541221_015119_290', 'Um passeio, um abraço, a gente.'),
  memory('VID_95991214_033753_320', 'Se eu pudesse voltar só um pouquinho.'),
];

// Trechos conferidos no export fornecido. Autoria e grafia preservadas.
export const phrases = [
  { text: 'Aquele ponto colorido na página do nosso passado td preto e branco', author: 'Sabrina', date: '09.07.2024' },
  { text: 'E vc é o amor da minha vida e para minha vida', author: 'Sabrina', date: '08.09.2024' },
  { text: 'E pretendo todos os amanhãs também', author: 'Gustavo', date: '16.09.2024' },
  { text: 'Quero só fazer coisinhas de namorados com meu nanorado', author: 'Sabrina', date: '28.08.2026' },
  { text: 'obrigado amorzinho da minha vida detentor de todo meu amor', author: 'Gustavo', date: '06.10.2026' },
  { text: 'Obrigada amore lindo da minha vida', author: 'Sabrina', date: '06.10.2026' },
];

export const promises = [
  'Aprender a ouvir melhor.',
  'Cuidar do que parece pequeno.',
  'Escolher a gente nos dias comuns.',
  'Fazer espaço para as nossas conversas.',
  'Continuar aprendendo junto.',
  'Ter mais um abraço pra te dar.',
  'Lembrar de dizer: eu amo você.',
  'Cultivar todos os nossos amanhãs.',
];
