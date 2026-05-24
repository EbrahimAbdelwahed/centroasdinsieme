# Guida import umano in Jimdo Creator

Data: 2026-05-24

## Prerequisito

Verificare che il sito sia Jimdo Creator.

Indicatore utile:

- `cms.e.jimdo.com` indica Creator
- `builder.e.jimdo.com` indica Website Builder/Dolphin

Se il sito e' Website Builder/Dolphin, fermare l'import di codice custom: non supporta HTML/CSS/JS custom.

## Import consigliato

1. Creare una pagina test in Jimdo Creator.
2. Aggiungere un elemento `Widget/HTML`.
3. Incollare un solo blocco snippet.
4. Salvare e verificare in anteprima.
5. Pubblicare e verificare anche fuori dall'editor.
6. Ripetere con gli altri blocchi.
7. Solo dopo il test, spostare eventuale CSS comune in `Menu > Impostazioni > Modifica Head`.

## Dove mettere cosa

### HTML di sezione

Inserire in elementi `Widget/HTML` nella pagina interessata.

### CSS comune

Preferenza iniziale: dentro lo stesso snippet per test rapido.

Preferenza finale: `Menu > Impostazioni > Modifica Head`, se lo stesso CSS e' usato su piu' pagine.

Il CSS deve restare prefissato `.siga-`.

### JavaScript

Solo se necessario, dentro lo snippet o in `Modifica Head`.

Regole:

- incapsulare in IIFE
- non dipendere da librerie esterne
- non rendere invisibile contenuto senza JS

### Immagini

Caricare immagini tramite Jimdo quando possibile oppure usare URL assoluti temporanei.

Dopo il caricamento, sostituire gli URL nel codice.

### Form contatti

Non incollare un form HTML statico.

Nella pagina Contatti:

1. inserire il blocco visuale/testuale custom
2. aggiungere l'elemento Jimdo `Formulario di contatto`
3. configurare email destinataria, CAPTCHA e messaggio di conferma
4. verificare invio reale

Nota: per attivita' sanitarie o dati sensibili, valutare testo privacy/disclaimer adeguato. Il form Jimdo non va considerato automaticamente conforme a obblighi di segretezza professionale.

## Ancore

Per la sezione servizi nella home usare:

- destinazione: `id="siga-servizi"`
- link: `href="#siga-servizi"` nella stessa pagina
- da altre pagine: usare URL della home piu' `#siga-servizi`

Evitare spazi, accenti e caratteri speciali negli ID.

Se il tema Jimdo ha navigazione fissa, testare che l'ancora non finisca nascosta sotto l'header.

## Checklist finale

- Prodotto confermato come Jimdo Creator.
- Pagina test creata.
- Un blocco alla volta importato e testato.
- CSS scoped `.siga-*`.
- Nessun selettore globale aggressivo.
- Immagini visibili su desktop e mobile.
- Navbar fissa non copre il contenuto.
- Floating navbar non copre form o CTA.
- Ancora `#siga-servizi` testata.
- Link card servizi testati.
- Form nativo Jimdo configurato e testato.
- Footer con dati reali o placeholder approvati.
- Privacy/cookie verificati in Jimdo.

## Fonti ufficiali

- https://help.jimdo.com/hc/it/articles/115005505763-Come-inserisco-dei-codici-nel-mio-sito
- https://help.jimdo.com/hc/it/articles/115005947286-Come-inserisco-un-widget-nel-mio-sito
- https://help.jimdo.com/hc/it/articles/115005510703-Come-posso-caricare-il-mio-sito-su-Jimdo
- https://help.jimdo.com/hc/it/articles/115005504963-Come-inserisco-un-formulario-di-contatto
- https://help.jimdo.com/hc/en-us/articles/115005522443-How-do-I-create-anchor-links
- https://help.jimdo-dolphin.com/hc/it/articles/26931604070044-Aggiungere-codice-personalizzato-o-widget-esterni-in-Jimdo-Website-Builder
