# Cartella blog — Studio Laddaga

Sezione blog completa: 32 articoli + indice filtrabile, pronta da copiare
nella cartella del progetto Studioladdaga (dentro una sottocartella `blog/`).

## Contenuto
- `index.html` — indice del blog con filtri per area (Colonna / Spalla-gomito-mano / Anca-ginocchio-piede / Benessere)
- 32 articoli in HTML, uno per patologia (naming kebab-case)
- `assets/blog.css` — foglio di stile condiviso, palette lilla, font Fraunces + Figtree (Google Fonts)

## Note per chi integra (Claude Code / sviluppatore)
1. I link "Home" e "Prenota una valutazione" puntano a `../index.html` e `../index.html#contatti`:
   funzionano quando la cartella `blog/` sta dentro la root del sito accanto a `index.html`.
2. Nel footer ci sono segnaposto da sostituire: telefono, email, indirizzo.
3. La home del sito può linkare `blog/index.html` e mostrare in anteprima le card
   (il markup `.card` in `blog/index.html` è riutilizzabile).
4. Palette: #F7F5FB sfondo, #2C2142 lilla profondo, #6E4FA3 lilla primario,
   #9A7BC8 accento, #C9BFDD lilla tenue — da riprendere anche nella home.

## Nota sui contenuti (importante)
Gli articoli sono scritti in linguaggio divulgativo su base di linee guida ed evidenze
internazionali (NICE, JOSPT, BJSM, EULAR, letteratura su menisco/caviglia/lesioni muscolari).
Prima della pubblicazione DEVONO essere riletti e approvati da Antonella Laddaga:
i contenuti escono a nome di una professionista sanitaria e l'ultima parola clinica è la sua.
