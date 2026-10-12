---
title: The AI Assets Themselves Need Engineering
description: A light 101 companion to HVE-Core Evaluation, using one fictional example to teach practical engineering habits for AI assets.
author: Microsoft
ms.date: 2026-10-12
ms.topic: overview
---

## Audience and purpose

A 15-slide, approximately 15-to-18-minute introduction for people with no
background in AI evaluation tools, HVE-Core or coding. Present this before
[HVE-Core Evaluation](../hve-core-evaluation/README.md).

The 101 develops intuition rather than repeating the companion's technical
material. One fictional meeting-summary helper connects the whole story.
Short visible definitions, a four-step presenter-controlled walkthrough, a
recall question and a small first action reinforce the same memory aid:

**Define. Try. Check. Improve.**

The companion covers the next layer: Vally architecture, test configuration,
trajectories, graders, scoring, repeated trials and real HVE-Core test-suite
examples. No evaluation schema, regex lesson or pass-rate mathematics is needed
to follow the 101. Instructions, agents and skills are introduced by
responsibility; prompts are not an additional asset category in this talk.

## Story and evidence

The fictional notes say a pilot is planned for Friday and no owner was assigned.
A deliberately weak response invents Morgan as the owner. The contract makes the
missing-input behavior checkable: report the owner as unknown, rather than filling
the gap with a plausible person.

The walkthrough compares that response with the notes and then shows a clearer
rule and an expected answer. The expected answer is not a performed rerun.
All notes, outputs and judgments are teaching illustrations. The fictional
helper is not a deployed HVE-Core asset, and no stimuli were added to the live
evaluation suites. No model calls, customer-data access or external writes occur.

HVE-Core claims cite commit `9cddbf29bd91d01987de9471f56cf8a4d435ed76`.
Official VS Code customization and Vally documentation were read on 2026-10-12.
The supplied evaluation-content attachment was read as a reference only and was
not edited or copied into this deck. Public sources and limitations are available
through Sources and presenter Notes.

## Build and view

With Node.js 24 or later, from the repository root:

```powershell
npm ci --prefix slides\ai-assets-engineering-101
npm run bundle --prefix slides\ai-assets-engineering-101
npm test --prefix slides\ai-assets-engineering-101
```

Restore dependencies only when needed. Open the
[standalone HTML](../../docs/slides/ai-assets-engineering-101.html)
directly in a desktop browser. `npm run build --prefix slides\ai-assets-engineering-101`
also creates a local folder build at `dist/index.html`.

Share the generated HTML as one downloaded file to present the 101 independently.
It does not need a server, authentication, a live agent or internet to present.
For the closing-slide handoff, put
[the evaluation companion](../../docs/slides/hve-core-evaluation.html) beside it
as `hve-core-evaluation.html`. Both files then work offline. The folder build
copies that existing companion into `dist/` without changing it.
Deliberate public source-link clicks need network access.
All presenter notes are embedded and readable by recipients.
File-host previews may not run HTML; downloaded local-browser delivery is the
intended sharing path.

## Presenter controls

* Left/Right, Page Up/Page Down and the bottom-bar arrows change slides.
* Home/End reach the first/last slide.
* Back, Next step, Reset and `[`/`]` affect only the summary walkthrough.
* The walkthrough retains its step on revisits and resets on reload.
* Reveal the answer opens the local recall disclosure; it calls no service.
* Sources, Notes, Slides and Keys open local dialogs; Escape returns focus.
* Reading view reflows the content without shrinking the presentation canvas.
* Optional motion starts off, and reduced-motion preference takes priority.

Single-character shortcuts require focus on the presentation surface.
Focused buttons, links and the recall disclosure retain their normal activation
keys. The bottom chrome follows the shared HTML starter; the opening uses the
two-column hero treatment established by the evaluation companion.

## Source ownership

| File                              | Responsibility                                         |
|-----------------------------------|--------------------------------------------------------|
| `deck.json`                       | Catalog label, purpose and source qualification        |
| `index.html`                      | Story, slide order, notes and native recall disclosure |
| `content.js`                      | Sources, synthetic example and walkthrough states     |
| `components.js`, `components.css` | Safe lesson-block renderer and component typography   |
| `theme.css`                       | Slide layouts, reflow and shared presenter chrome      |
| `deck.js`                         | Starter navigation, dialogs, focus and step controls   |
| `build.mjs`, `bundle.mjs`          | Folder build, security checks and standalone output    |
| `deck.test.cjs`                   | Story, example, state, renderer and bundle invariants |

Edit these sources, not generated HTML. Include the regenerated standalone
bundle with source changes. Keep `dist/` and `node_modules/` ignored.
The template's pinned reveal.js and strict bundler resource/provenance checks
are retained. Building the 101 requires the existing committed evaluation
bundle; the new standalone file does not embed or import the companion.

To check this bundle without rewriting it:

```powershell
node --input-type=module -e "import { checkBundle } from './slides/ai-assets-engineering-101/bundle.mjs'; console.log(await checkBundle());"
```

## Validation boundary

Checked on 2026-10-12:

* `npm test --prefix slides\ai-assets-engineering-101`: all 26 tests passed.
* `npm run bundle --prefix slides\ai-assets-engineering-101`: passed the bundler's
  resource checks, reveal.js patches and provenance/notice requirements.
* The scoped `checkBundle()` command above passed source-to-bundle parity.
* Public-dependency-feed validation passed; the committed lockfile retains
  canonical public URLs.
* Browser checks covered all 15 slides, all four walkthrough states and the
  recall disclosure closed/open. Layouts at 1600x900, 1280x720, 390px and
  320px, plus increased text spacing, had no recorded geometry failures.
* WCAG-tagged axe scans found no violations in the tested slides, distinct
  walkthrough/recall states and dialogs. Actual keyboard inputs exercised
  paging, focus return, the recall disclosure and walkthrough state transitions.
  Reduced-motion behavior passed.
* A renamed standalone file opened offline with no sibling assets; its
  walkthrough and recall control worked. The final local handoff opened the
  evaluation companion and returned with browser Back. The folder build's
  companion copy was byte-identical to the existing evaluation HTML.

The repository-wide `npm run slides:check` validated this new bundle, then stopped
at the unrelated `slides/contributor-onboarding/` directory because its
`bundle.mjs` was missing. That directory and the existing evaluation deck were
not changed.

Actual 200% browser zoom, real screen-reader use, physical projection and
published-host behavior require separate evidence. Do not treat narrow viewport
checks as proof of browser zoom, or a clean automated scan as accessibility
certification. The public evaluation-slide URL returned 404 during this task,
so the closing link uses the verified local companion rather than claiming a
published handoff. Local-browser delivery is the verified path.
