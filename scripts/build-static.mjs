import { cp, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { relative, sep } from 'node:path';
import { memories } from '../TresAnos/data.js';

// Make the local production build identical to the artifact sent to Pages.
const root = new URL('../', import.meta.url);
for (const site of ['MusicasEFlores', 'TresAnos']) {
  const source = new URL(`${site}/`, root);
  await cp(source, new URL(`dist/${site}/`, root), {
    recursive: true,
    filter: (path) => site !== 'TresAnos' || relative(fileURLToPath(source), path).split(sep)[0] !== 'Amore',
  });
  await access(new URL(`dist/${site}/index.html`, root));
  console.log(`Site estático incluído: dist/${site}/`);
}
for (const resource of ['TresAnos/app.js', 'TresAnos/data.js', 'TresAnos/styles.css', 'TresAnos/assets/botanical.svg', 'MusicasEFlores/assets/aMor.jpeg']) {
  await access(new URL(`dist/${resource}`, root));
}
for (const { file, poster, thumb } of memories) {
  for (const media of [file, poster, thumb].filter(Boolean)) {
    await access(new URL(media, new URL('dist/TresAnos/', root)));
  }
}
try {
  await access(new URL('dist/TresAnos/Amore/', root));
  throw new Error('O acervo original Amore não deve fazer parte do artefato público.');
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
console.log(`Artefato pronto em ${fileURLToPath(new URL('dist/', root))}`);
