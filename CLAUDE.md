# personalhub — contesto di progetto

Sito portfolio personale di Michele Aldeni: un unico raccoglitore di link e
piccole preview verso i suoi progetti, organizzato per competenza. Sostituisce
l'attuale portfolio su Framer (madesign.framer.ai — non raggiungibile dal
proxy di questa sessione; contenuti acquisiti via screenshot forniti
dall'utente, vedi sezione "Contenuti reali" sotto).

Il Framer esistente ha un'identità visiva molto diversa (desktop retro anni
'90, pixel art, finestre draggabili, wordmark "MAD") — l'utente ha scelto
esplicitamente di **non** portarla nel nuovo sito: si tiene l'editoriale
nero+teal+Geist già approvato, il Framer serve solo come fonte di contenuti
(bio, progetti, link) da riscrivere in italiano.

Repo di destinazione: `ciao-madesign/personalhub`.
Branch di lavoro: `claude/personal-portfolio-site-a0613u`.
Hosting: GitHub Pages — https://ciao-madesign.github.io/personalhub/
(deciso inizialmente Vercel, poi cambiato dall'utente).

**Istruzione permanente dell'utente**: ogni modifica va pushata anche su
`main`, non solo sul branch di lavoro ("pusha tutto su main sempre") — non
chiedere conferma ogni volta, va fatto di default a fine sessione/modifica.
Attenzione: l'utente carica occasionalmente file direttamente su `main` via
GitHub UI (es. `img/profile.png`) — i due branch possono divergere, in tal
caso serve un merge vero (non fast-forward), non un semplice push.

Questo file va tenuto aggiornato ad ogni sessione: è la fonte di verità per
le decisioni di design/contenuto prese finora, non solo un log.

## Direzione scelta

Tra due concept proposti (grafo "a molecola" con nodi interattivi vs. pagina
nera con lista progetti per categoria), l'utente ha scelto la seconda,
ibridata con un elemento della prima: nell'hero, un nodo centrale (avatar)
con le 4 competenze come pillole cliccabili che si irradiano attorno e
scrollano alla sezione corrispondente. Il grafo NON si estende ai progetti
(troppo fragile su mobile / con pochi o tanti item) — resta confinato
all'hero.

Struttura one-page, sezioni per competenza, ciascuna con una griglia di
progetti (card con thumbnail segnaposto, titolo, descrizione breve, meta in
monospace, link esterno).

## Design tokens (stato attuale)

Definiti come custom properties su `:root` nella preview. Pagina
intenzionalmente **sempre dark** (scelta esplicita dell'utente, "pagina tutta
black") — non è previsto un tema chiaro alternativo.

```css
--ink: #0a0d0d;          /* sfondo, quasi nero, neutro con lieve bias freddo */
--ink-raised: #121818;   /* card, avatar, superfici sollevate */
--paper: #e6ecec;        /* testo primario */
--paper-dim: #8ea3a2;    /* testo secondario */
--paper-faint: #4a5d5c;  /* meta, note, testo terziario */
--accent: #37b8ac;       /* teal — CTA, hover, tag categoria */
--accent-hover: #63d6ca;
--hair: #1f2929;         /* bordi, divisori */
```

Storia: la prima iterazione usava un accento ambra/simil-arancio (ispirato a
un'estetica da "scheda tecnica/manuale"). L'utente l'ha respinto perché
"troppo in stile Claude" → sostituito con un teal. I neutri (`paper*`,
`hair`, `ink*`) sono stati ritinti con un lieve bias freddo per stare in
coerenza con l'accento, invece di restare grigi neutri di default.

## Tipografia

- **Instrument Serif** (peso 400 unico, normal + italic) — display: nome in
  hero (h1), titoli dei progetti (h3), bio hero (italic), firma nel footer
  (italic). Un solo peso disponibile: nessun `font-weight` diverso da 400 va
  usato con questa famiglia (niente 500/600/700, il browser farebbe un
  fake-bold).
- **Instrument Sans** (variabile, peso 400–700, normal + italic) — body:
  descrizioni progetto, intro di sezione, testo corrente generico.
- **Geist Mono** (variabile) — tenuto per label, tag di categoria, meta dati,
  navigazione: è una convenzione funzionale (dati/etichette), non la firma
  tipografica del sito, quindi resta anche nella direzione "più elegante".

Storia: prima iterazione Fraunces + IBM Plex Mono ("troppo industrial") →
Geist + Geist Mono ("più tech", legato all'hosting Vercel inizialmente
previsto) → **Instrument Serif + Instrument Sans** ("più elegante, meno
tech" — richiesta esplicita dopo il passaggio a GitHub Pages, quindi il
legame con Vercel non era più un argomento a favore di Geist). Instrument
Serif è stato scelto tra tre proposte (alternative: Fraunces uno "usato con
più delicatezza", o Cormorant Garamond per continuità con il Framer
originale) perché è la coppia più "di tendenza" nel design editoriale
attuale, coerente con la richiesta di un sito "attento alle tendenze".

Font serviti come file statici self-hosted in `fonts/` (non data URI, vedi
sezione sulla struttura del repo).

Microinterazioni: non ancora affrontate ("le vediamo più tardi" — richiesta
esplicita dell'utente di rimandarle). Per ora solo transizioni di base
(colore/bordo su hover, ~150ms) e un fade-in leggero all'ingresso della hero,
disattivato sotto `prefers-reduced-motion`.

## Sfondo animato

Richiesta esplicita: "pattern animato tipo puntini". Proposte tre opzioni
(griglia di puntini con drift CSS puro, campo di particelle/costellazione
via canvas nell'hero, griglia statica + luce che si sposta) — l'utente ha
scelto la terza. Implementata come `.bg-decor`: un `<div>` fisso
(`position: fixed`, prima cosa nel `<body>`) con due layer di
`background-image` sulla stessa proprietà — un `radial-gradient` a griglia
di puntini (statico, tassellato ogni 24px) e un secondo `radial-gradient` più
grande e sfumato (il "chiarore") la cui `background-position` viene animata
lentamente (70s, ease-in-out, alternate) via `@keyframes`; i due layer usano
`background-blend-mode: screen, normal` così il chiarore illumina i puntini
che attraversa invece di limitarsi a sovrapporsi. `prefers-reduced-motion`
disattiva l'animazione (resta la griglia statica). `pointer-events: none`
per non intercettare i click.

**Bug trovato e corretto**: la prima versione usava `z-index: -1` sul div,
pensando lo mandasse dietro a tutto — invece lo mandava dietro anche allo
sfondo del `<body>`, rendendolo invisibile (verificato via screenshot: zero
puntini visibili nonostante il CSS calcolato fosse corretto). La causa è
l'ordine di painting CSS: un discendente `position: fixed` con `z-index`
esplicito (anche negativo) partecipa allo stacking context della radice, che
si piazza sotto il colore di sfondo del `<body>` stesso. Soluzione: nessuno
`z-index` sul div, lasciato come primo figlio di `<body>` così l'ordine nel
DOM basta a tenerlo dietro a header/main.

## Contenuti reali

Due fonti diverse, tenute distinte:

**Repo GitHub** (aggiunte alla sessione e clonate in `/workspace/<repo>` per
leggere README/doc di design):

| Progetto | Repo | Categoria | Link nel sito |
|---|---|---|---|
| DoqTool | `ciao-madesign/EasyDoc` | Technical writing | repo (nessuna demo web ancora) |
| WizTrail | `ciao-madesign/WizTrail` | Product design | https://wiz-trail.vercel.app/ |
| Maccu | `ciao-madesign/Maccu` | Brand design | repo (nessun URL live confermato) |
| Adapta | `ciao-madesign/Adapta` | Product design | https://adapta.run |
| balzar | `ciao-madesign/balzar` | Product design | https://balzar-eight.vercel.app/ |

**Framer** (bio + case study "Work" + sketch, letti da screenshot forniti
dall'utente, riscritti in italiano):

| Progetto | Categoria | Link nel sito | Note |
|---|---|---|---|
| Wego | UX design | PDF process deck | App carpooling, case study completo |
| Sign up page | UX design | Figma prototype | Sketch, template UI |
| Lynx ProVision | UX design | link Framer (progetto, non pubblicato — possibile 403 per chi non ha accesso) | Sketch, landing page occhiali sportivi |
| Vetta Mountainwear | Brand design (prima voce della sezione) | Figma prototype | Sketch, naming + logo |
| KB | Brand design | PDF process deck | Brand abbigliamento tecnico alpino |
| asd Taino | Brand design | PDF overview | Rebrand società sportiva locale |
| Logo 4 fun — Rundagi Trail | Brand design | nessuno | Sketch, card statica (no link) |
| Jeff | UX design | Figma prototype | App mobile anti-spreco alimentare |
| Fresco | UX design | nessuno | Sketch/case study, card statica (no link) — attenzione: nella cartella "Work" del Framer compare come icona separata da "Buon Mercato", **non** sono lo stesso progetto |
| Buon Mercato | Product design | PDF process deck | Marketplace produttori locali |

Bio hero riscritta a partire da quella reale del Framer ("Hi, I'm Michele, a
designer with a passion for creative communication...").

**Criterio di categorizzazione**: non forzato a 1 progetto/categoria — dove
un progetto è rappresentativo di più aree si è scelta la categoria più
distintiva rispetto a quanto già assegnato. Gli sketch (lavori più leggeri,
spesso senza processo documentato) **non** hanno una sezione a parte —
richiesta esplicita dell'utente: vivono dentro le stesse 4 categorie dei
progetti "pesanti", distinti solo dal meta-tag "Sketch" nella card invece di
un anno inventato.

Corretto dopo la prima stesura, su indicazione dell'utente:
- **WizTrail** → Product design (non UX): è una web app completa sviluppata
  al 100% dall'utente, non un case study di processo — il peso ("Live
  product") la avvicina ad Adapta/balzar più che ai case study Framer.
- **Jeff** e **Fresco** → UX design (non Product): entrambi centrati su
  flusso/usabilità nella loro descrizione originale (non parlano di logo o
  identità visiva, a differenza delle voci Brand), quindi spostati da
  Product a UX. Se in una sessione successiva emerge che Fresco è più
  brand-oriented (il naming/wordmark suggerisce lavoro di identità), va
  rivalutato — l'utente ha detto solo "più brand/UX" senza specificare quale
  dei due per ciascuno.
- **Vetta Mountainwear** spostato in prima posizione nella sezione Brand
  design (richiesta esplicita), le altre voci seguono nell'ordine
  precedente.

**Ordine delle sezioni**: Product design, Technical writing, UX design,
Brand design — priorità esplicita dell'utente (non l'ordine alfabetico/
originale usato in precedenza). Stesso ordine riflesso nella nav in alto e
nelle pillole dell'hero.

**Sistema meta-tag delle card** (sostituisce l'anno, che non avevamo per i
progetti Framer e non volevamo inventare): prima colonna = "peso" della voce
(`Live product` / `Progetto` / `Case study` / `Sketch`), seconda colonna =
dominio/una riga descrittiva. Il tag pill sulla thumbnail segue lo stesso
criterio del link: `LIVE` (demo pubblica), `REPO` (solo codice), `DECK` (PDF
di processo), `LINK` (prototipo Figma/Framer). Le card senza link esterno
(Fresco, Logo 4 fun) sono `<div class="project static">` invece di `<a>` —
niente hover/cursor da link, niente tag pill: l'assenza comunica l'assenza
di risorsa, non serve un'etichetta esplicita.

**Thumbnail dei progetti — dove caricarle**: ogni `.thumb` ha già l'aggancio
pronto via custom property inline, es.
`<div class="thumb" style="--thumb-img:url('img/projects/adapta.jpg')">`.
Basta caricare il file con il nome giusto in `img/projects/` (stesso
meccanismo usato per `img/profile.png`, via GitHub UI o altro) e l'immagine
sostituisce automaticamente il pattern diagonale segnaposto — nessuna
modifica al codice necessaria. Il CSS impila due livelli di background
(l'immagine sopra, il pattern sotto): se il file manca o il nome non
combacia, ricade silenziosamente sul segnaposto invece di un'icona rotta.
Nomi file attesi (tutti `.jpg`, minuscolo, aspect ratio 3:2 consigliato):

```
img/projects/adapta.jpg           img/projects/wego.jpg
img/projects/balzar.jpg           img/projects/jeff.jpg
img/projects/wiztrail.jpg         img/projects/fresco.jpg
img/projects/buon-mercato.jpg     img/projects/sign-up-page.jpg
img/projects/doqtool.jpg          img/projects/lynx-provision.jpg
img/projects/vetta-mountainwear.jpg
img/projects/maccu.jpg
img/projects/kb.jpg
img/projects/asd-taino.jpg
img/projects/logo-4-fun.jpg
```

## Stack: niente Next.js/Tailwind

Deciso esplicitamente con l'utente: il sito è una vetrina one-page che
rimanda quasi tutto a risorse esterne (repo, demo live) — nessun dato
dinamico, nessun form, nessun CMS. Next.js + Tailwind sarebbero over-coding
per questo scope: aggiungono build step, `node_modules`, complessità di
deploy senza alcun beneficio reale qui.

**Scelta: HTML + CSS statico, nessun framework, nessun build step.**
Se in futuro servisse contenuto dinamico (blog degli sketch, CMS) si
rivaluta — ma non si progetta ora per quello scenario ipotetico.

## Struttura del repo (sito reale)

```
index.html       — unica pagina, markup semantico, nessun JS (non ancora
                    necessario: lo smooth scroll è CSS, `scroll-behavior`)
styles.css        — tutti gli stili, token colore/tipografia come custom
                    properties su :root (stessi valori descritti sopra)
fonts/
  instrument-serif.woff2         — Instrument Serif normal, peso 400 unico
  instrument-serif-italic.woff2  — Instrument Serif italic, peso 400 unico
  instrument-sans.woff2          — Instrument Sans variabile (400–700), normal
  instrument-sans-italic.woff2   — Instrument Sans variabile (400–700), italic
  geist-mono.woff2               — Geist Mono variabile (100–900), self-hosted
img/
  profile.png       — foto reale dell'utente, avatar hero
  projects/          — thumbnail progetti, vedi tabella nomi file sopra
```

Font serviti come file statici (non data URI): a differenza della preview
Artifact — vincolata dalla CSP a font inline — qui i file separati sono
cacheable dal browser, scelta più corretta per un sito di produzione.

**Path relativi, non assoluti**: `index.html`/`styles.css` referenziano
`styles.css` e `fonts/...` senza `/` iniziale. Necessario per GitHub Pages:
un repo-project-page come questo è servito da un sottopercorso
(`ciao-madesign.github.io/personalhub/`, non dalla radice del dominio) — un
path assoluto tipo `/fonts/geist-mono.woff2` risolverebbe a
`ciao-madesign.github.io/fonts/geist-mono.woff2` (404). Verificato servendo il
sito da un mount point `/personalhub/` locale, non solo dalla radice.

Verificato con screenshot Playwright (desktop 1280px, mobile 390px, e sotto
il sottopercorso `/personalhub/`): grafo orbitale nell'hero corretto a
desktop, pillole impilate in riga su mobile senza linee SVG (comportamento
atteso, gestito via media query).

**Impaginazione compattata** (richiesta esplicita: "troppo scroll, pagina
più raccolta"): ridotti proporzionalmente i padding di hero/sezioni/footer,
il gap della griglia progetti (1.6rem → 1.1rem), la larghezza minima delle
card (260px → 210px, così su desktop entrano 4 colonne invece di 3) e
l'aspect ratio delle thumbnail (4:3 → 3:2, meno alte). Altezza pagina totale
passata da ~4200px a ~3100px a 1280px di viewport (~26% in meno), verificato
via screenshot.

## Deploy su GitHub Pages

`claude/personal-portfolio-site-a0613u` è stato mergiato (fast-forward) su
`main`: `main` ora contiene `index.html` + `styles.css` + `fonts/` pronti.
Manca solo l'ultimo passaggio manuale — Settings → Pages → Source: Deploy
from a branch → `main` (root) — che questa sessione non ha strumenti per
fare da API, va fatto dall'utente. Nessuna GitHub Action di build
necessaria, è già puro output statico.

## Stato attuale

- [x] Direzione visiva approvata (lista nera + hero ibrida) — confermato di
      NON adottare l'estetica retro/pixel del Framer esistente
- [x] Decisione stack: HTML/CSS statico, no framework
- [x] Sito reale scaffoldato (`index.html` + `styles.css` + `fonts/`),
      verificato in browser (desktop + mobile)
- [x] Contenuti reali importati da Framer (via screenshot) + repo GitHub:
      15 voci totali su 4 categorie (vedi tabella sopra), bio hero riscritta
- [ ] Microinterazioni (rimandate, da definire in una sessione successiva)
- [x] Foto reale dell'utente al posto del placeholder "MA" nell'hero —
      l'utente ha caricato `img/profile.png` direttamente su `main` via
      GitHub UI, mergiato nel branch di lavoro
- [ ] Thumbnail reali dei progetti al posto del placeholder pattern
      diagonale (nessuna immagine è stata scaricata/incorporata da fonti
      esterne — solo i link di approfondimento)
- [ ] URL live per DoqTool/Maccu, se/quando disponibili
- [x] Branch di lavoro mergiato su `main` (merge fast-forward, nessun
      conflitto) — `main` ora contiene il sito statico completo
- [ ] Attivare GitHub Pages sul repo (Settings → Pages → Source: Deploy
      from a branch → `main`, root) — ultimo passaggio manuale rimasto,
      questa sessione non ha strumenti per farlo da API

## Prossimi passi proposti

1. Sostituire il placeholder "MA"/"la tua foto qui" con una foto reale
   (l'utente ne ha una, usata nel Framer per la pagina /about).
2. Procurarsi/esportare immagini reali per le thumbnail dei 15 progetti.
3. Attivare GitHub Pages (Settings → Pages, branch `main`) per avere l'URL
   pubblico https://ciao-madesign.github.io/personalhub/ live.
4. Tornare sulle microinterazioni una volta stabili contenuti e struttura.
