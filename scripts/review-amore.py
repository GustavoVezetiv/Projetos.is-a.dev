"""Local-only visual inventory. Contact sheets must be written outside the site."""
import argparse
import hashlib
import io
import json
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageOps

parser = argparse.ArgumentParser()
parser.add_argument('--output', type=Path, required=True)
args = parser.parse_args()
root = Path(__file__).resolve().parent.parent
source = root / 'TresAnos' / 'Amore'
original = root / 'MusicasEFlores' / 'Spotfy' / 'Imagens' / 'MeuAmor'
args.output.mkdir(parents=True, exist_ok=True)
inventory = []
tiles = []
for path in sorted(source.iterdir()):
    if not path.is_file():
        continue
    old = original / path.name
    duplicate = old.exists() and hashlib.sha256(path.read_bytes()).digest() == hashlib.sha256(old.read_bytes()).digest()
    video = path.suffix.lower() == '.mp4'
    info = {'file': path.name, 'duplicate': duplicate, 'bytes': path.stat().st_size, 'type': 'video' if video else 'image'}
    try:
        if video or path.suffix.lower() == '.heic':
            probe = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'stream=codec_type,codec_name,width,height:format=duration', '-of', 'json', str(path)], capture_output=True, check=True)
            metadata = json.loads(probe.stdout)
            streams = [stream for stream in metadata['streams'] if stream.get('codec_type') == 'video']
            info['streams'] = streams
            duration = float(metadata.get('format', {}).get('duration', 0))
            info['duration'] = duration
            frames = []
            moments = [duration * .15, duration * .5, duration * .8] if video else [0]
            for moment in moments:
                command = ['ffmpeg', '-v', 'error']
                if video:
                    command += ['-ss', str(round(moment, 3))]
                command += ['-i', str(path), '-frames:v', '1', '-vf', 'scale=380:380:force_original_aspect_ratio=decrease', '-f', 'image2pipe', '-vcodec', 'png', '-threads', '1', 'pipe:1']
                frame = subprocess.run(command, capture_output=True, check=True)
                frames.append(Image.open(io.BytesIO(frame.stdout)).convert('RGB'))
            image = frames[0]
        else:
            image = ImageOps.exif_transpose(Image.open(path)).convert('RGB')
            frames = [image]
        info['width'], info['height'] = image.size
        if video:
            tile = Image.new('RGB', (570, 266), '#eee9df')
            draw = ImageDraw.Draw(tile)
            for index, frame in enumerate(frames):
                frame = ImageOps.contain(frame, (186, 220))
                tile.paste(frame, (index * 190 + (186 - frame.width) // 2, (220 - frame.height) // 2))
            draw.text((8, 231), path.name, fill='#302c27')
            draw.text((8, 248), f'{duration:.1f}s / {"duplicate" if duplicate else "NEW"}', fill='#793844')
        else:
            tile = Image.new('RGB', (250, 320), '#eee9df')
            image = ImageOps.contain(image, (238, 274))
            tile.paste(image, ((250 - image.width) // 2, (274 - image.height) // 2))
            draw = ImageDraw.Draw(tile)
            draw.text((6, 281), path.name[:36], fill='#302c27')
            draw.text((6, 300), 'same as original' if duplicate else 'NEW', fill='#793844')
        tiles.append((video, tile))
    except Exception as error:
        info['error'] = str(error)
    inventory.append(info)

for video, columns, per_page, width, height in [(False, 4, 16, 250, 320), (True, 2, 8, 570, 266)]:
    group = [tile for is_video, tile in tiles if is_video == video]
    for offset in range(0, len(group), per_page):
        page = group[offset:offset + per_page]
        rows = (len(page) + columns - 1) // columns
        sheet = Image.new('RGB', (columns * width, rows * height), '#eee9df')
        for index, tile in enumerate(page):
            sheet.paste(tile, ((index % columns) * width, (index // columns) * height))
        target = args.output / f'{"videos" if video else "photos"}-{offset // per_page + 1}.jpg'
        sheet.save(target, quality=88)
        print(target)
(args.output / 'inventory.json').write_text(json.dumps(inventory, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'files': len(inventory), 'duplicates': sum(item['duplicate'] for item in inventory), 'errors': [item for item in inventory if 'error' in item]}, ensure_ascii=False))
