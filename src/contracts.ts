export const DREAMNET_PUBLIC_CORE_VERSION = "0.1.0" as const;

export type RiskTier = "low" | "medium" | "high" | "critical";

export type AssignmentStatus =
  | "created"
  | "leased"
  | "running"
  | "waiting_approval"
  | "verifying"
  | "succeeded"
  | "failed"
  | "compensating";

export type EvidenceKind =
  | "artifact"
  | "command"
  | "source"
  | "test"
  | "approval"
  | "observation";

export interface EvidenceReference {
  id: string;
  kind: EvidenceKind;
  uri: string;
  sha256?: string;
  mediaType?: string;
  description?: string;
}

export interface BudgetLimits {
  maxCostUsd?: number;
  maxDurationMs?: number;
  maxToolCalls?: number;
  maxTokens?: number;
}

export interface ApprovalRequirement {
  required: boolean;
  reason?: string;
  approverRoles?: string[];
}

export interface AssignmentEnvelope {
  schemaVersion: "dreamnet.assignment.v1";
  assignmentId: string;
  parentAssignmentId?: string;
  principalId: string;
  workloadId?: string;
  goal: string;
  acceptanceCriteria: string[];
  capsuleId: string;
  capsuleVersion: string;
  policyVersion: string;
  riskTier: RiskTier;
  status: AssignmentStatus;
  createdAt: string;
  updatedAt: string;
  idempotencyKey: string;
  budget?: BudgetLimits;
  approval: ApprovalRequirement;
  requiredEvidence?: EvidenceKind[];
  labels?: Record<string, string>;
}

export interface CapsuleManifest {
  schemaVersion: "dreamnet.capsule.v1";
  capsuleId: string;
  name: string;
  version: string;
  description: string;
  capabilities: string[];
  tools: string[];
  requiredPolicies: string[];
  acceptedRiskTiers: RiskTier[];
  receiptRequired: boolean;
}

export interface ExecutionRecord {
  startedAt: string;
  completedAt: string;
  status: "succeeded" | "failed" | "abstained";
  summary: string;
  toolCalls: number;
  costUsd?: number;
}

export interface ReceiptEnvelope {
  schemaVersion: "dreamnet.receipt.v1";
  receiptId: string;
  assignmentId: string;
  traceId: string;
  principalId: string;
  workloadId: string;
  capsuleId: string;
  capsuleVersion: string;
  policyVersion: string;
  execution: ExecutionRecord;
  evidence: EvidenceReference[];
  claims?: string[];
  counterevidence?: EvidenceReference[];
  redactions?: string[];
  createdAt: string;
  contentSha256: string;
}

export interface ClaimObject {
  schemaVersion: "dreamnet.claim.v1";
  claimId: string;
  statement: string;
  status: "proposed" | "supported" | "disputed" | "verified" | "retracted";
  confidence: number;
  supportingReceiptIds: string[];
  challengingReceiptIds: string[];
  dependencies?: string[];
  contradictions?: string[];
  createdAt: string;
  lastVerifiedAt?: string;
}
