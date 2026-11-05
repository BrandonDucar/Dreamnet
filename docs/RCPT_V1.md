# RCPT-v1 — public receipt envelope

Status: draft alignment 2026-09-22. `@dreamnet/public-core` remains `0.1.0`. **Not published to npm in this packet.**

This does not replace existing `createReceipt` types yet. It documents the join key the organism is converging on so Public Core, Drive ledgers, Fish, Railway, and Notion stop inventing parallel truths.

## Identifier

`RCPT-{YYYYMMDD}-{SURFACE}-{SEQ}`

Surfaces: GH, RWY, DRV, NTN, SLK, FSH, GML, CAL, LIN, NBL (NotebookLM), SPR (Spore).

Native provider IDs attach as `provider_refs`. They are not a second receipt.

## Fields

receipt_id, event_id, mission_id, goal_id, actor_id, office_id, capability_id, system_id, environment, action, input_hash, output_hash, evidence_refs[], provider_refs[], occurred_at, verified_at, fresh_until, verification_method, status, authority, parent_receipts[].

Status vocabulary: PASS | FAIL | UNVERIFIABLE | BLOCKED | STAGED.

## Rule

A function returning success is not a receipt. ProofStack is the intended canonical writer. Until that port is production-connected, this schema is the contract — not a claim that join is closed.
