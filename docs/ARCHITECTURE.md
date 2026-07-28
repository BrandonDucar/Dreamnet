# Architecture

DreamNet Public Core defines the contract between an objective, durable work,
and independently inspectable evidence.

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
       | green  -> admit
       | yellow -> quarantine and remediate
       | red    -> isolate and open incident
  -> GitGrid, Proof Drop, and approved memory
```

The runtime is intentionally replaceable. A compatible implementation may use a
local process, OpenClaw, an agent framework, a Temporal worker, a Cloudflare
Worker, or another substrate.

## Planes

### Contract plane

Assignment, Capsule, DreamLoop state, Claim, Receipt, and Proof Drop structures
remain portable across runtimes.

### Execution plane

Temporal or another durable engine owns task delivery, timers, retries, and
workflow history. NUC, cloud, and edge workers execute bounded activities.

### Evidence plane

GitGrid repositories store approved events, claims, receipts, snapshots, and
lineage. Large artifacts remain in approved object storage and are referenced by
digest.

### Projection plane

PGLite, Neon, Graphiti, vector indexes, search, and caches provide fast reads.
When the product permits, they are rebuildable projections rather than the only
copy of organizational knowledge.

### Security plane

Cerberus scans an exact artifact before installation or execution. The Receipt
Router converts its verdict into a durable admit, remediation, or incident
branch.

## Invariants

- Every meaningful job has one assignment ID.
- Consequential effects use stable idempotency keys.
- Critical assignments require explicit approval.
- Successful receipts contain evidence.
- Claims and receipts remain different objects.
- Runtime state is explicit and restart-safe.
- Security receipts are bound to an exact digest or commit.
- Missing, yellow, and red security receipts block execution.
- Replayed receipts cannot duplicate consequential effects.
- Private orchestration is not required to validate public artifacts.

See [DreamNet Whitepaper](WHITEPAPER.md) for the complete public model.
