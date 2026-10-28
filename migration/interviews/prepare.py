import csv
import json
import random
import uuid
from pathlib import Path

root = Path(__file__).resolve().parent
colors = 'red orange amber gold blue sky navy purple pink teal tan rose'.split()
rows = list(csv.DictReader((root / 'interviews.csv').open(encoding='utf-8-sig', newline='')))
assert rows, 'CSV is empty'
previous = json.loads((root / 'prepared.json').read_text()) if (root / 'prepared.json').exists() else []
previous = {doc['sourceId']: doc for doc in previous}
docs = []
seen = set()
for index, row in enumerate(rows, 1):
    row = {key: value.strip() for key, value in row.items()}
    source = row.get('sourceId') or row.get('sourceID')
    assert source and source not in seen, f'Invalid/duplicate source ID at row {index}'
    seen.add(source)
    category = row['category'].lower()
    assert row['name'] and category in ['media', 'sports', 'entertainment', 'challengers'], f'Invalid required fields: {source}'
    image = root / 'images' / row['imageFile']
    matches = [image] if image.is_file() else list((root / 'images').glob(row['imageFile'] + '.*'))
    assert len(matches) == 1 and matches[0].suffix in ['.png', '.jpg'], f'Invalid image: {source}'
    old = previous.get(source, {})
    color = row['accentColor'] or old.get('accentColor') or random.choice(colors)
    assert color in colors, f'Invalid color: {source}'
    assert row['featured'].upper() in ['TRUE', 'FALSE', ''], f'Invalid featured: {source}'
    doc = {'_id': old.get('_id') or str(uuid.uuid4()), '_type': 'episode', 'sourceId': source,
           'category': category, 'accentColor': color, 'featured': row['featured'].upper() == 'TRUE',
           'order': int(row['order']) if row['order'] else index, 'imageFile': matches[0].name}
    for field in ['name', 'nameRoman', 'catchphrase', 'affiliation', 'description', 'instagramId', 'instagramPostId', 'favoriteSong', 'favoriteArtist']:
        if row[field]:
            doc[field] = row[field]
    spotify = row.get('SpotifyLink') or row.get('Spotify リンク')
    if spotify:
        assert spotify.startswith('https://open.spotify.com/'), f'Invalid Spotify URL: {source}'
        doc['spotifyLink'] = spotify
    docs.append(doc)
(root / 'prepared.json').write_text(json.dumps(docs, ensure_ascii=False, indent=2))
print(f'Validated {len(docs)} documents and images; saved persistent IDs and colors.')
