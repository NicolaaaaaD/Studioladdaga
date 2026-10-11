# Studio Laddaga — sito web

Sito statico (HTML, CSS e JavaScript vanilla) di Antonella Laddaga, fisioterapista a Gravina in Puglia.
Pubblicato automaticamente da Vercel a ogni push su `main`.

## Struttura

```
index.html            home
css/style.css         unico foglio di stile (home, blog e articoli)
js/main.js            menu mobile, filtro del blog, invio form Formspree, anno nel footer
img/                  logo, favicon, foto (antonella-cutout: PNG + versione WebP leggera)
blog/index.html       indice del blog con filtro per area (Colonna, Arto superiore, Arto inferiore, Altro)
blog/*.html           32 articoli, tutti con la stessa struttura (page-hero + article + article-cta)
sitemap.xml, robots.txt
```

## Brand

Colori del logo definiti come variabili in `css/style.css`: viola `#5B3A8E`, lilla `#C3B3DF`,
testo `#22302D`, crema `#F2F0EB`. Il verde è usato solo per WhatsApp.

## Dati da completare

Nei file HTML ci sono segnaposto tra parentesi quadre da sostituire con i dati reali:
`[NUMERO]`, `[WHATSAPP]`, `[EMAIL]`, `[INDIRIZZO]`, `[ORARI]`, `[PROFILO]`, `[PARTITA IVA]`.
Nei link `wa.me/[WHATSAPP]` il numero va in formato internazionale senza "+" (es. `393331234567`).

Per attivare il modulo di prenotazione, in `index.html` sostituire `IL_TUO_ID`
nell'attributo `action` del form con l'ID del proprio form Formspree.

## Anteprima locale

Aprire `index.html` nel browser, oppure servire la cartella con un qualsiasi server statico.
