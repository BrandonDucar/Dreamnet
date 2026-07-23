import assert from "node:assert/strict";
import test from "node:test";
import {
  createAssignment,
  createReceipt,
  type CapsuleManifest,
  validateAssignment,
  validateReceipt,
} from "../src/index.js";

const capsule: CapsuleManifest = {
  schemaVersion: "dreamnet.capsule.v1",
  capsuleId: "capsule:public-example",
  name: "Public Example",
  version: "1.0.0",
  description: "A bounded example Capsule.",
  capabilities: ["summarize"],
  tools: ["local-file-reader"],
  requiredPolicies: ["policy:read-only"],
  acceptedRiskTiers: ["low"],
  receiptRequired: true,
};

test("creates a valid assignment with a stable idempotency key", () => {
  const assignment = createAssignment({
    principalId: "user:example",
    goal: "Summarize a local document",
    acceptanceCriteria: ["Summary references the source artifact"],
    capsule,
    policyVersion: "policy:read-only@1",
  });

  assert.equal(validateAssignment(assignment).valid, true);
  assert.match(assignment.idempotencyKey, /^[a-f0-9]{64}$/);
});

test("requires approval for critical assignments", () => {
  const assignment = createAssignment({
    principalId: "user:example",
    goal: "Review a consequential change",
    acceptanceCriteria: ["Human approval is recorded"],
    capsule,
    policyVersion: "policy:critical@1",
    riskTier: "critical",
  });

  assert.equal(assignment.approval.required, true);
  assert.equal(validateAssignment(assignment).valid, true);
});

test("creates an evidence-backed receipt", () => {
  const assignment = createAssignment({
    principalId: "user:example",
    goal: "Run the public-core tests",
    acceptanceCriteria: ["All tests pass"],
    capsule,
    policyVersion: "policy:ci@1",
  });

  const receipt = createReceipt({
    assignment,
    traceId: "trace:test",
    workloadId: "workload:node-test",
    startedAt: new Date().toISOString(),
    status: "succeeded",
    summary: "The public-core tests passed.",
    toolCalls: 1,
    evidence: [
      {
        id: "evidence:test-output",
        kind: "test",
        uri: "urn:dreamnet:test:contracts",
      },
    ],
  });

  assert.equal(validateReceipt(receipt).valid, true);
  assert.match(receipt.contentSha256, /^[a-f0-9]{64}$/);
});
