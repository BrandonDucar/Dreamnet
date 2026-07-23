import {
  createAssignment,
  createReceipt,
  type CapsuleManifest,
  validateAssignment,
  validateReceipt,
} from "@dreamnet/public-core";

const capsule: CapsuleManifest = {
  schemaVersion: "dreamnet.capsule.v1",
  capsuleId: "capsule:research-summary",
  name: "Research Summary",
  version: "1.0.0",
  description: "Reads approved sources and produces a cited summary.",
  capabilities: ["research", "summarize"],
  tools: ["approved-source-reader"],
  requiredPolicies: ["policy:public-research"],
  acceptedRiskTiers: ["low", "medium"],
  receiptRequired: true,
};

const assignment = createAssignment({
  principalId: "user:local-demo",
  goal: "Summarize the approved research bundle",
  acceptanceCriteria: [
    "Every material statement cites a source",
    "Unsupported claims are omitted",
  ],
  capsule,
  policyVersion: "policy:public-research@1",
});

if (!validateAssignment(assignment).valid) {
  throw new Error("Assignment validation failed");
}

const receipt = createReceipt({
  assignment,
  traceId: "trace:local-demo",
  workloadId: "workload:local-node",
  startedAt: new Date().toISOString(),
  status: "succeeded",
  summary: "The approved research bundle was summarized.",
  toolCalls: 1,
  evidence: [
    {
      id: "source:approved-bundle",
      kind: "source",
      uri: "file:///approved/research.md",
    },
  ],
});

if (!validateReceipt(receipt).valid) {
  throw new Error("Receipt validation failed");
}

console.log(JSON.stringify({ assignment, receipt }, null, 2));
