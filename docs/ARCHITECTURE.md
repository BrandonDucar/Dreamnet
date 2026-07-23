# Architecture

DreamNet Public Core defines the seam between an objective and verifiable work.

```text
Objective
  -> Assignment Envelope
  -> Capsule
  -> DreamLoop runtime
  -> Verification
  -> Receipt
  -> Claim
  -> Proof Drop or durable memory
```

The runtime is intentionally not prescribed. A compatible implementation can
use a local process, OpenClaw, an agent framework, a durable workflow engine, a
Cloudflare Worker, or another substrate.

## Invariants

- Every meaningful job has one assignment ID.
- Consequential effects use an idempotency key.
- Critical assignments require approval.
- Successful receipts contain evidence.
- Claims and receipts are different objects.
- Runtime state is explicit and restart-safe.
- Private orchestration is not required to validate public artifacts.
