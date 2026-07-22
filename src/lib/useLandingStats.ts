import { marketplaceItems } from '@/data/marketplace'
import { inventoryAssets } from '@/data/inventory'
import { seedRequests } from '@/data/requests'

/** Derive landing-page stats from existing mock data — no hardcoded numbers. */
export function useLandingStats() {
  const skills = marketplaceItems.filter((i) => i.type === 'skill').length
  const mcpServers = marketplaceItems.filter((i) => i.type === 'mcp').length
  const employeesOnboarded = marketplaceItems.reduce(
    (sum, i) => sum + i.installs,
    0,
  )
  const requestsFulfilled = seedRequests.filter(
    (r) => r.state.status === 'approved' || r.state.status === 'provisioned',
  ).length
  const totalAssets = inventoryAssets.length

  return { skills, mcpServers, employeesOnboarded, requestsFulfilled, totalAssets }
}
