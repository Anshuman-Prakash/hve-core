---
title: RPI Plan Critic
description: "Assesses one lens of an RPI implementation plan, such as requirement coverage, evidence support, executability, or risk, and returns candidate findings with locations, suggested severity, and the smallest useful change for the critique parent to verify. Use during rpi-plan-critique when the assessment runs as parallel lenses."
sidebar_position: 2
author: Microsoft
ms.date: 2026-10-13
ms.topic: reference
keywords:
  - agent
  - hve-core
  - rpi-plan-critic
---

<!-- BEGIN AUTO-GENERATED: metadata -->
| Field       | Value                                                                    |
|-------------|--------------------------------------------------------------------------|
| Kind        | agent                                                                    |
| Source      | `.github/agents/hve-core/subagents/rpi-plan-critic.agent.md`             |
| Invocation  | Delegated subagent, dispatched by a parent agent (not selected directly) |
| Interactive | No                                                                       |
<!-- END AUTO-GENERATED: metadata -->

## What it does

<!-- BEGIN AUTO-GENERATED: overview -->
Assesses one lens of an RPI implementation plan, such as requirement coverage, evidence support, executability, or risk, and returns candidate findings with locations, suggested severity, and the smallest useful change for the critique parent to verify. Use during rpi-plan-critique when the assessment runs as parallel lenses.
<!-- END AUTO-GENERATED: overview -->

## When to use it

`RPI Plan Critic` is a helper that [rpi-plan-critique](../../../skills/rpi/rpi-plan-critique) dispatches, not something a user selects. The critique parent splits a multi-phase plan into lenses (coverage, evidence, executability, and risk, plus reconciliation for a follow-up critique) and runs one critic per lens in parallel.

Each dispatch sets the critic's reasoning effort. The critic declares a model and no effort in its frontmatter, so the critique parent chooses the effort from the lens's work, starting at `low` or `medium`, or uses the level you set with `effort=`. The parent records each lens's effort and its source in the critique's Lens Assessments table.

Every candidate is a suggestion. The critique parent verifies it at the cited plan location and evidence, merges duplicates across lenses, assigns `PC-xxx` IDs and final severity, and writes the critique. The critic writes no file, dispatches no other agent, and never speaks to the user.

## Example usage

A representative assignment from an `rpi-plan-critique` run:

```text
Lens: Executability. Can phases P02 to P04 of
.copilot-tracking/plans/2026-09-04/blob-storage-plan.md run as written, including
dependencies and order, tools and environments, checks that can fail, and budgets?
Read the plan and .copilot-tracking/research/2026-09-03/blob-storage-research.md.
Depth: standard. Severity scale: Critical, High, Medium, and Low, as rpi-plan-critique defines them.
```

The parent dispatches it at `medium` effort beside three other lenses. The critic returns one candidate: P03-T02 runs a migration check that depends on a storage emulator no phase installs, suggested High, with the smallest useful change of adding the emulator setup to P01-T01. The parent reads P03-T02 and P01-T01, confirms the gap, and records it as `PC-001 [High]`.
