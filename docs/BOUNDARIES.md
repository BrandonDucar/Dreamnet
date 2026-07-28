# Public and Private Boundaries

DreamNet uses a deliberate two-tier repository model.

## Public Core

This repository contains portable contracts and examples that outside users can
adopt without access to DreamNet's private operating environment:

- Assignment envelopes
- Capsule manifests
- DreamLoop lifecycle states
- Receipt envelopes
- Claim objects
- Canonical hashing helpers
- Local validation
- Public examples and schemas
- GitGrid repository contracts and storage rules
- Cerberus security-receipt formats and routing rules
- Reference Temporal worker patterns

## Private Engine

The private DreamNet monorepo contains proprietary or operational material that
is not copied into this repository:

- Production orchestration and routing
- Internal agent definitions and prompts
- Provider credentials and deployment configuration
- Private memory and customer data
- Cost, policy, and risk models
- Internal automation and unreleased experiments
- Defense or regulated-environment implementations

## Extraction Rule

Public code is added from an explicit allowlist. DreamNet does not create a
public release by deleting a few known secrets from the private monorepo.

Every extraction must pass:

1. Cerberus scan bound to the exact source commit
2. License and attribution review
3. Dependency and vulnerability review
4. Proprietary-boundary review
5. Tests and reproducible build
6. Public documentation review
