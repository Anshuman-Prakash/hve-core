---
description: "Reference protocol for splitting an RPI plan critique into parallel lens assessments, selecting each lens's reasoning effort, and merging the returns into one finding set."
---

# Lens Assessment Reference

## When to split

Split the assessment into lens assessments when a dispatch tool is available and the plan has more than one phase. Assess a single-phase plan, or any plan when no dispatch tool is available, yourself, one lens at a time, using the same lens questions.

## Lenses

| Lens           | Question                                                                                                                                     | Reads                                       | Default effort | Raise one level when                                                          |
|----------------|----------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------|----------------|-------------------------------------------------------------------------------|
| Coverage       | Do the tasks cover every requirement, goal, and acceptance condition, with task `Requirements:` a reader can check?                          | Plan; requirement sources                   | `low`          | Requirements are implicit, numerous, or spread across several documents       |
| Evidence       | Are the plan's claims, decisions, and `Details:` supported by the supplied research and evidence?                                            | Plan; research and evidence                 | `medium`       | The evidence is large, or a claim depends on subtle runtime or host behavior  |
| Executability  | Can each phase run as written, including dependencies and order, tools and environments, checks that can fail, and budgets?                  | Plan; evidence about tools and environments | `medium`       | The plan spans several systems, hosts, or environments                        |
| Risk           | Are material risks, side effects, and irreversible, shared-system, or externally visible actions handled, and are user decisions identified? | Plan; risk-relevant evidence                | `medium`       | The plan includes destructive, security-sensitive, or externally visible work |
| Reconciliation | Is each earlier finding resolved, still open, or superseded, and did the corrections introduce regressions?                                  | Plan; earlier critique                      | `low`          | The corrections changed requirements, scope, or architecture                  |

Run Coverage, Evidence, Executability, and Risk for an initial critique. For a follow-up critique, run Reconciliation and only the lenses whose subject the corrections changed, scoped to the changed text. When one lens would cover a long plan, split it by phase range so each assignment stays bounded.

## Reasoning effort

Select each lens's reasoning effort when you dispatch it. Agent frontmatter does not set it: `RPI Plan Critic` declares a model and no effort so that the effort follows the lens's work.

* When the user or caller sets an effort, use it, either one level for every lens or the named level for each named lens.
* Otherwise start from the lens's default effort, raise it one level when its condition applies, and raise it one more level for `deep` depth, up to `high`. Use `xhigh` or `max` only when the user or caller asks for them.
* Pass the level through the dispatch tool's reasoning-effort parameter, such as `reasoning_effort`. When the tool has no such parameter, dispatch without one and record the effort as host default.
* If a dispatch fails because its model does not support the selected effort, retry it once with `reasoning_effort` set to `medium`.
* Record each lens's effort and its source (selected, caller-set, or host default) in Lens Assessments.

## Dispatch

Dispatch every lens to `RPI Plan Critic` before reading any return, in parallel when the dispatch tool allows. `RPI Plan Critic` runs on the model its frontmatter declares; pass a different model only when the user names one. When `RPI Plan Critic` is unavailable, give a general-purpose subagent the same assignment and return format at the same effort.

Give each assignment:

* The lens and its question, in your words
* The plan path and the phases, tasks, or sections in scope
* The evidence paths the lens reads, and for Reconciliation the earlier critique path
* Confirmed user direction and decisions
* The depth and the severity scale below

Leave out any list of suspected weaknesses. The lens question and the severity scale are the whole brief, so each critic assesses the plan instead of confirming the parent's suspicions.

## Severity scale

Rate each finding by its consequence for how this plan will actually run, such as a supervised test or a production change.

* Critical: the plan cannot be implemented as written, or implementing it would cause harm or irreversible damage.
* High: implementation would likely fail, miss an acceptance criterion, or cause an unintended side effect.
* Medium: likely rework, or an unsupported claim or gap that would change a decision.
* Low: a demonstrated minor error, such as a wrong count or citation. In `standard` depth, record a Low finding only for a demonstrated error, not for a possible improvement.

## Merge the returns

1. Read every return, including concerns listed under Outside the lens. Verify each candidate at its cited plan location and evidence, reading deeper when needed.
2. Merge duplicates across lenses into one finding keyed to the earliest affected ID.
3. Record a `PC-xxx` finding only for a verified candidate, with its final severity from the scale. Reject a candidate that the cited evidence contradicts or that confirmed user direction resolves, and note the reason in Lens Assessments.
4. When a lens returns `Partial`, `Blocked`, or nothing, cover the gap yourself when it is small; otherwise record the unassessed boundary and set critique execution to Partial.
5. Do not dispatch a second round of lenses for the same critique.
