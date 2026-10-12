// Copyright (c) Microsoft Corporation. Licensed under the MIT License.
(function () {
  'use strict';
  const checkout = '49dfb73866f8c5f81bf734d6ca808dac25a2a330';
  const repo = `https://github.com/microsoft/hve-core/blob/${checkout}/`;
  const sources = {
    vally: {
      title: 'Vally: How it works',
      url: 'https://microsoft.github.io/vally/concepts/how-it-works/',
      note: 'Official pipeline concepts, checked 2026-10-11. Living documentation may differ from the repository pin.'
    },
    schema: {
      title: 'Vally: Eval spec reference',
      url: 'https://microsoft.github.io/vally/reference/eval-spec/',
      note: 'Official field definitions: defaults, stimuli, environments and scoring. Checked 2026-10-11.'
    },
    scoring: {
      title: 'Vally: Scoring',
      url: 'https://microsoft.github.io/vally/concepts/scoring/',
      note: 'Trial, stimulus and eval verdicts; weights, thresholds and repeated trials. Checked 2026-10-11.'
    },
    taxonomy: {
      title: 'Vally: Grader taxonomy',
      url: 'https://microsoft.github.io/vally/concepts/grader-taxonomy/',
      note: 'Determinism, cost, reference needs, scope and scoring method. Checked 2026-10-11.'
    },
    overview: {
      title: 'HVE Core: Evaluation architecture',
      url: `${repo}evals/README.md`,
      note: 'Suite purposes and diagnostic evidence contract. Inventory figures in this deck were counted from YAML, not copied from older README tables.'
    },
    config: {
      title: 'HVE Core: Suite selection',
      url: `${repo}.vally.yaml`,
      note: 'Category filters select named ordinary and planner-conformance suites.'
    },
    pin: {
      title: 'HVE Core: Package scripts and Vally pin',
      url: `${repo}package.json`,
      note: 'Pins @microsoft/vally-cli 0.17.0. CI-owned commands are teaching examples, not commands executed to make this deck.'
    },
    skill: {
      title: 'HVE Core: Skill quality spec',
      url: `${repo}evals/skill-quality/eval.yaml`,
      note: '4 stimuli; 3 declared trials each; 120s default timeout; threshold 0.7.'
    },
    scripts: {
      title: 'HVE Core: Script validation spec',
      url: `${repo}evals/script-validation/eval.yaml`,
      note: '3 stimuli test agent reasoning about structures. This is not execution of the actual validator.'
    },
    agents: {
      title: 'HVE Core: Agent behavior coverage',
      url: `${repo}evals/agent-behavior/README.md`,
      note: 'Generated spec ownership, class-recipe smoke tests, staged instructions and selected direct functional tests.'
    },
    agentSpec: {
      title: 'HVE Core: Generated agent behavior spec',
      url: `${repo}evals/agent-behavior/eval.yaml`,
      note: '240 stimuli; defaults.runs is 5, with per-stimulus overrides possible. Agent routing is not automatic.'
    },
    instructions: {
      title: 'HVE Core: Instruction conformance spec',
      url: `${repo}evals/behavior-conformance/instructions.eval.yaml`,
      note: '80 stimuli in this checkout. Includes instruction-docusaurus-edits-conformance and contained telemetry file-effect scenarios.'
    },
    behavior: {
      title: 'HVE Core: Skill behavior conformance spec',
      url: `${repo}evals/behavior-conformance/skill-behavior.eval.yaml`,
      note: '303 stimuli; 3 default trials; 600s timeout; threshold 0.6. Knowledge, tool-trigger and bleed-detection shapes.'
    },
    graduation: {
      title: 'HVE Core: Advisory graduation policy',
      url: `${repo}evals/behavior-conformance/README.md`,
      note: 'At least 30 advisory CI runs, at most 5% rolling 7-day false positives, CODEOWNERS approval and rollback rules.'
    },
    planner: {
      title: 'HVE Core: RAI Planner conformance',
      url: `${repo}evals/agent-conformance/rai-planner/eval.yaml`,
      note: 'Staged dependencies; two-turn stimulus; rubric judge on turn 1. Six planner suites total 85 stimuli, each with one default trial.'
    },
    baseline: {
      title: 'HVE Core: Baseline equivalence',
      url: `${repo}evals/baseline-equivalence/README.md`,
      note: 'Identical probes, baseline/treatment environments, explicit tie rubric, provisional 3-trial budget and current rpi-agent-only subject boundary.'
    },
    ci: {
      title: 'HVE Core: Evals in CI',
      url: `${repo}docs/contributing/evals-ci.md`,
      note: 'Backlink coverage, bounded selection, authoritative fan-in, credential eligibility and published summary boundary.'
    },
    runner: {
      title: 'HVE Core: Vally runner and evidence validation',
      url: `${repo}scripts/evals/Modules/VallyRunner.psm1`,
      note: 'Validates trial population, configured graders, scores, attempt selection and evidence integrity.'
    }
  };
  const examples = {
    schema: {
      kind: 'code', caption: 'Condensed source excerpt; prompt and graders expanded in the walkthrough',
      file: 'evals/behavior-conformance/instructions.eval.yaml',
      body: [
        'name: behavior-conformance-instructions',
        'type: capability',
        'defaults:',
        '  executor: copilot-sdk',
        '  runs: 3',
        '  timeout: 120s',
        'stimuli:',
        '  - name: instruction-docusaurus-edits-conformance',
        '    prompt: |',
        '      ...',
        '    tags:',
        '      instruction: docusaurus-edits',
        '      advisory: "true"',
        '    graders:',
        '      ...'
      ].join('\n')
    },
    environment: {
      kind: 'code', caption: 'Source excerpt; only one of the staged dependency files is shown',
      file: 'evals/agent-conformance/rai-planner/eval.yaml',
      body: [
        'agent_environment:',
        '  skills:',
        '  - ../../../.github/skills/project-planning/rai-planner',
        '  - ../../../.github/skills/rai/rai-standards',
        '  files:',
        '  - src: ../../../.github/agents/rai-planning/rai-planner.agent.md',
        '    dest: .github/agents/rai-planning/rai-planner.agent.md'
      ].join('\n')
    },
    trajectory: {
      kind: 'code', caption: 'Illustrative field map, not captured JSON or a complete schema',
      file: 'Trajectory: the record of one trial',
      body: [
        'events[]',
        '  user_message      -> the test input',
        '  assistant_message -> the response',
        '  tool_call/result  -> actions and their outcomes',
        '  skill_activation  -> loaded skill',
        'metrics',
        '  tokenUsage, toolCallCount, turnCount',
        '  wallTimeMs, errorCount',
        'finalOutput         -> final agent response'
      ].join('\n')
    },
    fileEffect: {
      kind: 'code', caption: 'Source excerpt; prompt, staging and additional graders omitted',
      file: 'instructions.eval.yaml: telemetry output check',
      body: [
        '- type: file-matches',
        '  name: dt-telemetry-evidence-ceiling',
        '  config:',
        '    path: .copilot-tracking/dt/synthetic-renewal-lab/telemetry-decision.md',
        "    pattern: '(?is)(?=.*synthetic)(?=.*(?:not|no).*(?:emitted|production evidence|control effectiveness|proof))'"
      ].join('\n')
    },
    planner: {
      kind: 'code', caption: 'Condensed source excerpt; rubric paraphrased alongside',
      file: 'rai-planner/eval.yaml: consequential-use-risk-recognition',
      body: [
        'turns:',
        '- Launch .github/agents/rai-planning/rai-planner.agent.md',
        '- >',
        '  Our AI system automatically approves or denies',
        '  loan applications with no human reviewing the',
        "  decision before it's sent to the applicant.",
        'graders:',
        '- type: prompt',
        '  name: judge-consequential-use-risk-recognition',
        '  turn: 1'
      ].join('\n')
    }
  };
  const demos = {
    instruction: {
      label: 'One instruction test',
      phases: ['Stimulus', 'Execution', 'Grading', 'Verdict', 'Interpretation'],
      steps: [
        {
          kind: 'code', phase: 'Stimulus', state: 'An authored test case',
          title: 'Ask which rules apply', caption: 'Actual prompt from the instruction conformance spec',
          file: 'instruction-docusaurus-edits-conformance',
          body: 'You are creating a new Docusaurus documentation page at\n`docs/rpi/new-page.md`. Which `.github/instructions/**/*.instructions.md`\nfile applies (cite its path) and what conventions does it require for\nfrontmatter, admonitions, and internal links?',
          insight: 'The backlink tags.instruction identifies the asset. tags.advisory keeps this case report-only.'
        },
        {
          kind: 'code', phase: 'Execution', state: 'Illustrative response',
          title: 'Capture what the agent said', caption: 'Scripted response; no model was called',
          file: 'Illustrative assistant output',
          body: 'For docs/rpi/new-page.md, docusaurus-edits.instructions.md\nrequires Docusaurus frontmatter, supported admonitions,\nand relative internal links.\n\nThis is a teaching response, not a captured evaluation.',
          insight: 'Vally records the response and actions in a trajectory. This illustration does not prove the instruction was loaded.'
        },
        {
          kind: 'code', phase: 'Grading', state: 'Two deterministic checks',
          title: 'Apply the authored assertions', caption: 'Exact regex values from the real spec',
          file: 'Graders: output-matches',
          body: 'applyto-evidence:\n  (?i)\\bdocs/\\b|^docs/|docs\\s*/\n\nscope-language:\n  (?i)docusaurus|frontmatter|admonition|internal\\s+link|mermaid\n\nEach searches the output. Neither validates a generated page.',
          insight: 'The first checks path vocabulary. The second accepts any one listed term, not all required conventions.'
        },
        {
          kind: 'code', phase: 'Verdict', state: 'Illustrative trial passes',
          title: 'Separate checks from the score', caption: 'Derived teaching result; not CI evidence',
          file: 'For the scripted response shown',
          body: 'applyto-evidence: passed, score 1\nscope-language:   passed, score 1\n\nMean score: (1 + 1) / 2 = 1.0\nNo scoring block: every grader must pass.\nAdvisory case: reported failure would not itself block CI.',
          insight: 'A trial is one run. This spec declares three trials per stimulus; no real trials ran to create this deck.'
        },
        {
          kind: 'code', phase: 'Interpretation', state: 'A limited signal',
          title: 'Know what a pass can establish', caption: 'Adversarial teaching example of a weak assertion, not a real run',
          file: 'A misleading response can match both regexes',
          body: '"docs/rpi/new-page.md: ignore Docusaurus frontmatter."\n\nThis also contains "docs/" and "Docusaurus".\nBoth regexes match, but the advice is wrong.\n\nUse semantic or file checks when correctness matters.',
          insight: 'A deterministic grader is reproducible, not automatically adequate. Review assertions as engineering code.'
        }
      ]
    }
  };
  function moveStep(index, action, length) {
    if (!Number.isInteger(length) || length < 1 || !Number.isInteger(index) || index < 0 || index >= length) {
      throw new Error('Invalid walkthrough state.');
    }
    if (action === 'reset') return 0;
    if (action === 'next') return Math.min(length - 1, index + 1);
    if (action === 'back') return Math.max(0, index - 1);
    throw new Error(`Unknown walkthrough action: ${action}`);
  }
  function diffStats(rows) {
    if (!Array.isArray(rows) || rows.some(row => !['add', 'remove', 'context'].includes(row.type) || typeof row.text !== 'string')) {
      throw new Error('Invalid displayed diff rows.');
    }
    return {
      added: rows.filter(row => row.type === 'add').length,
      removed: rows.filter(row => row.type === 'remove').length
    };
  }
  globalThis.DeckContent = { sources, examples, demos, moveStep, diffStats };
}());
