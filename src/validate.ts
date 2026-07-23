import type {
  AssignmentEnvelope,
  ClaimObject,
  ReceiptEnvelope,
  RiskTier,
} from "./contracts.js";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

const riskTiers = new Set<RiskTier>(["low", "medium", "high", "critical"]);
const assignmentStatuses = new Set([
  "created",
  "leased",
  "running",
  "waiting_approval",
  "verifying",
  "succeeded",
  "failed",
  "compensating",
]);

function isIsoDate(value: string): boolean {
  return !Number.isNaN(Date.parse(value));
}

function present(value: string | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateAssignment(
  assignment: AssignmentEnvelope,
): ValidationResult {
  const errors: string[] = [];

  if (assignment.schemaVersion !== "dreamnet.assignment.v1") {
    errors.push("schemaVersion must be dreamnet.assignment.v1");
  }
  if (!present(assignment.assignmentId)) errors.push("assignmentId is required");
  if (!present(assignment.principalId)) errors.push("principalId is required");
  if (!present(assignment.goal)) errors.push("goal is required");
  if (!assignment.acceptanceCriteria.length) {
    errors.push("acceptanceCriteria must contain at least one item");
  }
  if (!present(assignment.capsuleId)) errors.push("capsuleId is required");
  if (!present(assignment.idempotencyKey)) {
    errors.push("idempotencyKey is required");
  }
  if (!riskTiers.has(assignment.riskTier)) errors.push("riskTier is invalid");
  if (!assignmentStatuses.has(assignment.status)) errors.push("status is invalid");
  if (!isIsoDate(assignment.createdAt)) errors.push("createdAt is invalid");
  if (!isIsoDate(assignment.updatedAt)) errors.push("updatedAt is invalid");
  if (
    assignment.riskTier === "critical" &&
    assignment.approval.required !== true
  ) {
    errors.push("critical assignments require approval");
  }

  return { valid: errors.length === 0, errors };
}

export function validateReceipt(receipt: ReceiptEnvelope): ValidationResult {
  const errors: string[] = [];

  if (receipt.schemaVersion !== "dreamnet.receipt.v1") {
    errors.push("schemaVersion must be dreamnet.receipt.v1");
  }
  if (!present(receipt.receiptId)) errors.push("receiptId is required");
  if (!present(receipt.assignmentId)) errors.push("assignmentId is required");
  if (!present(receipt.traceId)) errors.push("traceId is required");
  if (!present(receipt.workloadId)) errors.push("workloadId is required");
  if (!isIsoDate(receipt.createdAt)) errors.push("createdAt is invalid");
  if (!isIsoDate(receipt.execution.startedAt)) {
    errors.push("execution.startedAt is invalid");
  }
  if (!isIsoDate(receipt.execution.completedAt)) {
    errors.push("execution.completedAt is invalid");
  }
  if (!/^[a-f0-9]{64}$/.test(receipt.contentSha256)) {
    errors.push("contentSha256 must be a lowercase SHA-256 digest");
  }
  if (
    receipt.execution.status === "succeeded" &&
    receipt.evidence.length === 0
  ) {
    errors.push("successful receipts require evidence");
  }

  return { valid: errors.length === 0, errors };
}

export function validateClaim(claim: ClaimObject): ValidationResult {
  const errors: string[] = [];

  if (claim.schemaVersion !== "dreamnet.claim.v1") {
    errors.push("schemaVersion must be dreamnet.claim.v1");
  }
  if (!present(claim.claimId)) errors.push("claimId is required");
  if (!present(claim.statement)) errors.push("statement is required");
  if (claim.confidence < 0 || claim.confidence > 1) {
    errors.push("confidence must be between 0 and 1");
  }
  if (
    claim.status === "verified" &&
    claim.supportingReceiptIds.length === 0
  ) {
    errors.push("verified claims require a supporting receipt");
  }

  return { valid: errors.length === 0, errors };
}
