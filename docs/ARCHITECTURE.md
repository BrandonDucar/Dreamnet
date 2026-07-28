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
  -> Producing Claim Factory (credentialed workers)
  -> Independent Verification Factory
  -> Deterministic Promotion Gate
  -> Security Receipt Router
       | green  -> admit
       | yellow -> quarantine and remediate
       | orange -> human-led escalation
       | red    -> isolate and open incident
  -> Claim Registry, GitGrid, Proof Drop, and approved memory
```

Receipts are emitted across the lifecycle rather than appearing only at the end.
They bind each factory run, verification attempt, promotion decision, and
security route to its evidence and policy version.

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

### Workforce plane

Agent University teaches bounded roles. ToolGym provides practical exams, the
Security Gauntlet tests adverse conditions, and signed credentials grant a
worker one role in one factory or Claim City scope. Graduation never grants
blanket authority.

### Claim economy plane

Producing Claim Factories draft evidence-backed claims. Separately chartered
Verification Factories reproduce and falsify them. Claim Cities coordinate
multiple factories inside one domain without becoming a universal truth
authority.

### Projection plane

PGLite, Neon, Graphiti, vector indexes, search, and caches provide fast reads.
When the product permits, they are rebuildable projections rather than the only
copy of organizational knowledge.

### Security plane

Cerberus scans an exact artifact before installation or execution. The Receipt
Router converts its verdict into a durable admit, remediation, escalation, or
incident branch.

## Invariants

- Every meaningful job has one assignment ID.
- Consequential effects use stable idempotency keys.
- Critical assignments require explicit approval.
- Successful receipts contain evidence.
- Claims and receipts remain different objects.
- A producing Claim Factory cannot verify or promote its own claim.
- Producer and verifier runs cannot share workers when independence is required.
- Factory workers require current, scoped University credentials.
- Claim Cities route work but do not silently promote claims.
- Runtime state is explicit and restart-safe.
- Security receipts are bound to an exact digest or commit.
- Missing, yellow, orange, and red security receipts block execution.
- Replayed receipts cannot duplicate consequential effects.
- Private orchestration is not required to validate public artifacts.

See [DreamNet Whitepaper](WHITEPAPER.md) for the complete public model.
