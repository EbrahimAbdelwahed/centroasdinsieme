# Memoria: brief sito Centro Insieme Sanremo

Data: 2026-05-24

## Obiettivo

Realizzare un sito statico compatibile con Jimdo Creator per Centro Insieme Sanremo, importabile tramite snippet HTML/CSS/JS modulari e contenuti nativi Jimdo.

Il sito deve mantenere una composizione grafica moderna ispirata agli screenshot presenti nella root del progetto:

- `landing_page.png`
- `listings.png`
- `contact_form.png`
- `fixed_navbar.png`
- `floating_navbar.png`
- `footer.png`

## Target tecnico

Target: Jimdo Creator.

Non progettare come sito statico caricabile via FTP. Jimdo non permette upload completo di file HTML/PHP come hosting tradizionale.

Formato richiesto:

- snippet modulari incollabili in elementi `Widget/HTML`
- CSS scoped con prefisso `.siga-`
- CSS comune eventualmente inseribile in `Menu > Impostazioni > Modifica Head`
- form contatti nativo Jimdo, non form custom senza backend
- pagine separate create manualmente in Jimdo Creator

## Struttura sito

Il sito ha:

- home/landing page
- sezione servizi nella home raggiungibile tramite ancora `#siga-servizi`
- pagina separata `Servizi` con card di tutti i servizi
- pagina separata `Contatti` con contenuti testuali e modulo contatti nativo Jimdo
- pagine dedicate per ogni servizio

## Navigazione

Navbar fissa:

- logo `logo.jpeg`
- Home
- Servizi
- Contatti
- Cerca

Floating navbar:

- Home
- Servizi
- Contatti
- Cerca

La floating navbar deve apparire dopo lo scroll, in alto a sinistra, ispirata a `floating_navbar.png`.

## Servizi

Servizi da includere:

- Servizio di Neuropsichiatria Infantile
- Valutazione Diagnostica D.S.A.
- Doposcuola specializzato per dislessia, disgrafia, discalculia, disortografia
- Training di potenziamento dell'attenzione e della memoria
- Logopedia
- Neuropsicomotricita'
- Counseling
- Dietistica
- Fitness

Fitness contiene tre sottocategorie:

- Piloga
- Body Sculpture
- Ginnastica posturale

Ogni servizio deve avere una card e una pagina dedicata.

## Contenuti reali disponibili

I JSON estratti dal sito esistente sono in:

`019e5aac-6266-746f-b8e5-c65ab1481cf3/`

Contengono testi e immagini per:

- Home
- Servizi
- Neuropsichiatria Infantile
- Valutazione Diagnostica D.S.A.
- Doposcuola specializzato
- Training attenzione/memoria
- Logopedia
- Neuropsicomotricita'
- Counseling
- Dietistica

Per Fitness, Piloga, Body Sculpture e Ginnastica posturale servono contenuti nuovi o placeholder dichiarati.

## Contatti reali emersi dai dati

Dal sito esistente risultano:

- telefono mobile: `339-3351687`
- telefono fisso: `0184-841549`

Non risultano ancora in modo affidabile email e indirizzo fisico completo nei JSON estratti. Se non forniti dal cliente, il worker deve lasciare placeholder chiaramente marcati oppure usare solo i dati confermati.

## Direzione visuale

Stile:

- bianco dominante
- nero per titoli e navigazione
- grigi caldi/neutri per testi secondari
- pochi accenti colore derivati dal logo e dall'immagine hero
- tipografia sans-serif moderna, pesi forti nei titoli
- layout arioso, non marketing eccessivo

Hero:

- composizione asimmetrica simile a `landing_page.png`
- testo a sinistra
- immagine vecchia del sito a destra per ora
- logo reale integrato in testata o hero
- CTA verso servizi e contatti

Servizi/listings:

- titolo "Servizi offerti"
- testo introduttivo breve
- card orizzontali/scrollabili su desktop, griglia su mobile o pagina servizi
- immagini con overlay leggero e testo leggibile

Contatti:

- pagina separata
- layout a due colonne su desktop: testo/dettagli a sinistra, formulario nativo Jimdo a destra
- su mobile diventa una colonna

Footer:

- contenuti reali del centro
- colonne: Centro, Servizi, Contatti
- telefono mobile e fisso
- link a privacy/cookie se presenti o da creare in Jimdo
