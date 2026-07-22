import type {
  InventoryStatus,
  Maturity,
  RequestStatus,
  RiskTier,
} from '@/types'

/**
 * Presentational mapping from the app's several status vocabularies onto a
 * single set of badge tones. Tones map to token colours inside StatusBadge, so
 * a design-system swap never touches these business labels.
 */
export type BadgeTone =
  | 'certified'
  | 'sandbox'
  | 'deprecated'
  | 'pending'
  | 'info'
  | 'danger'
  | 'neutral'

export interface BadgeSpec {
  label: string
  tone: BadgeTone
}

export const maturityBadge = (maturity: Maturity): BadgeSpec => {
  const map: Record<Maturity, BadgeSpec> = {
    certified: { label: 'Certified', tone: 'certified' },
    sandbox: { label: 'Sandbox', tone: 'sandbox' },
    deprecated: { label: 'Deprecated', tone: 'deprecated' },
  }
  return map[maturity]
}

export const inventoryStatusBadge = (status: InventoryStatus): BadgeSpec => {
  const map: Record<InventoryStatus, BadgeSpec> = {
    active: { label: 'Active', tone: 'certified' },
    pilot: { label: 'Pilot', tone: 'info' },
    retired: { label: 'Retired', tone: 'deprecated' },
  }
  return map[status]
}

export const riskTierBadge = (tier: RiskTier): BadgeSpec => {
  const map: Record<RiskTier, BadgeSpec> = {
    minimal: { label: 'Minimal', tone: 'neutral' },
    limited: { label: 'Limited', tone: 'pending' },
    high: { label: 'High', tone: 'danger' },
  }
  return map[tier]
}

export const requestStatusBadge = (status: RequestStatus): BadgeSpec => {
  const map: Record<RequestStatus, BadgeSpec> = {
    submitted: { label: 'Submitted', tone: 'info' },
    'in-review': { label: 'In review', tone: 'pending' },
    approved: { label: 'Approved', tone: 'certified' },
    provisioned: { label: 'Provisioned', tone: 'certified' },
    rejected: { label: 'Rejected', tone: 'danger' },
  }
  return map[status]
}
