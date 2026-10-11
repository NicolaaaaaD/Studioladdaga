# Cartella blog — Studio Laddaga

32 articoli + indice filtrabile, integrati nel design del sito.

## Contenuto
- `index.html` — indice del blog con filtro per area (Colonna / Arto superiore / Arto inferiore / Altro)
- 32 articoli in HTML, uno per patologia (naming kebab-case)
- Lo stile è in `../css/style.css`, condiviso con la home; il menu e il filtro sono in `../js/main.js`

## Struttura di un articolo
Intestazione `.page-hero` (categoria, titolo, introduzione, autore), corpo `<article class="article">`
con `<h2>`, `<p>`, `<ul>` e i riquadri `.tips` (consigli pratici) e `.redflags` (quando rivolgersi
a un medico), poi l'avviso `.avviso` e l'invito a prenotare `.article-cta`.

## Nota sui contenuti (importante)
Gli articoli sono scritti in linguaggio divulgativo su base di linee guida ed evidenze
internazionali (NICE, JOSPT, BJSM, EULAR, letteratura su menisco/caviglia/lesioni muscolari).
Prima della pubblicazione DEVONO essere riletti e approvati da Antonella Laddaga:
i contenuti escono a nome di una professionista sanitaria e l'ultima parola clinica è la sua.
