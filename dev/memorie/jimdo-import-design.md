# Memoria: design HTML/CSS da importare in Jimdo

Data: 2026-05-24

## Contesto

Il progetto prevede di sviluppare design web fuori da Jimdo e poi portarli dentro Jimdo mantenendo il piu' possibile la composizione grafica.

Jimdo ha vincoli proprietari: non e' un hosting generico con accesso FTP completo e non tutti i prodotti Jimdo permettono codice custom.

## Distinzione critica

Jimdo ha due ambienti principali:

- Jimdo Website Builder / Dolphin
- Jimdo Creator

Questa distinzione decide se possiamo importare codice custom.

## Jimdo Website Builder / Dolphin

Jimdo Website Builder / Dolphin non permette codice personalizzato.

Non consente:

- HTML custom
- CSS custom
- JavaScript custom
- iframe
- widget esterni

Con Dolphin non possiamo importare un sito custom mantenendo fedelmente la grafica tramite codice. In quel caso bisogna ricostruire il sito con i blocchi nativi Jimdo, oppure usare/migrare verso Jimdo Creator se il requisito e' importare codice.

Fonte ufficiale:

- https://help.jimdo-dolphin.com/hc/en-us/articles/26931604070044-Adding-custom-code-or-external-widgets-in-Jimdo-Website-Builder

## Jimdo Creator

Jimdo Creator permette l'inserimento di codice personalizzato.

Opzioni utili:

- elemento `Widget/HTML` per inserire codice in pagina
- CSS personalizzato
- JavaScript personalizzato
- template personale da `Design > Avanzato > Template personale`
- caricamento di file nella sezione template, se disponibile per il piano/account

Fonti ufficiali:

- https://help.jimdo.com/hc/it/articles/115005505763-Come-inserisco-dei-codici-nel-mio-sito
- https://help.jimdo.com/hc/it/articles/115005510703-Come-posso-caricare-il-mio-sito-su-Jimdo

## Strategia consigliata

Sviluppare il sito come HTML/CSS modulare compatibile con Jimdo Creator, non come app moderna dipendente da build tool.

Preferire:

- HTML statico semplice
- CSS vanilla
- JavaScript minimo e non critico per il layout
- classi CSS con prefisso di progetto, per esempio `.siga-*`
- componenti riutilizzabili ma copiabili in blocchi Jimdo
- asset ottimizzati e caricabili tramite gli strumenti Jimdo
- layout responsive verificato prima localmente e poi dentro Jimdo

Evitare, salvo richiesta esplicita:

- React, Vue, Next.js o framework che richiedono build/runtime complessi
- dipendenze esterne non essenziali
- CSS globale aggressivo su `body`, `html`, `h1`, `a`, ecc. senza scope
- selettori che possono rompere il tema Jimdo
- layout che dipendono da script per apparire correttamente

## Regole pratiche per i design

- Usare un wrapper radice per ogni blocco importabile, per esempio `<section class="siga-section siga-hero">`.
- Prefissare tutte le classi con `siga-`.
- Tenere il CSS scoped sotto il wrapper quando possibile.
- Usare immagini con dimensioni definite, `alt` testuali e formati compressi.
- Evitare font esterni se non necessari; se usati, prevedere fallback robusti.
- Non dare per scontato che Jimdo permetta upload libero di ogni file o path.
- Testare mobile e desktop prima dell'import.
- Dopo l'import, controllare collisioni con header, navigazione, footer e CSS del tema Jimdo.

## Flusso operativo suggerito

1. Verificare se il sito del cliente e' su Jimdo Creator o Dolphin.
2. Se e' Dolphin, chiarire che il codice custom non e' supportato.
3. Se e' Creator, progettare blocchi HTML/CSS indipendenti.
4. Creare prototipo locale statico.
5. Isolare il CSS con prefisso `.siga-*`.
6. Importare prima un singolo blocco di prova in `Widget/HTML` o template personale.
7. Correggere conflitti di stile.
8. Solo dopo il test, importare il resto del sito.

## Decisione attuale

Per questo progetto, assumere come target tecnico Jimdo Creator finche' non viene confermato il contrario.

Se il cliente usa Jimdo Website Builder / Dolphin, fermarsi prima di implementare codice custom e proporre una delle seguenti strade:

- ricostruzione visuale con blocchi nativi Jimdo
- passaggio a Jimdo Creator
- uso di una piattaforma diversa se il design custom e' requisito rigido
