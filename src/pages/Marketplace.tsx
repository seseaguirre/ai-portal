import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { PageHeader } from '@/components/ui/PageHeader'
import { FilterSidebar } from '@/components/marketplace/FilterSidebar'
import { MarketplaceCard } from '@/components/marketplace/MarketplaceCard'
import { ItemDetailDrawer } from '@/components/marketplace/ItemDetailDrawer'
import { marketplaceItems, getMarketplaceItem } from '@/data/marketplace'
import { filterItems, emptyFilters } from '@/lib/marketplaceFilter'

export function Marketplace() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [filters, setFilters] = useState(emptyFilters)
  const items = filterItems(marketplaceItems, filters)
  const selected = id ? (getMarketplaceItem(id) ?? null) : null

  return (
    <Box>
      <PageHeader
        title="Marketplace"
        subtitle="Discover approved AI tools, skills, MCP servers, and agents from across Ørsted. Look for the Certified badge for everyday use."
      />
      <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
        <FilterSidebar filters={filters} onChange={setFilters} />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {items.length} {items.length === 1 ? 'result' : 'results'}
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                lg: '1fr 1fr 1fr',
              },
              gap: 2,
            }}
          >
            {items.map((item) => (
              <MarketplaceCard key={item.id} item={item} />
            ))}
          </Box>
          {items.length === 0 && (
            <Typography variant="body1" color="text.secondary" sx={{ mt: 4 }}>
              No tools match those filters yet. Try clearing a filter, or search
              with different words.
            </Typography>
          )}
        </Box>
      </Box>
      <ItemDetailDrawer item={selected} onClose={() => navigate('/marketplace')} />
    </Box>
  )
}
