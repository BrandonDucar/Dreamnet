# DreamNet Whitepaper

## Public Architecture v0.2

DreamNet is an evidence-first operating layer for persistent AI work.

It is designed for agents and human-agent teams that must survive process
failure, move between runtimes, coordinate specialists, and prove what happened
without making one model, vendor, database, or machine the permanent source of
truth.

This document describes the public architecture. DreamNet's private routing,
policy models, internal prompts, credentials, customer data, and regulated
implementations are intentionally outside this boundary.

## 1. The Problem

Many agent systems optimize for generating an answer. Production work has a
larger set of requirements:

- the objective must remain stable across context loss,
- tools and permissions must be bounded,
- work must be restart-safe,
- retries must not duplicate consequential effects,
- important claims must remain linked to evidence,
- disagreement must trigger deeper verification,
- unsafe artifacts must not continue through the pipeline,
- finished knowledge must be portable across runtimes,
- outside reviewers must be able to inspect what occurred.

DreamNet treats these requirements as operating contracts rather than model
behavior.

## 2. Design Laws

### Evidence before authority

An agent earns additional responsibility through demonstrated, receipted work.
Persona, model reputation, or a self-reported confidence score is not proof.

### Context is disposable; durable knowledge is not

Workers may stop, restart, move machines, or change models. Assignments, state
transitions, claims, receipts, and approved artifacts must survive.

### Runtime and evidence are separate

Temporal, containers, local processes, edge workers, or another engine may run
the work. The public evidence contracts remain portable.

### Claims and receipts are different objects

A receipt records what happened. A claim records what is believed to be true.
Claims cite evidence and may be supported, challenged, superseded, or rejected.

### Verification effort follows risk

Low-risk work may need one verifier. Disagreement, financial impact, security
risk, production access, or weak evidence expands the quorum and may require a
human.

### Unsafe states change the workflow

A yellow or red security receipt is not a warning attached to otherwise normal
execution. It routes the assignment into remediation or incident handling.

## 3. Public Operating Model

```text
Goal
  -> Assignment Envelope
  -> Capsule
  -> DreamLoop
  -> Specialist Work
  -> Verification and Adaptive Quorum
  -> Claim Factory
  -> Receipt
  -> Security Receipt Router
  -> GitGrid and Proof Drop
  -> Rebuildable Memory Projections
```

### Assignment Envelope

The Assignment Envelope gives one identity to the objective, acceptance
criteria, principal, policy version, required approvals, and risk tier.

### Capsule

A Capsule is a portable capability boundary. It declares instructions,
accepted inputs, tools, permissions, evidence requirements, and output
contracts. A Capsule may be executed by different models or runtimes.

### DreamLoop

A DreamLoop is the restart-safe lifecycle around work. It tracks explicit state,
leases ownership, checkpoints progress, handles retries, and preserves lessons
for a successor.

### Adaptive Quorum

Quorum seats represent verification roles rather than identical model votes.
Security, architecture, evidence, economics, performance, and human-impact
reviewers may receive different objectives. Disagreement expands the review.

### Claim Factory

The Claim Factory extracts atomic, durable statements from completed work. Each
claim records its evidence, confidence basis, dependencies, contradictions, and
status. It does not erase disputed claims; it preserves their lineage.

### Receipt

A Receipt Envelope records the assignment, runtime identity, policy version,
tool use, state transitions, evidence, result, and canonical digest.

### Proof Drop

A Proof Drop packages sanitized evidence for external review without exposing
private prompts, credentials, internal memory, or unrelated system state.

## 4. Security Receipt Routing

DreamNet uses fail-closed receipt routing:

| Verdict | Execution | Durable branch |
| --- | --- | --- |
| Green | Allowed for the scanned digest | Admit |
| Yellow | Blocked | Quarantine and remediate |
| Red | Blocked | Isolate and open an incident |
| Missing or unknown | Blocked | Treat as unverifiable |

Green applies only to the exact scanned commit or artifact digest.

Yellow creates linked remediation work, expands the relevant specialist quorum,
and requires a new scan of the replacement artifact.

Red aborts execution, isolates derived output, revokes temporary access,
preserves evidence, produces an incident Proof Drop, and requires human approval
before a newly scanned artifact may re-enter.

Receipt routing is idempotent. Replaying the same receipt does not create
duplicate issues, alerts, revocations, or external effects.

## 5. GitGrid: Durable Knowledge Without Database Lock-In

GitGrid uses bounded Git repositories as versioned ledgers for:

