# personalhub — contesto di progetto

Sito portfolio personale di Michele Aldeni: un unico raccoglitore di link e
piccole preview verso i suoi progetti, organizzato per competenza. Sostituisce
l'attuale portfolio su Framer (madesign.framer.ai — non raggiungibile dal
proxy di questa sessione, quindi non ancora analizzato direttamente; solo
menzionato dall'utente).

Repo di destinazione: `ciao-madesign/personalhub`.
Branch di lavoro: `claude/personal-portfolio-site-a0613u`.
Hosting previsto: Vercel.

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

## Stato attuale

- [x] Direzione visiva approvata (lista nera + hero ibrida)
- [x] Preview statica HTML pubblicata come Artifact (iterazione 2: teal +
      Geist + contenuti progetti reali)
- [ ] Scaffolding progetto reale (Next.js + Tailwind, deploy-ready Vercel)
- [ ] Microinterazioni (rimandate, da definire in una sessione successiva)
- [ ] Foto reale dell'utente al posto del placeholder "MA" nell'hero
- [ ] URL live per DoqTool/Maccu/balzar, se/quando disponibili
- [ ] Analisi del portfolio Framer esistente (madesign.framer.ai) — non
      raggiungibile dal proxy di rete di questa sessione (curl → 403 a
      livello di tunnel). Riprovare da un ambiente senza quella restrizione,
      o chiedere all'utente di incollare i contenuti.

## Prossimi passi proposti

1. Validare con l'utente questa seconda iterazione (colore/font/contenuti).
2. Impostare il progetto Next.js (App Router) + Tailwind, componentizzando
   quanto già disegnato nella preview HTML/CSS.
3. Deploy iniziale su Vercel per avere un URL condivisibile presto, anche
   con contenuti parziali.
4. Tornare sulle microinterazioni una volta stabile la struttura.
