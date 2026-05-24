# Handoff: specifica pre-implementazione Jimdo

Data: 2026-05-24

## Cosa e' stato fatto

Sono stati analizzati:

- screenshot nella root
- JSON estratti dal sito corretto
- memoria Jimdo gia' presente
- report del subagent di ricerca su Jimdo Creator
- `logo.jpeg`

Non e' stato scritto codice del sito.

## File aggiunti

- `dev/memorie/brief-sito-centro-insieme.md`
- `dev/memorie/guida-import-jimdo-creator.md`
- `dev/piani/2026-05-24-piano-implementazione-sito-jimdo.md`
- `dev/handoff/2026-05-24-specifica-pre-implementazione-jimdo.md`

## Decisioni confermate

- Target: Jimdo Creator.
- Home con sezione servizi raggiungibile tramite ancora.
- Pagina Servizi separata con tutte le card.
- Pagina Contatti separata.
- Card servizi verso pagine dedicate.
- Form contatti nativo Jimdo.
- Navbar fissa e floating navbar.
- Navigazione: Home, Servizi, Contatti, Cerca.
- Footer con contenuti reali del centro.
- Logo: `logo.jpeg`.
- Immagine hero: usare per ora immagine vecchia dal sito esistente.

## Attenzioni per il worker

- Non usare framework come deliverable.
- Non creare form custom con backend mancante.
- Non assumere che Jimdo permetta upload FTP o routing SPA.
- Mantenere CSS scoped con `.siga-`.
- Usare placeholder espliciti per email/indirizzo se non forniti.
- Fitness e sottocategorie non sono nei JSON: servono testi nuovi o placeholder.

## Prossimo passo

Avviare worker GPT-5.5 con reasoning low per implementare output statico e guida import, usando il piano appena creato.
