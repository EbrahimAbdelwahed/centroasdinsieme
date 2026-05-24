# Import Jimdo Creator - Centro Insieme Sanremo

Data: 2026-05-24

## Contenuto della consegna

- `site/`: anteprima statica locale navigabile.
- `assets/siga-common.css`: CSS comune scoped con classi `.siga-*`.
- `assets/siga-common.js`: JS opzionale per floating navbar e ricerca locale.
- `snippets/`: blocchi HTML modulari per Widget/HTML Jimdo.

## Anteprima locale

Aprire direttamente:

`jimdo-export/site/index.html`

Oppure avviare un server statico dalla root del workspace:

```sh
python3 -m http.server 8080
```

Poi visitare `http://localhost:8080/jimdo-export/site/`.

## Ordine di import consigliato

1. Verificare che il sito sia Jimdo Creator, non Website Builder/Dolphin.
2. Caricare `logo.jpeg` tra le immagini Jimdo e copiare il suo URL.
3. Incollare il contenuto di `assets/siga-common.css` in `Menu > Impostazioni > Modifica Head`, dentro un tag `<style>...</style>`.
4. Incollare il contenuto di `assets/siga-common.js` in `Modifica Head`, dentro un tag `<script>...</script>`, oppure in un Widget/HTML comune.
5. Creare le pagine Jimdo: Home, Servizi, Contatti e le pagine dettaglio servizio.
6. Per ogni pagina, aggiungere un elemento `Widget/HTML` e incollare lo snippet corrispondente.
7. Se si usa `snippets/nav-footer-widget.html`, sostituire `[URL LOGO JIMDO]` con l'URL del logo caricato.
8. Verificare i link generati da Jimdo e correggere gli slug se l'editor crea URL diversi.

## Snippet disponibili

- `home-widget.html`: hero e sezione servizi con ancora `id="siga-servizi"`.
- `servizi-widget.html`: griglia completa di tutti i servizi.
- `contatti-widget.html`: shell grafica per la pagina contatti.
- `service-detail-template.html`: base per ogni pagina dettaglio.
- `nav-footer-widget.html`: navbar fissa, floating navbar, ricerca e footer se non si usa il tema Jimdo.

## Form contatti

Non e' stato implementato un backend custom.

Nella pagina Contatti:

1. Inserire `contatti-widget.html`.
2. Aggiungere sotto o dentro l'area indicata l'elemento Jimdo nativo `Formulario di contatto`.
3. Configurare email destinataria, CAPTCHA, testo privacy e messaggio di conferma.
4. Eseguire un invio reale di test dopo la pubblicazione.

## Placeholder da completare

- Email: `[INSERIRE EMAIL]`
- Indirizzo: `[INSERIRE INDIRIZZO]`
- Fitness, Piloga, Body Sculpture, Ginnastica posturale: `[TESTO DA CONFERMARE]`

## Note tecniche

- Tutte le classi custom sono prefissate `.siga-`.
- Non ci sono dipendenze esterne obbligatorie.
- Il contenuto resta visibile anche se il JS non viene caricato; senza JS non appaiono floating nav e ricerca.
- Gli URL immagini esterni provengono dai JSON del sito esistente. Dopo import finale, caricare gli asset in Jimdo e sostituire gli URL dove necessario.
- La voce Servizi in home punta a `#siga-servizi`; dalle altre pagine usare `/#siga-servizi` o lo slug Jimdo corretto della home.
