# personalhub — contesto di progetto

Sito portfolio personale di Michele Aldeni: un unico raccoglitore di link e
piccole preview verso i suoi progetti, organizzato per competenza. Sostituisce
l'attuale portfolio su Framer (madesign.framer.ai — non raggiungibile dal
proxy di questa sessione, quindi non ancora analizzato direttamente; solo
menzionato dall'utente).

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

## Progetti reali (sostituiscono i placeholder)

Repo aggiunte alla sessione e clonate in `/workspace/<repo>` per leggere i
contenuti reali (README, doc di design) e scrivere descrizioni accurate
invece di segnaposto:

| Progetto | Repo | Categoria assegnata | Live URL | Note |
|---|---|---|---|---|
| DoqTool | `ciao-madesign/EasyDoc` | Technical writing | — (solo repo) | CCMS offline-first per PMI manifatturiere, editor HMI/PLC integrato |
| WizTrail | `ciao-madesign/WizTrail` | UX design | https://ciao-madesign.github.io/WizTrail/ (dominio custom pending) | Calcolo difficoltà trail running (WDI) da GPX, tutto client-side |
| Maccu | `ciao-madesign/Maccu` | Brand design | — (solo repo) | Sito vetrina photo-first per attività artigianale, con un vero design system (palette crema/argilla/inchiostro, 4 registri tipografici, Astro+Tailwind) |
| Adapta | `ciao-madesign/Adapta` | Product design | https://adapta.run | Piattaforma di training per runner, piani adattivi, Next.js + AI opzionale (Claude) |
| balzar | `ciao-madesign/balzar` | Product design | — (solo repo) | Generazione deterministica di contenuti da payload minimo via QR, motore Python puro |

Criterio di assegnazione categoria: non forzato a 1 progetto/categoria — dove
un progetto è chiaramente rappresentativo di più aree (es. Adapta è anche UX)
si è scelta la categoria più distintiva rispetto agli altri progetti già
assegnati, per evitare sovrapposizioni inutili nella griglia.

Per DoqTool, Maccu e balzar non risulta un URL di produzione confermato nei
repo — i link puntano alla repo GitHub finché non vengono forniti URL live.

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

Non ancora attivato lato repo. Serve un passaggio manuale nelle impostazioni
GitHub (Settings → Pages → Source: Deploy from a branch) che questa sessione
non ha strumenti per fare da API — va fatto dall'utente o affidato a un
prossimo giro con permessi adeguati. Il branch di lavoro attuale è
`claude/personal-portfolio-site-a0613u`: perché l'URL pubblico serva questi
file, la source di Pages deve puntare a questo branch (root) oppure il
branch va mergiato su `main` e Pages configurato su `main` (root) — nessuna
GitHub Action di build necessaria, è già puro output statico.

## Stato attuale

- [x] Direzione visiva approvata (lista nera + hero ibrida)
- [x] Decisione stack: HTML/CSS statico, no framework
- [x] Sito reale scaffoldato (`index.html` + `styles.css` + `fonts/`),
      verificato in browser (desktop + mobile)
- [ ] Microinterazioni (rimandate, da definire in una sessione successiva)
- [ ] Foto reale dell'utente al posto del placeholder "MA" nell'hero
- [ ] URL live per DoqTool/Maccu/balzar, se/quando disponibili
- [ ] Contenuti dal portfolio Framer esistente (madesign.framer.ai) — non
      raggiungibile dal proxy di rete di questa sessione (403 a livello di
      tunnel, confermato via `/__agentproxy/status`: policy denial su
      `framer.ai`, non un problema del sito). L'utente porterà screenshot
      delle pagine nella prossima interazione.
- [ ] Attivare GitHub Pages sul repo (Settings → Pages), puntato al branch
      giusto — vedi sezione "Deploy su GitHub Pages" sopra

## Prossimi passi proposti

1. Utente porta screenshot del portfolio Framer → aggiornare copy/contenuti
   di conseguenza (about, eventuali progetti non ancora coperti).
2. Sostituire il placeholder "MA"/"la tua foto qui" con una foto reale.
3. Attivare GitHub Pages (merge su `main` + Settings → Pages) per avere
   l'URL pubblico https://ciao-madesign.github.io/personalhub/ live.
4. Tornare sulle microinterazioni una volta stabili contenuti e struttura.
