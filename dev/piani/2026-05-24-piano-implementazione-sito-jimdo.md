# Piano di implementazione: sito Jimdo Centro Insieme

Data: 2026-05-24

## Stato

Piano pronto per worker. Non e' stato scritto codice del sito in questa fase.

## Vincoli Jimdo confermati

Il target e' Jimdo Creator.

Formato di consegna richiesto al worker:

- file locali di anteprima statica per verificare layout
- snippet HTML/CSS/JS modulari importabili in `Widget/HTML`
- CSS comune con prefisso `.siga-`
- guida di import umano in Jimdo
- nessun backend custom
- form contatti nativo Jimdo

Non creare un'app React/Next/Vite come output finale. Se si usa tooling locale per prototipare, il deliverable Jimdo deve restare vanilla HTML/CSS/JS.

## Architettura pagine

### Home

Contiene:

- fixed navbar
- hero
- ancora `<div id="siga-servizi"></div>` prima della sezione servizi
- sezione servizi/listings con card principali
- footer

La voce `Servizi` nella navbar deve puntare alla sezione nella home tramite ancora e, quando utile, anche alla pagina separata servizi.

### Pagina Servizi

Pagina separata Jimdo con:

- fixed navbar
- titolo "Servizi offerti"
- griglia completa delle card
- link da ogni card alla pagina dedicata del servizio
- footer

### Pagina Contatti

Pagina separata Jimdo con:

- fixed navbar
- testo introduttivo
- dettagli contatto reali disponibili
- area riservata al formulario nativo Jimdo
- footer

Il worker deve produrre il blocco visuale attorno al form, ma il form effettivo deve essere inserito manualmente con l'elemento Jimdo `Formulario di contatto`.

### Pagine dettaglio servizio

Una pagina per servizio:

- hero compatta o header servizio
- contenuto tratto dai JSON disponibili
- CTA verso contatti
- link "Torna ai servizi"
- footer

## Servizi e slug suggeriti

- `neuropsichiatria-infantile`
- `valutazione-diagnostica-dsa`
- `doposcuola-specializzato-dsa`
- `training-attenzione-memoria`
- `logopedia`
- `neuropsicomotricita`
- `counseling`
- `dietistica`
- `fitness`
- `fitness-piloga`
- `fitness-body-sculpture`
- `fitness-ginnastica-posturale`

Fitness puo' essere una pagina servizio con tre sottosezioni, oppure una pagina principale con tre card interne. Evitare di creare le sottocategorie come elementi nascosti: devono essere raggiungibili in modo chiaro.

## Componenti da implementare

1. `siga-navbar`
   - fixed top
   - logo reale
   - link Home, Servizi, Contatti
   - controllo Cerca

2. `siga-floating-nav`
   - appare dopo scroll
   - posizionata in alto a sinistra
   - icone per Home, Servizi, Contatti, Cerca
   - accessibile con label testuali per screen reader

3. `siga-hero`
   - layout asimmetrico
   - titolo: "Centro Insieme Sanremo"
   - payoff basato sui contenuti reali: valutazione, diagnosi, certificazione DSA e riabilitazione
   - immagine vecchia del sito a destra
   - CTA "Scopri i servizi" e "Contattaci"

4. `siga-services-preview`
   - sezione con ancora `siga-servizi`
   - card servizi principali
   - link alla pagina servizi completa

5. `siga-services-grid`
   - griglia completa per pagina Servizi
   - include Fitness e sottocategorie

6. `siga-contact-shell`
   - layout contatti
   - dettagli reali disponibili
   - spazio indicato per form Jimdo nativo

7. `siga-footer`
   - colonne informative
   - contatti reali
   - link rapidi

8. `siga-service-detail`
   - template riutilizzabile per pagine dettaglio servizio

## Formato snippet consigliato

Ogni blocco deve essere autonomo:

- wrapper root con `class="siga-block siga-nomecomponente"`
- attributo `data-siga-component`
- CSS scoped al blocco o CSS comune `.siga-*`
- JS opzionale incapsulato in IIFE
- nessuna dipendenza esterna obbligatoria

Per icone, preferire SVG inline semplici o testo accessibile. Non usare librerie esterne se evitabile.

## Asset

Asset locali:

- `logo.jpeg`

Asset da JSON:

- immagine home: `https://image.jimcdn.com/app/cms/image/transf/dimension=1920x10000:format=jpg/path/sc5164cb4bf2843ac/image/i57bb504373dfe56d/version/1495550801/image.jpg`
- altre immagini servizio disponibili nei JSON

Il worker deve predisporre mapping asset in modo che l'utente possa sostituire URL dopo il caricamento su Jimdo.

## Note responsive

Desktop:

- navbar orizzontale
- hero a due colonne
- card servizi ampie, ispirate a carousel/listings

Mobile:

- navbar compatta
- hero a colonna, immagine sotto o sopra testo
- floating nav non deve coprire contenuti importanti
- card servizi in colonna o scroll orizzontale gestibile

## Verifica richiesta

Il worker deve:

- creare anteprima locale
- verificare desktop e mobile
- controllare assenza di overlap testuale
- verificare che le ancore funzionino
- verificare che i link tra pagine siano coerenti
- produrre guida import Jimdo

## Prompt consigliato per worker GPT-5.5 low

Implementa il sito statico Jimdo Creator per Centro Insieme Sanremo basandoti su:

- `dev/memorie/jimdo-import-design.md`
- `dev/memorie/brief-sito-centro-insieme.md`
- `dev/piani/2026-05-24-piano-implementazione-sito-jimdo.md`
- screenshot root
- JSON in `019e5aac-6266-746f-b8e5-c65ab1481cf3/`

Non sei solo nel codebase: non revertire modifiche altrui. Crea output vanilla HTML/CSS/JS e snippet modulari importabili in Jimdo Creator. Non usare React/Next come deliverable. Non implementare backend form: prevedi il modulo nativo Jimdo. Alla fine lascia guida import e handoff.
