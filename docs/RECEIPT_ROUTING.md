# Receipt Routing

The Receipt Router turns a content-bound security verdict into a durable workflow
branch.

| Verdict | Execution | Route |
| --- | --- | --- |
| Green | Allowed for the scanned digest | Admit |
| Yellow | Blocked | Quarantine and remediate |
| Orange | Blocked | Human-led escalation |
| Red | Blocked | Isolate and open an incident |
| Missing or unknown | Blocked | Fail closed |

## Yellow

Yellow stops installation and execution, preserves the artifact without running
it, opens remediation work linked to each finding, expands the relevant
specialist quorum, and requires a green receipt for a replacement commit.

## Orange

Orange stops installation and execution, preserves the exact artifact and
receipt, expands review to a human-led specialist quorum, and opens a Proof Drop
for the contested evidence. It is used when risk is too high for routine
remediation but the evidence does not yet require full incident containment.

## Red

Red aborts the assignment, isolates derived output, revokes temporary access,
preserves logs and hashes, creates an incident Proof Drop, alerts the designated
operator, and requires human approval before re-entry.

## Idempotency

The routing key is:

```text
receipt digest + policy version
```

Replaying a receipt returns its existing route decision. It must not create
duplicate issues, alerts, revocations, Proof Drops, or external effects.

## Re-entry

An artifact re-enters only when:

- remediation produced a new commit or digest,
- the new artifact received a green receipt,
- required reviews and approvals completed,
- access is reissued with fresh scope,
- the original yellow, orange, or red receipt remains preserved as lineage
  evidence.
