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

- **Geist** (variabile, peso 100–900) — display e body. Usata sia per i
  titoli (pesi 600–700, tracking negativo) sia per il testo corrente (peso
  400).
- **Geist Mono** (variabile) — label, tag di categoria, meta dati (date,
  tipo progetto), navigazione.

Storia: la prima iterazione usava Fraunces (serif editoriale) + IBM Plex
Mono, con un'estetica da "manuale tecnico/scheda spec" (bracket, tag stile
codice a barre). L'utente l'ha giudicata "troppo industrial" e ha chiesto
qualcosa "più tech" → sostituita con Geist + Geist Mono, il typeface nativo
di Vercel: coerente con l'hosting scelto, percepito come più
"tech/contemporaneo" della coppia precedente.

Font incorporati come data URI (base64) nella preview per rispettare la CSP
degli Artifact — nel progetto Next.js reale andranno serviti normalmente
(`next/font` con Geist è supportato nativamente).

Microinterazioni: non ancora affrontate ("le vediamo più tardi" — richiesta
esplicita dell'utente di rimandarle). Per ora solo transizioni di base
(colore/bordo su hover, ~150ms) e un fade-in leggero all'ingresso della hero,
disattivato sotto `prefers-reduced-motion`.

## Contenuti reali

Due fonti diverse, tenute distinte:

**Repo GitHub** (aggiunte alla sessione e clonate in `/workspace/<repo>` per
leggere README/doc di design):

| Progetto | Repo | Categoria | Link nel sito |
|---|---|---|---|
| DoqTool | `ciao-madesign/EasyDoc` | Technical writing | repo (nessuna demo web ancora) |
| WizTrail | `ciao-madesign/WizTrail` | UX design | https://wiz-trail.vercel.app/ |
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
| KB | Brand design | PDF process deck | Brand abbigliamento tecnico alpino |
| asd Taino | Brand design | PDF overview | Rebrand società sportiva locale |
| Vetta Mountainwear | Brand design | Figma prototype | Sketch, naming + logo |
| Logo 4 fun — Rundagi Trail | Brand design | nessuno | Sketch, card statica (no link) |
| Jeff | Product design | Figma prototype | App mobile anti-spreco alimentare |
| Buon Mercato | Product design | PDF process deck | Marketplace produttori locali |
| Fresco | Product design | nessuno | Sketch/case study, card statica (no link) — attenzione: nella cartella "Work" del Framer compare come icona separata da "Buon Mercato", **non** sono lo stesso progetto |

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
  geist.woff2       — Geist Sans variabile (100–900), self-hosted
  geist-mono.woff2  — Geist Mono variabile (100–900), self-hosted
```

Font serviti come file statici (non data URI): a differenza della preview
Artifact — vincolata dalla CSP a font inline — qui i file separati sono
cacheable dal browser, scelta più corretta per un sito di produzione.

**Path relativi, non assoluti**: `index.html`/`styles.css` referenziano
`styles.css` e `fonts/...` senza `/` iniziale. Necessario per GitHub Pages:
un repo-project-page come questo è servito da un sottopercorso
(`ciao-madesign.github.io/personalhub/`, non dalla radice del dominio) — un
path assoluto tipo `/fonts/geist.woff2` risolverebbe a
`ciao-madesign.github.io/fonts/geist.woff2` (404). Verificato servendo il
sito da un mount point `/personalhub/` locale, non solo dalla radice.

Verificato con screenshot Playwright (desktop 1280px, mobile 390px, e sotto
il sottopercorso `/personalhub/`): grafo orbitale nell'hero corretto a
desktop, pillole impilate in riga su mobile senza linee SVG (comportamento
atteso, gestito via media query).

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
- [ ] Foto reale dell'utente al posto del placeholder "MA" nell'hero
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
