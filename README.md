# DreamNet Public Core

**Portable contracts for AI agents that remember, recover, and prove their work.**

DreamNet Public Core is the open seam of the DreamNet ecosystem. It gives local,
cloud, and edge agents a shared language for assignments, Capsules, lifecycle
state, claims, and evidence-backed receipts.

It does not contain DreamNet's private orchestration, internal prompts,
credentials, customer data, provider routing, or proprietary policy models.

## Why It Exists

Most agent demos lose state when the process dies and leave no durable proof of
what happened. Public Core starts with the operating contracts:

```text
Goal
  -> Assignment
  -> Capsule
  -> Work
  -> Verification
  -> Receipt
  -> Claim
```

The runtime can change. The evidence contract remains inspectable.

## Install

Until the first registry release, install from GitHub:

```bash
npm install github:BrandonDucar/Dreamnet
```

## Quick Start

```ts
import {
  createAssignment,
  createReceipt,
  validateAssignment,
  validateReceipt,
  type CapsuleManifest,
} from "@dreamnet/public-core";

const capsule: CapsuleManifest = {
  schemaVersion: "dreamnet.capsule.v1",
  capsuleId: "capsule:read-only-research",
  name: "Read-only Research",
  version: "1.0.0",
  description: "Produces a cited summary from approved sources.",
  capabilities: ["research", "summarize"],
  tools: ["approved-source-reader"],
  requiredPolicies: ["policy:read-only"],
  acceptedRiskTiers: ["low", "medium"],
  receiptRequired: true,
};

const assignment = createAssignment({
  principalId: "user:example",
  goal: "Summarize the approved source bundle",
  acceptanceCriteria: ["Every material statement cites evidence"],
  capsule,
  policyVersion: "policy:read-only@1",
});

if (!validateAssignment(assignment).valid) {
  throw new Error("Invalid assignment");
}

const receipt = createReceipt({
  assignment,
  traceId: "trace:example",
  workloadId: "workload:local",
  startedAt: new Date().toISOString(),
  status: "succeeded",
  summary: "The approved source bundle was summarized.",
  toolCalls: 1,
  evidence: [
    {
      id: "source:bundle",
      kind: "source",
      uri: "file:///approved/source.md",
    },
  ],
});

if (!validateReceipt(receipt).valid) {
  throw new Error("Invalid receipt");
}
```

## Public Surface

- Typed Assignment Envelope v1
- Typed Capsule Manifest v1
- Explicit DreamLoop lifecycle states
- Typed Receipt Envelope v1
- Typed Claim Object v1
- Deterministic canonical JSON and SHA-256 helpers
- Zero-runtime-dependency validators
- JSON Schemas

See [Public and Private Boundaries](docs/BOUNDARIES.md) and
[Architecture](docs/ARCHITECTURE.md). The complete public model is in the
[DreamNet Whitepaper](docs/WHITEPAPER.md).

## Ecosystem

- [DreamLoops](https://github.com/BrandonDucar/dreamloops)
- [GitGrid](https://github.com/BrandonDucar/dreamnet-git-grid)
- [Cerberus](https://github.com/BrandonDucar/dreamnet-cerberus)
- [Temporal Worker](https://github.com/BrandonDucar/dreamnet-temporal)
- [ToolGym](https://github.com/BrandonDucar/toolgym)
- [Memory Weaver](https://github.com/BrandonDucar/memory-weaver)
- [Proof Drop](https://github.com/BrandonDucar/proof-drop-zabal)
- [Quorum Lab](https://github.com/BrandonDucar/dreamnet-quorum-lab-ethnyc)
- [Whale League](https://dreamnet-whale-league.pages.dev)

## Status

`0.1.x` is an early public contract release. It is suitable for experiments,
interoperability work, and feedback. It is not a wallet, transaction signer,
authorization service, or production security boundary by itself.

## License

Apache-2.0. DreamNet trademarks, private services, and proprietary repositories
are not granted by this license.
