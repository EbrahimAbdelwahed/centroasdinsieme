# Backup statico centroasdinsieme.it - 2026-05-24

Questa cartella contiene una copia statica del sito pubblico `https://www.centroasdinsieme.it/` catturata il 2026-05-24.

## Contenuto

- `site/`: pagine HTML navigabili localmente.
- `assets/`: immagini, CSS, JavaScript e font scaricati dal sito/Jimdo.
- `manifest.json`: elenco delle pagine catturate e conteggio asset.
- `mirror-site.mjs`: script usato per rigenerare il mirror dal sito live.

## Come aprirlo

Metodo diretto:

```bash
open live-backup-2026-05-24/site/index.html
```

Metodo consigliato, con server locale:

```bash
python3 -m http.server 8080 --directory live-backup-2026-05-24
```

Poi apri:

```text
http://localhost:8080/site/
```

## Note operative

Il mirror include le 16 pagine pubblicate nella sitemap del sito e 133 asset scaricati. Alcune piccole immagini di librerie Jimdo legacy hanno risposto `403 Forbidden` durante il download; sono asset decorativi/plugin non centrali, lasciati come dipendenza remota se ancora referenziati dai CSS.

Questa copia serve come riferimento locale per testi, immagini, struttura e layout. Non e' importabile automaticamente in Jimdo come restore point.
