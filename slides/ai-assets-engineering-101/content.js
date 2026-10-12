// Copyright (c) Microsoft Corporation. Licensed under the MIT License.
(function () {
  'use strict';
  const repo = 'https://github.com/microsoft/hve-core/blob/9cddbf29bd91d01987de9471f56cf8a4d435ed76/';
  const sources = {
    customization: {
      title: 'VS Code: Understand agent customization',
      url: 'https://code.visualstudio.com/docs/agents/concepts/customization',
      note: 'Official context, role and capability distinctions, checked 2026-10-12. Summarized in original language; this talk focuses on instructions, agents and skills.'
    },
    builder: {
      title: 'HVE-Core: HVE Builder',
      url: `${repo}.github/skills/hve-core/hve-builder/SKILL.md`,
      note: 'Source-backed authoring, review and validation workflow. A recommended habit in this talk is not a claim that an asset has passed this workflow.'
    },
    authority: {
      title: 'HVE-Core: Guidance versus enforcement',
      url: `${repo}.github/skills/hve-core/hve-builder/references/artifact-types.md`,
      note: 'Instruction prose guides model behavior; deterministic controls enforce requirements. Rules alone are not a guarantee.'
    },
    presence: {
      title: 'HVE-Core: Tests linked to AI assets',
      url: `${repo}docs/contributing/evals-ci.md`,
      note: 'Changed AI assets require matching evaluation backlinks; this is repository behavior, not a policy universal to every AI system.'
    },
    coverage: {
      title: 'HVE-Core: Agent behavior coverage',
      url: `${repo}evals/agent-behavior/README.md`,
      note: 'Distinguishes output-shape smoke checks from direct functional evidence. Case counts and regex syntax are intentionally outside the 101 story.'
    },
    vally: {
      title: 'Vally: How it works',
      url: 'https://microsoft.github.io/vally/concepts/how-it-works/',
      note: 'Evaluation framework overview, checked 2026-10-12. Vally is introduced only as a way to run and check cases; its pipeline is taught in the companion.'
    },
    companion: {
      title: 'HVE-Core Evaluation: the companion deck',
      url: `${repo}slides/hve-core-evaluation/README.md`,
      note: 'Companion source and viewing instructions. Its public slide URL was not available on 2026-10-12; open the delivered local hve-core-evaluation.html for Vally architecture and test-suite mechanics.'
    }
  };
  const example = {
    notes: 'Pilot planned for Friday.\nNo owner was assigned.',
    weak: 'Decision: pilot on Friday.\nOwner: Morgan.',
    expected: 'Decision: pilot on Friday.\nOwner: unknown.',
    contract: [
      'Summarize decisions from the supplied notes.',
      'Use only owners explicitly named in the notes.',
      'If no owner is named, write "unknown".'
    ]
  };
  const examples = {};
  const demos = {
    summary: {
      label: 'Meeting-summary helper',
      phases: ['Define', 'Try', 'Check', 'Improve'],
      steps: [
        {
          kind: 'lesson', phase: 'Define', state: 'Name the expected behavior',
          title: 'Begin with a testable rule',
          caption: 'Fictional teaching example / no live agent',
          blocks: [
            { label: 'The rule', text: example.contract.join('\n') },
            { label: 'What success looks like', text: 'A missing owner stays "unknown". The helper does not invent a person.' }
          ],
          insight: 'A contract is the behavior you expect. It makes the requirement clear enough to check.'
        },
        {
          kind: 'lesson', phase: 'Try', state: 'Try a missing-owner case',
          title: 'Give it the same notes each time',
          caption: 'Notes and response are scripted / not recorded output',
          blocks: [
            { label: 'Supplied meeting notes', text: example.notes },
            { label: 'A weak response', text: example.weak }
          ],
          insight: 'The response looks complete. Pause: where did the owner come from?'
        },
        {
          kind: 'lesson', phase: 'Check', state: 'Compare the answer with the input',
          title: 'Check the fact, not the polish',
          caption: 'Derived teaching judgment / not a model-backed test',
          blocks: [
            { label: 'Evidence', text: 'The notes name no owner.\nThe response names Morgan.\nThat name is unsupported.' },
            { label: 'Decision', text: 'FAIL for this requirement.\nA fluent answer can still break the contract.' }
          ],
          insight: 'Keeping the notes and answer together makes the mismatch reviewable.'
        },
        {
          kind: 'lesson', phase: 'Improve', state: 'Clarify and check again',
          title: 'Make the missing-input rule explicit',
          caption: 'Revised wording and expected answer / not an observed rerun',
          blocks: [
            { label: 'Add a concrete example to the guidance', text: 'No owner assigned -> Owner: unknown.\nNever fill the gap with a likely name.' },
            { label: 'Expected answer after a successful rerun', text: example.expected }
          ],
          insight: 'Keep this case and rerun it after changes. This expected answer is a target, not proof the revision worked.'
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
  globalThis.DeckContent = { sources, examples, example, demos, moveStep, diffStats };
}());
