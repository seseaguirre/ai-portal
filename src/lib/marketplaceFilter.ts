import type {
  AssetType,
  BusinessArea,
  MarketplaceItem,
  Maturity,
  Squad,
} from '@/types'

export type MarketplaceSort = 'popular' | 'newest' | 'name'

export interface MarketplaceFilters {
  types: AssetType[]
  squads: Squad[]
  maturities: Maturity[]
  areas: BusinessArea[]
  search: string
  sort: MarketplaceSort
}

export const emptyFilters: MarketplaceFilters = {
  types: [],
  squads: [],
  maturities: [],
  areas: [],
  search: '',
  sort: 'popular',
}

export const typeOptions: AssetType[] = ['mcp', 'skill', 'tool', 'agent']
export const squadOptions: Squad[] = [
  'MiniMax',
  'Gemma',
  'Kimi',
  'Vector',
  'Community',
]
export const maturityOptions: Maturity[] = ['certified', 'sandbox', 'deprecated']
export const areaOptions: BusinessArea[] = [
  'Finance',
  'Offshore Operations',
  'Trading',
  'Health & Safety',
  'Bid Management',
  'Procurement',
  'People & Culture',
  'IT & Platform',
]

const latestChange = (item: MarketplaceItem): string =>
  item.changelog[0]?.date ?? ''

const matchesSearch = (item: MarketplaceItem, search: string): boolean => {
  if (!search) return true
  const haystack = [item.name, item.summary, ...item.capabilities]
    .join(' ')
    .toLowerCase()
  return haystack.includes(search.toLowerCase())
}

export const filterItems = (
  items: MarketplaceItem[],
  filters: MarketplaceFilters,
): MarketplaceItem[] => {
  const filtered = items.filter(
    (item) =>
      (filters.types.length === 0 || filters.types.includes(item.type)) &&
      (filters.squads.length === 0 || filters.squads.includes(item.squad)) &&
      (filters.maturities.length === 0 ||
        filters.maturities.includes(item.maturity)) &&
      (filters.areas.length === 0 ||
        filters.areas.includes(item.businessArea)) &&
      matchesSearch(item, filters.search),
  )

  const sorted = [...filtered]
  if (filters.sort === 'popular') {
    sorted.sort((a, b) => b.installs - a.installs)
  } else if (filters.sort === 'newest') {
    sorted.sort((a, b) => latestChange(b).localeCompare(latestChange(a)))
  } else {
    sorted.sort((a, b) => a.name.localeCompare(b.name))
  }
  return sorted
}

export const toggleValue = <T>(list: T[], value: T): T[] =>
  list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value]
