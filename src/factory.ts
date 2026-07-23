import { randomUUID } from "node:crypto";
import { sha256 } from "./canonical.js";
import type {
  AssignmentEnvelope,
  CapsuleManifest,
  EvidenceReference,
  ReceiptEnvelope,
  RiskTier,
} from "./contracts.js";

export interface CreateAssignmentInput {
  principalId: string;
  goal: string;
  acceptanceCriteria: string[];
  capsule: CapsuleManifest;
  policyVersion: string;
  riskTier?: RiskTier;
  approvalRequired?: boolean;
}

export function createAssignment(
  input: CreateAssignmentInput,
): AssignmentEnvelope {
  const now = new Date().toISOString();
  const assignmentId = randomUUID();

  return {
    schemaVersion: "dreamnet.assignment.v1",
    assignmentId,
    principalId: input.principalId,
    goal: input.goal,
    acceptanceCriteria: input.acceptanceCriteria,
    capsuleId: input.capsule.capsuleId,
    capsuleVersion: input.capsule.version,
    policyVersion: input.policyVersion,
    riskTier: input.riskTier ?? "low",
    status: "created",
    createdAt: now,
    updatedAt: now,
    idempotencyKey: sha256({
      principalId: input.principalId,
      goal: input.goal,
      acceptanceCriteria: input.acceptanceCriteria,
      capsuleId: input.capsule.capsuleId,
      capsuleVersion: input.capsule.version,
    }),
    approval: {
      required:
        input.approvalRequired === true || input.riskTier === "critical",
    },
  };
}

export interface CreateReceiptInput {
  assignment: AssignmentEnvelope;
  traceId: string;
  workloadId: string;
  startedAt: string;
  status: "succeeded" | "failed" | "abstained";
  summary: string;
  toolCalls: number;
  evidence: EvidenceReference[];
}

export function createReceipt(input: CreateReceiptInput): ReceiptEnvelope {
  const createdAt = new Date().toISOString();
  const receiptWithoutHash = {
    schemaVersion: "dreamnet.receipt.v1" as const,
    receiptId: randomUUID(),
    assignmentId: input.assignment.assignmentId,
    traceId: input.traceId,
    principalId: input.assignment.principalId,
    workloadId: input.workloadId,
    capsuleId: input.assignment.capsuleId,
    capsuleVersion: input.assignment.capsuleVersion,
    policyVersion: input.assignment.policyVersion,
    execution: {
      startedAt: input.startedAt,
      completedAt: createdAt,
      status: input.status,
      summary: input.summary,
      toolCalls: input.toolCalls,
    },
    evidence: input.evidence,
    createdAt,
  };

  return {
    ...receiptWithoutHash,
    contentSha256: sha256(receiptWithoutHash),
  };
}
