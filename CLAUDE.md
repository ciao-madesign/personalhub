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
con le competenze come pillole cliccabili che si irradiano attorno e
scrollano alla sezione corrispondente. Il grafo NON si estende ai progetti
(troppo fragile su mobile / con pochi o tanti item) — resta confinato
all'hero.

**Da 4 a 3 sezioni/nav, ma 4 pillole nell'hero**: inizialmente 4 sezioni
(Product/Technical writing/UX/Brand), poi Technical writing è stata
assorbita dentro Product design (vedi sezione "Contenuti reali" → DoqTool)
su richiesta dell'utente: "DoqTool è technical writing ma lo allineerei a
product design come sottocategoria — è un product design di un prodotto
specifico per technical writing". Nessuna nuova UI per la sottocategoria
(sarebbe over-engineering per una sola card): DoqTool vive come card
normale dentro la griglia Product design, il taglio "technical writing"
resta leggibile dal titolo/descrizione della card stessa. Nav in alto: 3
voci (Product/UX/Brand). Pillole hero invece sono tornate a **4**: l'utente
ha chiesto di tenere comunque "Technical writer" nel grafo orbitale anche
senza una sezione a cui rimandare ("è comunque la mia qualifica
principale") — resa come `<span class="node static">` invece di `<a>`,
stessa forma a pillola ma senza link/hover/cursor da elemento cliccabile
(stesso pattern già usato per le card senza link, es. Fresco). Grafo
orbitale quindi di nuovo a 4 punti (alto, destra, basso-destra,
basso-sinistra), non più il triangolo a 3.

**Animazione pillole hero**: richiesta esplicita ("le label si muovano
lentamente in loop"). Ogni `<li>` del grafo orbitale ha un piccolo drift
verticale in loop (`@keyframes node-float`, ±6px, 8-11s a seconda della
pillola con delay negativi diversi per non muoversi in sincrono) — usa la
proprietà CSS `translate` (separata da `transform`) apposta per non entrare
in conflitto con il `transform: translate(...)` già usato per il
posizionamento assoluto della pillola stessa. Solo desktop (dentro la media
query ≥760px dove esiste il grafo), disattivata sotto
`prefers-reduced-motion`.

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

- **Piazzolla** (variabile, peso 400–700, normal + italic) — display: nome
  in hero (h1, peso 700), titoli dei progetti (h3, peso 700), bio hero
  (italic, peso 500), firma nel footer (italic, peso 500).
- **Instrument Sans** (variabile, peso 400–700, normal + italic) — body:
  descrizioni progetto, intro di sezione, testo corrente generico.
- **Geist Mono** (variabile) — tenuto per label, tag di categoria, meta dati,
  navigazione: è una convenzione funzionale (dati/etichette), non la firma
  tipografica del sito, quindi resta anche nella direzione "più elegante".

Storia: prima iterazione Fraunces + IBM Plex Mono ("troppo industrial") →
Geist + Geist Mono ("più tech", legato all'hosting Vercel inizialmente
previsto) → Instrument Serif + Instrument Sans ("più elegante, meno tech" —
richiesta esplicita dopo il passaggio a GitHub Pages) → **Piazzolla**
(sostituisce solo il display, Instrument Sans resta per il body): Instrument
Serif aveva un solo peso disponibile (400), troppo sottile/delicato secondo
l'utente ("non mi convince, voglio font più spessi"). Proposte tre
alternative con peso alto in una preview a confronto (Fraunces 700, Bodoni
Moda 700, Piazzolla 700) — scelto Piazzolla: serif "da libro", solido già di
suo, meno contrasto/drammaticità di Bodoni Moda, più presenza di Instrument
Serif senza scadere nel vistoso.

Font serviti come file statici self-hosted in `fonts/` (non data URI, vedi
sezione sulla struttura del repo).

Microinterazioni: rimandate a lungo ("le vediamo più tardi"), poi
implementate su richiesta esplicita — prima proposte come lista di opzioni
(stagger reveal, divisori "disegnati", parallax hover thumbnail, battito sui
tag LIVE, parallax hero, luce che segue il cursore), poi tutte approvate e
costruite. Vedi sezione "Microinterazioni (JS)" più sotto per l'implementazione.

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

**Corretto dopo la prima resa**: l'utente l'ha trovato "troppo invadente,
colorato, fitto" → puntini e chiarore passati da colore accento (teal) a
neutro (`--paper`), opacità dimezzata (24%→6% il chiarore, 38%→12% i
puntini), spaziatura griglia allargata (24px → 34px, meno fitta).

**Bug trovato e corretto**: la prima versione usava `z-index: -1` sul div,
pensando lo mandasse dietro a tutto — invece lo mandava dietro anche allo
sfondo del `<body>`, rendendolo invisibile (verificato via screenshot: zero
puntini visibili nonostante il CSS calcolato fosse corretto). La causa è
l'ordine di painting CSS: un discendente `position: fixed` con `z-index`
esplicito (anche negativo) partecipa allo stacking context della radice, che
si piazza sotto il colore di sfondo del `<body>` stesso. Soluzione: nessuno
`z-index` sul div, lasciato come primo figlio di `<body>` così l'ordine nel
DOM basta a tenerlo dietro a header/main.

## Microinterazioni (JS)

Prima introduzione di JavaScript nel sito (`script.js`, un IIFE, nessuna
dipendenza esterna) — fino a qui il sito era volutamente a zero JS. Sei
effetti, tutti proposti come lista di opzioni all'utente e poi approvati
in blocco:

1. **Card stagger reveal**: le `.project` card partono a `opacity:0` /
   `translate: 0 16px` e diventano visibili (classe `.in-view`) quando
   entrano nel viewport via `IntersectionObserver`, con un piccolo
   `transition-delay` scalato sull'indice della card nella propria griglia
   (`--reveal-delay`, 70ms per card) per l'effetto a cascata.
2. **Divisori "disegnati"**: la linea sottile tra le sezioni non è più un
   `border-top` statico ma uno `::before` con `transform: scaleX(0) →
   scaleX(1)` animato quando la sezione entra nel viewport (stesso
   `IntersectionObserver`, soglia diversa).
3. **Parallax hover sulle thumbnail**: al `mousemove` sopra una `.thumb`,
   l'immagine di sfondo si sposta di pochi px in direzione opposta al
   cursore (`--thumb-x`/`--thumb-y`, calcolate nel `background-position`
   via `calc()`), torna a 0 al `mouseleave`.
4. **Battito sui tag `LIVE`**: `@keyframes tag-pulse` (opacità
   100%→55%→100%, 2.4s) su `.tag.tag-live` — classe aggiunta solo ai tag
   `LIVE` effettivi (Adapta, WizTrail; Balzar/DoqTool sono stati rietichettati
   `DEMO` dall'utente direttamente su GitHub, quindi non pulsano). Puro CSS,
   nessuna dipendenza da JS.
5. **Parallax nella hero**: scrollando, il grafo orbitale si sposta più
   lento del testo (`translateY(scrollY * -0.12)`, clampato a ±40px). Solo
   desktop (`min-width: 760px`), calcolato in un handler di scroll con
   `requestAnimationFrame`.
6. **Luce che segue il cursore**: terzo layer aggiunto a `.bg-decor`
   (`--cursor-glow`, default `none`), un `radial-gradient` la cui posizione
   viene aggiornata ad ogni frame con un lerp verso la posizione del mouse
   (`curX += (targetX - curX) * 0.06`) per un movimento morbido invece che a
   scatti. Resta `none` (invisibile) finché l'utente non muove il mouse
   almeno una volta — niente luce "fantasma" al centro schermo prima di
   qualunque interazione.

**Pattern di sicurezza usati per non rompere nulla**:
- **Reduced motion rispettato ovunque**: `script.js` controlla
  `prefers-reduced-motion: reduce` in cima e fa `return` subito se attivo —
  nessuno dei sei effetti si attiva, verificato per ciascuno via
  `page.emulateMedia({ reducedMotion: 'reduce' })` in Playwright.
- **Progressive enhancement per il reveal**: la classe `.js-reveal` (che
  abilita `opacity:0`/`scaleX(0)` di partenza per card e divisori) viene
  aggiunta a `<html>` solo da JS. Se JS non gira per qualunque motivo, card
  e divisori restano semplicemente sempre visibili invece di restare
  bloccati invisibili — mai un elemento nascosto "a meno che" JS lo mostri.
- **Bug evitato sul parallax hero**: il `.orbit` esterno ha già una CSS
  animation (`reveal`/`rise`, fade-in all'ingresso pagina) con
  `animation-fill-mode: both` sulla proprietà `transform` — se il parallax
  JS avesse scritto `transform` direttamente su `.orbit`, l'animazione CSS
  persistente (che ha priorità di cascade più alta di uno style inline)
  avrebbe silenziosamente ignorato/sovrascritto il valore JS. Soluzione:
  aggiunto un wrapper interno `.orbit-parallax` (`position:absolute;
  inset:0`, stesse dimensioni del genitore) che riceve il `transform` del
  parallax, lasciando `.orbit` libero di gestire solo il proprio fade-in.
- **`.thumb` a due livelli di background** (immagine + pattern segnaposto,
  vedi sezione Contenuti reali) già usava `background-position` per
  entrambi i layer: il parallax aggiunge l'offset solo al layer
  dell'immagine via `calc(50% + var(--thumb-x))`, il layer del pattern
  resta a `0 0` fisso.

## Contenuti reali

Due fonti diverse, tenute distinte:

**Repo GitHub** (aggiunte alla sessione e clonate in `/workspace/<repo>` per
leggere README/doc di design):

| Progetto | Repo | Categoria | Link nel sito |
|---|---|---|---|
| DoqTool | `ciao-madesign/EasyDoc` | Product design | repo (nessuna demo web ancora) |
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
| Buon Mercato | UX design | PDF process deck | Marketplace produttori locali |

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
- **Buon Mercato** → UX design (non Product): richiesta esplicita
  dell'utente, nessuna motivazione di contenuto data — se serve rivalutare
  in futuro, il testo descrive un marketplace/piattaforma quindi
  starebbe altrettanto bene in Product design.
- **DoqTool** → assorbito dentro Product design, sezione "Technical
  writing" eliminata come sezione a sé (vedi "Direzione scelta" sopra per
  il ragionamento completo).

**Ordine delle sezioni**: Product design, UX design, Brand design —
priorità esplicita dell'utente (non l'ordine alfabetico/originale usato in
precedenza). Stesso ordine riflesso nella nav in alto e nelle pillole
dell'hero.

**Progetto in evidenza**: Adapta è il progetto più importante dell'utente
("il mio progetto top"), WizTrail il secondo — richiesta esplicita di
metterli in evidenza/ordine. Implementato con classe `.project.featured`
solo su Adapta: card a doppia larghezza (`grid-column: span 2`, torna a 1
sotto 480px), bordo permanentemente accent (non solo in hover come le
altre), titolo più grande, ed etichetta della prima colonna del meta
cambiata da "Live product" a "Progetto principale". WizTrail spostato al
secondo posto nella griglia Product design (dopo Adapta, prima di Balzar).

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
`<div class="thumb" style="--thumb-img:url('img/projects/adapta.png')">`.
Basta caricare il file con il nome giusto in `img/projects/` (stesso
meccanismo usato per `img/profile.png`, via GitHub UI o altro) e l'immagine
sostituisce automaticamente il pattern diagonale segnaposto — nessuna
modifica al codice necessaria. Il CSS impila due livelli di background
(l'immagine sopra, il pattern sotto): se il file manca o il nome non
combacia, ricade silenziosamente sul segnaposto invece di un'icona rotta.
Nomi file attesi (tutti `.png`, minuscolo, aspect ratio 3:2 consigliato —
formato cambiato da `.jpg` a `.png` su richiesta esplicita dell'utente):

```
img/projects/adapta.png           img/projects/wego.png
img/projects/balzar.png           img/projects/jeff.png
img/projects/wiztrail.png         img/projects/jeff.jpg
img/projects/buon-mercato.png     img/projects/sign-up-page.png
img/projects/doqtool.png          img/projects/lynx-provision.png
img/projects/vetta-mountainwear.png
img/projects/maccu.png
img/projects/kb.png
img/projects/asd-taino.png
img/projects/logo-4-fun.png
```

Tutte e 15 caricate dall'utente e verificate a schermo (nessuna richiesta
fallita) — `jeff.jpg` è l'unica in `.jpg` invece di `.png` (formato del
file originale, il riferimento nel markup usa l'estensione reale).

**Errori di upload ricorrenti, corretti**: l'utente ha caricato le
immagini via GitHub UI due volte con problemi simili — (1) le prime 12
sono finite sia in `img/` che in `img/projects/` (duplicati byte-identici,
verificato via md5sum, cancellate le copie in `img/`); (2) `jeff.jpg` è
finito in `img/` invece che in `img/projects/` (spostato); (3) il file per
KB era stato caricato come `img/projects/mockup embroidery.png` (nome del
export, non rinominato) — l'utente l'ha poi ricaricato correttamente come
`kb.png` ma senza rimuovere il vecchio, quindi anche quello è stato
cancellato (stesso file, verificato via md5sum). **Occhio a questo pattern
in sessioni future**: dopo ogni round di upload dell'utente, controllare
`img/` e `img/projects/` per duplicati/posizioni sbagliate prima di dare
per scontato che tutto sia a posto.

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
index.html       — unica pagina, markup semantico
styles.css        — tutti gli stili, token colore/tipografia come custom
                    properties su :root (stessi valori descritti sopra)
script.js         — microinterazioni (reveal a scroll, parallax, luce
                    cursore, battito tag LIVE), vedi sezione dedicata sopra.
                    Unico JS del sito: lo smooth scroll resta CSS
                    (`scroll-behavior`), non serviva JS per quello.
fonts/
  piazzolla.woff2                — Piazzolla variabile (400–700), normal
  piazzolla-italic.woff2         — Piazzolla variabile (400–700), italic
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
- [x] Microinterazioni: stagger reveal, divisori disegnati, parallax hover
      thumbnail, battito tag LIVE, parallax hero, luce che segue il cursore
      — vedi sezione "Microinterazioni (JS)"
- [x] Foto reale dell'utente al posto del placeholder "MA" nell'hero —
      l'utente ha caricato `img/profile.png` direttamente su `main` via
      GitHub UI, mergiato nel branch di lavoro
- [x] Thumbnail reali per tutti e 15 i progetti, caricate dall'utente in
      `img/projects/` via GitHub UI
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