- source observations,
- research and claims,
- agent competency receipts,
- product decisions,
- campaign and scraping events,
- sanitized Proof Drops,
- signed snapshots and releases.

Each repository carries a machine-readable manifest, schemas, immutable event
files, deterministic indexes, privacy policy, and lineage.

Git is not used as a queue, timer service, high-churn counter store, or secret
manager. Runtime databases, graphs, vector indexes, and search engines remain
valuable, but they can be treated as fast projections rebuilt from approved
artifacts when the product permits.

This makes organizational memory cloneable, reviewable, branchable, and usable
by local or cloud agents without forcing every participant onto one database.

## 6. Durable Execution

DreamNet separates active execution from durable knowledge:

```text
GitHub and GitGrid
  source, policy, evidence, releases

Temporal
  workflow history, retries, timers, task delivery

NUC, cloud, and edge workers
  bounded execution

PGLite, Neon, Graphiti, search, and caches
  fast local or shared projections
```

The same assignment and Capsule can move between local, cloud, and edge workers.
Task queues isolate workload families. Activities use idempotency keys because
retries are expected behavior.

## 7. Cerberus Supply-Chain Boundary

Cerberus is DreamNet's repository admission gate. Before an unfamiliar artifact
is installed or executed, Cerberus inspects the exact source commit for:

- package lifecycle scripts,
- Git hooks and automatic execution,
- remote-code loading,
- dangerous process and shell APIs,
- suspicious network destinations,
- credential material,
- mutable container and CI dependencies,
- integrity and provenance gaps.

Cerberus emits a content-bound security receipt. Only green proceeds by default.
The scanner itself does not make a yellow or red artifact safe; it changes what
the surrounding workflow is permitted to do.

## 8. Memory and Learning

DreamNet does not treat every stored item as permanent truth.

Events record observations. Receipts record actions. Claims record beliefs.
Snapshots record approved views. Projections optimize retrieval.

The system can preserve:

- support and counterevidence,
- confidence history,
- superseding claims,
- source lineage,
- competency history,
- provenance of derived artifacts.

Agent University and ToolGym can use those records to grant bounded
capabilities based on reproducible performance rather than self-description.

## 9. Human Authority

DreamNet is not designed to remove humans from consequential decisions.

Policies may require human approval for production deployment, financial
execution, credential changes, external publication, regulated data, security
exceptions, or any red incident re-entry.

The public contracts make those approval points explicit and auditable.

## 10. Public and Private Products

Public repositories provide portable contracts, validators, reference workers,
and reusable safety tools.

The private engine may add provider routing, customer-specific policy,
proprietary agents, internal memory, cost optimization, and operational
infrastructure. Public extraction uses an allowlist and security review rather
than copying the private monorepo and trying to remove known secrets afterward.

## 11. What DreamNet Does Not Claim

The public core is not, by itself:

- a wallet or transaction signer,
- a security certification,
- a production authorization service,
- a military command-and-control system,
- proof that a model's output is correct,
- a replacement for qualified human review,
- a reason to place secrets or sensitive personal data in Git.

It is a set of contracts and operating patterns for making agent work more
bounded, durable, inspectable, and portable.

## 12. Public Roadmap

1. Stabilize Assignment, Capsule, Receipt, and Claim schemas.
2. Publish the Receipt Router contract and conformance vectors.
3. Connect Cerberus receipts to durable remediation and incident workflows.
4. Add GitGrid adapters for approved claims, receipts, and Proof Drops.
5. Publish ToolGym competency fixtures and independently replayable receipts.
6. Add reference Temporal workers for bounded research and verification.
7. Expand interoperability examples across local, cloud, and edge runtimes.

## 13. Current Public Repositories

- [DreamNet Public Core](https://github.com/BrandonDucar/Dreamnet)
- [DreamLoops](https://github.com/BrandonDucar/dreamloops)
- [DreamNet GitGrid](https://github.com/BrandonDucar/dreamnet-git-grid)
- [DreamNet Cerberus](https://github.com/BrandonDucar/dreamnet-cerberus)
- [DreamNet Temporal](https://github.com/BrandonDucar/dreamnet-temporal)
- [ToolGym](https://github.com/BrandonDucar/toolgym)
- [Memory Weaver](https://github.com/BrandonDucar/memory-weaver)
- [Proof Drop](https://github.com/BrandonDucar/proof-drop-zabal)

DreamNet Public Core is Apache-2.0 licensed. Trademark rights, private services,
customer data, and proprietary repositories are not granted by that license.
