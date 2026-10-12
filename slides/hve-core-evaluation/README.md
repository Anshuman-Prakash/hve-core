---
title: HVE-Core Evaluation
description: A beginner-friendly HTML presentation about engineering AI assets with Vally and HVE-Core evaluation suites.
author: Microsoft
ms.date: 2026-10-11
ms.topic: overview
---

## Audience and story

A 21-slide, approximately 25-minute introduction for an audience with no prior
knowledge of HVE-Core, Copilot, YAML or Vally.

The deck starts with the architecture and AI asset definitions, explains the
Vally pipeline and data contracts, then maps them to the maintained HVE-Core
evaluation suites. The suite map groups tests around structure, useful guidance,
contract conformance and baseline preservation, with inventory counts in presenter
notes rather than a dense table. It includes original architecture diagrams, actual spec
excerpts, a six-step agent-behavior walkthrough, file-effect checks,
multi-turn planner judging, baseline comparisons and CI evidence integrity.
Scoring and repeatability share one slide: a single-trial verdict on the left,
consistency across repeated trials on the right. Detailed scoring fields,
estimators and suite trial budgets remain in presenter notes.

The AI asset categories covered are instructions, agents and skills.
The word "prompt" refers only to evaluation inputs or Vally's model-judge type,
not a separate AI asset category.

Sources were checked on 2026-10-11 against HVE-Core `main` commit
`49dfb73866f8c5f81bf734d6ca808dac25a2a330` and the repository's Vally CLI
`0.17.0` pin. Public Vally documentation is a living reference.
Suite counts were measured from the checkout's YAML, not older README tables.
The deck does not claim current test pass rates or comprehensive correctness.
No model-backed evals ran to produce it.

## Template alignment

The shared layout, presenter bar, walkthrough frame, navigation and bundler follow
the local HTML starter. Code panels use its 27px monospace type and 1.5 line height;
the schema excerpt uses compact YAML mappings instead of a smaller-font override.
Evaluation-specific layouts, HVE-Core naming and the question-led suite map are
preserved.

The opening follows the [RAI Planner presentation's hero style](https://microsoft.github.io/hve-core/slides/rai-planner.html#/opening):
a two-column composition, a large blue-accent title, a source-date pill and a
numbered agenda. Its content and source date remain specific to this evaluation
talk. Other slides retain the local starter's shared styling.

## Build and view

From the repository root, with Node.js 24 or later:

```powershell
npm ci --prefix slides\hve-core-evaluation
npm run bundle --prefix slides\hve-core-evaluation
npm test --prefix slides\hve-core-evaluation
```

Restore dependencies only when needed. Open the shareable
[standalone HTML](../../docs/slides/hve-core-evaluation.html) in a desktop browser.
The folder build is `dist/index.html`. Neither delivery needs a server,
authentication or a live agent. Only deliberate source-link clicks need internet.

The single-file bundle can be downloaded and opened locally. File-hosting previews
may not execute HTML; do not assume OneDrive or SharePoint preview is a presentation
runtime. All presenter notes are embedded and readable by recipients.

Edit source, then regenerate the bundle. Keep `dist/` and `node_modules/` ignored;
include the generated standalone HTML with source changes.

## Presentation controls

Use the bottom bar for slide navigation, the slide index, sources, presenter
notes, keyboard help, reading view, optional motion and full screen.

* Left/Right and Page Up/Page Down change slides.
* Home/End move to the first/last slide.
* Back, Next step and Reset affect only the agent-behavior walkthrough.
* `[` and `]` change the walkthrough step; `R` resets it.
* Escape dismisses a dialog and returns focus.
* Reading view removes canvas scaling and reflows text and diagrams.

Character shortcuts require focus on the presentation surface. Focused controls
retain Space and Enter. Motion is off initially; reduced-motion preference wins.
The walkthrough retains its step on slide revisits and resets on reload.

## Source ownership and validation

| File                              | Responsibility                                          |
|-----------------------------------|---------------------------------------------------------|
| `deck.json`                       | Catalog title, description and source qualification     |
| `index.html`                      | Slide story, diagrams, citation keys and speaker notes |
| `content.js`                      | Public source registry, excerpts and walkthrough data  |
| `components.js`, `components.css` | Labelled code surfaces and shared renderer              |
| `theme.css`                       | Layout, readable reflow and presenter chrome            |
| `deck.js`                         | Navigation, dialogs, focus and finite walkthrough state |
| `build.mjs`, `bundle.mjs`          | Folder build, single-file security checks and notices   |
| `deck.test.cjs`                   | Story, state, source and packaging invariants           |

Run the scoped tests and bundle after source changes. To check this bundle without
rewriting it:

```powershell
node --input-type=module -e "import { checkBundle } from './slides/hve-core-evaluation/bundle.mjs'; console.log(await checkBundle());"
```

The repository-wide `npm run slides:check` also checks every other deck and
requires their dependencies. It is not a substitute for browser inspection.

The walkthrough uses the real `code-review-functional-lens` prompt and both
graders from [the authored agent-behavior partial](../../evals/agent-behavior/stimuli/code-review-functional.yml).
Its six steps show the prompt, a scripted response, each regex separately, the
threshold verdict and a semantic false positive. The negated source-edit check
detects affirmative edit claims in the response, not actual filesystem changes.
The case is advisory and inherits five trials and a 0.7 scoring threshold.
Responses and derived outcomes are teaching illustrations, not captured CI trajectories.
Source excerpts explicitly identify omissions and are not complete runnable specs.

Browser validation should cover all slides and walkthrough states, desktop and
reading view, keyboard navigation, dialogs, reduced motion, narrow-screen reflow,
200% zoom, increased text spacing and isolated single-file operation. A real
screen-reader pass, physical projection and published-host behavior remain separate
checks; automated results are not an accessibility certification.

## Delivery checks

Checked on 2026-10-11:

* `npm test --prefix slides\hve-core-evaluation`: all 28 tests passed.
* `npm run bundle --prefix slides\hve-core-evaluation`: passed, including bundler
  resource/security checks and library notices.
* The scoped `checkBundle()` command above passed source-to-bundle parity.
* `npm run lint:public-dependency-feeds`: passed.
* All 21 slides and six walkthrough states were checked in system Chrome at
  1600x900 and 1280x720. No measured content clipping or walkthrough scrolling
  remained; main text met 18px and code met 16px rendered-size targets.
* Reading layouts were checked at 320px and 390px, plus increased text spacing.
  The tested slide, walkthrough and dialog states had no reported WCAG-tagged
  axe violations. Keyboard paging, dialogs and focus return, walkthrough
  navigation/state retention/reload, and reduced motion were exercised.
* A renamed standalone file opened offline without sibling assets. Its
  architecture-slide screenshot matched the folder build byte for byte.

The repository-wide `npm run slides:check` stopped at the unrelated
`slides/contributor-onboarding/` directory because its `bundle.mjs` was missing.
That deck was not changed. This presentation's scoped parity check passed.

Actual 200% browser zoom remains unverified: an isolated Chrome-profile zoom
preference did not produce the requested zoom. Narrow reflow and text spacing
are separate evidence, not substitutes for that check. Real screen-reader use,
physical projection, the published site gallery and file-host preview were not
tested. Downloaded local-browser delivery is the verified sharing path.
