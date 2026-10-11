# Studio Laddaga — sito web

Sito statico (HTML, CSS e JavaScript vanilla) di Antonella Laddaga, fisioterapista a Gravina in Puglia.

## Struttura

```
index.html            home
css/style.css         stili della home (si appoggia a blog/assets/blog.css)
js/main.js            menu hamburger + invio form Formspree (tutte le pagine)
img/                  hero.jpg, antonella.jpg
blog/index.html       indice del blog con filtri per area
blog/*.html           32 articoli
blog/assets/blog.css  design system condiviso: palette, font, header, footer, card
sitemap.xml, robots.txt
```

## Dati da completare

Nei file HTML ci sono segnaposto tra parentesi quadre da sostituire con i dati reali:
`[NUMERO]`, `[EMAIL]`, `[INDIRIZZO]`, `[ORARI]`, `[PROFILO]`, `[PARTITA IVA]`.
Nei link `wa.me/[NUMERO]` il numero va in formato internazionale senza "+" (es. `393331234567`).

Per attivare il modulo di prenotazione, in `index.html` sostituire `IL_TUO_ID`
nell'attributo `action` del form con l'ID del proprio form Formspree.

## Anteprima locale

Aprire `index.html` nel browser, oppure servire la cartella con un qualsiasi server statico.
