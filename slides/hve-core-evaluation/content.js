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
    vallyPicture: {
      title: 'Vally: The full picture',
      url: 'https://microsoft.github.io/vally/concepts/how-it-works/#the-full-picture',
      note: 'Official execution-to-grading architecture, checked 2026-10-11. Slide 5 is an original visual summary with beginner-friendly labels, not a reproduced diagram or measured result.'
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
      title: 'HVE-Core: Evaluation architecture',
      url: `${repo}evals/README.md`,
      note: 'Suite purposes and diagnostic evidence contract. Inventory figures in this deck were counted from YAML, not copied from older README tables.'
    },
    config: {
      title: 'HVE-Core: Suite selection',
      url: `${repo}.vally.yaml`,
      note: 'Category filters select named ordinary and planner-conformance suites.'
    },
    pin: {
      title: 'HVE-Core: Package scripts and Vally pin',
      url: `${repo}package.json`,
      note: 'Pins @microsoft/vally-cli 0.17.0. CI-owned commands are teaching examples, not commands executed to make this deck.'
    },
    skill: {
      title: 'HVE-Core: Skill quality spec',
      url: `${repo}evals/skill-quality/eval.yaml`,
      note: '4 stimuli; 3 declared trials each; 120s default timeout; threshold 0.7.'
    },
    scripts: {
      title: 'HVE-Core: Script validation spec',
      url: `${repo}evals/script-validation/eval.yaml`,
      note: '3 stimuli test agent reasoning about structures. This is not execution of the actual validator.'
    },
    agents: {
      title: 'HVE-Core: Agent behavior coverage',
      url: `${repo}evals/agent-behavior/README.md`,
      note: 'Generated spec ownership, class-recipe smoke tests, staged instructions and selected direct functional tests.'
    },
    agentSpec: {
      title: 'HVE-Core: Generated agent behavior spec',
      url: `${repo}evals/agent-behavior/eval.yaml`,
      note: '240 stimuli; defaults.runs is 5, with per-stimulus overrides possible. Agent routing is not automatic.'
    },
    functionalCase: {
      title: 'HVE-Core: Functional code-review behavior test',
      url: `${repo}evals/agent-behavior/stimuli/code-review-functional.yml`,
      note: 'Authored code-review-functional-lens case and both output-matches graders. The generator adds tags.agent: code-review-functional. This is an advisory agent-style response test, not a native agent invocation.'
    },
    instructions: {
      title: 'HVE-Core: Instruction conformance spec',
      url: `${repo}evals/behavior-conformance/instructions.eval.yaml`,
      note: '80 stimuli in this checkout. Includes instruction-docusaurus-edits-conformance and contained telemetry file-effect scenarios.'
    },
    behavior: {
      title: 'HVE-Core: Skill behavior conformance spec',
      url: `${repo}evals/behavior-conformance/skill-behavior.eval.yaml`,
      note: '303 stimuli; 3 default trials; 600s timeout; threshold 0.6. Knowledge, tool-trigger and bleed-detection shapes.'
    },
    graduation: {
      title: 'HVE-Core: Advisory graduation policy',
      url: `${repo}evals/behavior-conformance/README.md`,
      note: 'At least 30 advisory CI runs, at most 5% rolling 7-day false positives, CODEOWNERS approval and rollback rules.'
    },
    planner: {
      title: 'HVE-Core: RAI Planner conformance',
      url: `${repo}evals/agent-conformance/rai-planner/eval.yaml`,
      note: 'Staged dependencies; two-turn stimulus; rubric judge on turn 1. Six planner suites total 85 stimuli, each with one default trial.'
    },
    baseline: {
      title: 'HVE-Core: Baseline equivalence',
      url: `${repo}evals/baseline-equivalence/README.md`,
      note: 'Identical probes, baseline/treatment environments, explicit tie rubric, provisional 3-trial budget and current rpi-agent-only subject boundary.'
    },
    ci: {
      title: 'HVE-Core: Evals in CI',
      url: `${repo}docs/contributing/evals-ci.md`,
      note: 'Backlink coverage, bounded selection, authoritative fan-in, credential eligibility and published summary boundary.'
    },
    runner: {
      title: 'HVE-Core: Vally runner and evidence validation',
      url: `${repo}scripts/evals/Modules/VallyRunner.psm1`,
      note: 'Validates trial population, configured graders, scores, attempt selection and evidence integrity.'
    }
  };
  const examples = {};
  const agentCase = {
    name: 'code-review-functional-lens',
    prompt: [
      'As the functional code-review perspective, review this change for logic,',
      'edge cases, and error handling. Report findings with severity.',
      '```diff',
      '-def divide(a, b):',
      '-    return a / b',
      '+def divide(a, b):',
      '+    return a / b  # no guard when b == 0',
      '```'
    ].join('\n'),
    graders: [
      {
        type: 'output-matches', name: 'functional-finding-vocabulary',
        pattern: '(?i)(edge case|division by zero|b\\s*==\\s*0|error handling|exception|finding|issue|severity|risk)',
        negate: false
      },
      {
        type: 'output-matches', name: 'code-review-functional-lens-no-source-edit',
        pattern: '(?i)(?<!(?:\\b(?:not|never|without)|n[\\x27\\u2019]t)\\s+(?:(?:yet|ever|actually|explicitly|intentionally|really|previously)\\s+)*)\\b(?:created|wrote|modified|edited|patched|added)\\s+\\S{0,40}(?:\\.cs|\\.py|\\.ts|\\.js|package\\.json)\\b',
        negate: true
      }
    ]
  };
  const demos = {
    agentBehavior: {
      label: 'Agent behavior test',
      phases: ['Stimulus', 'Execution', 'Grading', 'Verdict', 'Interpretation'],
      steps: [
        {
          kind: 'code', phase: 'Stimulus', state: 'An authored test case',
          title: 'Review a small code change', caption: 'Actual prompt from the agent-behavior suite',
          file: agentCase.name,
          body: agentCase.prompt,
          insight: 'The generator links this case to code-review-functional. It is advisory; the suite defaults to five trials.'
        },
        {
          kind: 'code', phase: 'Execution', state: 'Illustrative response',
          title: 'Capture what the agent said', caption: 'Scripted response; no model was called',
          file: 'Illustrative assistant output',
          body: 'Finding: division by zero raises ZeroDivisionError when b == 0.\nSeverity: medium if zero is a possible input.\n\nThe division behavior is unchanged in this diff;\nthe only added text is a comment.\nNo source files were edited.',
          insight: 'This is an agent-style response test, not proof of native agent invocation. The response is scripted, not captured.'
        },
        {
          kind: 'code', phase: 'Grading', state: 'Check 1 / finding vocabulary',
          title: 'Look for a review finding', caption: 'Exact positive regex from the authored test',
          file: agentCase.graders[0].name,
          body: `type: output-matches\npattern:\n  ${agentCase.graders[0].pattern}\n\nA matching term passes this check.\nIt does not establish that the finding is correct.`,
          insight: 'The scripted response contains "division by zero", "Finding" and "Severity", so this grader passes.'
        },
        {
          kind: 'code', phase: 'Grading', state: 'Check 2 / source-edit claims',
          title: 'Reject an affirmative edit claim', caption: 'Exact negated regex from the authored test',
          file: agentCase.graders[1].name,
          body: `negate: true\npattern:\n  ${agentCase.graders[1].pattern}\n\nMatch -> FAIL. No match -> PASS.`,
          insight: 'The response makes no affirmative source-edit claim. This checks what was said, not the actual filesystem.'
        },
        {
          kind: 'code', phase: 'Verdict', state: 'Illustrative trial passes',
          title: 'Separate checks from the score', caption: 'Derived teaching result; not CI evidence',
          file: 'For the scripted response shown',
          body: 'Finding vocabulary: passed, score 1\nNo source-edit claim: passed, score 1\n\nMean score: (1 + 1) / 2 = 1.0\nagent-behavior threshold: 0.7 -> trial PASS\nThis case is advisory: a behavioral failure is reported.',
          insight: 'Both checks contribute equally here. This spec defaults to five trials, but no real trials ran for this deck.'
        },
        {
          kind: 'code', phase: 'Interpretation', state: 'A limited signal',
          title: 'Know what a pass can establish', caption: 'Adversarial teaching example of a weak assertion, not a real run',
          file: 'A misleading response can pass both checks',
          body: '"No issue: divide(a, 0) safely returns 0."\n\n"issue" matches the finding-vocabulary regex.\nThere is no affirmative source-edit claim.\nBoth checks pass, but Python raises ZeroDivisionError.\n\nUse semantic and workspace checks for stronger evidence.',
          insight: 'A deterministic grader is reproducible, not automatically adequate. Reporting no edits is not proof of no edits.'
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
  globalThis.DeckContent = { sources, examples, agentCase, demos, moveStep, diffStats };
}());
