import type { InventoryAsset } from '@/types'

export interface InventoryKpis {
  total: number
  active: number
  pilot: number
  retired: number
  monthlyCost: number
  activeAgents: number
  pendingReviews: number
}

export const isPendingReview = (asset: InventoryAsset): boolean =>
  asset.compliance.some((item) => !item.done)

export const computeKpis = (assets: InventoryAsset[]): InventoryKpis => ({
  total: assets.length,
  active: assets.filter((a) => a.status === 'active').length,
  pilot: assets.filter((a) => a.status === 'pilot').length,
  retired: assets.filter((a) => a.status === 'retired').length,
  monthlyCost: assets.reduce((sum, a) => sum + a.monthlyCost, 0),
  activeAgents: assets.filter((a) => a.type === 'agent' && a.status === 'active')
    .length,
  pendingReviews: assets.filter(isPendingReview).length,
})

export type InventoryPreset = 'high-risk' | 'pending-review' | 'deprecated-active'

export const presetLabels: Record<InventoryPreset, string> = {
  'high-risk': 'High risk',
  'pending-review': 'Pending review',
  'deprecated-active': 'Deprecated still active',
}

export const applyPreset = (
  assets: InventoryAsset[],
  preset: InventoryPreset | null,
  deprecatedNames: Set<string>,
): InventoryAsset[] => {
  if (preset === 'high-risk') return assets.filter((a) => a.riskTier === 'high')
  if (preset === 'pending-review') return assets.filter(isPendingReview)
  if (preset === 'deprecated-active') {
    return assets.filter((a) => deprecatedNames.has(a.name) && a.status === 'active')
  }
  return assets
}

export const searchAssets = (
  assets: InventoryAsset[],
  search: string,
): InventoryAsset[] => {
  if (!search.trim()) return assets
  const needle = search.toLowerCase()
  return assets.filter((a) =>
    [a.name, a.businessOwner, a.squad].join(' ').toLowerCase().includes(needle),
  )
}

export type SortKey =
  | 'name'
  | 'squad'
  | 'status'
  | 'riskTier'
  | 'monthlyCost'
  | 'lastActivity'

export type SortDirection = 'asc' | 'desc'

const statusRank = { active: 0, pilot: 1, retired: 2 }
const riskRank = { minimal: 0, limited: 1, high: 2 }

const compare = (a: InventoryAsset, b: InventoryAsset, key: SortKey): number => {
  switch (key) {
    case 'monthlyCost':
      return a.monthlyCost - b.monthlyCost
    case 'status':
      return statusRank[a.status] - statusRank[b.status]
    case 'riskTier':
      return riskRank[a.riskTier] - riskRank[b.riskTier]
    case 'lastActivity':
      return a.lastActivity.localeCompare(b.lastActivity)
    case 'squad':
      return a.squad.localeCompare(b.squad)
    default:
      return a.name.localeCompare(b.name)
  }
}

export const sortAssets = (
  assets: InventoryAsset[],
  key: SortKey,
  direction: SortDirection,
): InventoryAsset[] => {
  const sorted = [...assets].sort((a, b) => compare(a, b, key))
  return direction === 'asc' ? sorted : sorted.reverse()
}
