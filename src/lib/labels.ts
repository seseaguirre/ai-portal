import type {
  AssetType,
  DataClass,
  Environment,
  InventoryStatus,
  Maturity,
  RequestKind,
  RiskTier,
} from '@/types'

/** Human-readable names for enum values. One place so copy stays consistent. */

export const assetTypeLabel: Record<AssetType, string> = {
  mcp: 'MCP server',
  skill: 'Skill',
  tool: 'Tool',
  agent: 'Agent',
}

export const maturityLabel: Record<Maturity, string> = {
  certified: 'Certified',
  sandbox: 'Sandbox',
  deprecated: 'Deprecated',
}

export const dataClassLabel: Record<DataClass, string> = {
  public: 'Public',
  internal: 'Internal',
  confidential: 'Confidential',
}

export const environmentLabel: Record<Environment, string> = {
  sandbox: 'Sandbox',
  dev: 'Dev',
  prod: 'Prod',
}

export const requestKindLabel: Record<RequestKind, string> = {
  mcp: 'MCP server',
  skill: 'Skill',
  'agent-workspace': 'Agent workspace',
  'model-access': 'AI model access',
  transformer: 'Transformer',
  assessor: 'Assessor',
}

export const riskTierLabel: Record<RiskTier, string> = {
  minimal: 'Minimal',
  limited: 'Limited',
  high: 'High',
}

export const inventoryStatusLabel: Record<InventoryStatus, string> = {
  active: 'Active',
  pilot: 'Pilot',
  retired: 'Retired',
}
