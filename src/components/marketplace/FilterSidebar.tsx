import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import {
  areaOptions,
  emptyFilters,
  maturityOptions,
  squadOptions,
  toggleValue,
  typeOptions,
  type MarketplaceFilters,
  type MarketplaceSort,
} from '@/lib/marketplaceFilter'
import { assetTypeLabel, maturityLabel } from '@/lib/labels'

interface FacetGroupProps<T extends string> {
  title: string
  options: T[]
  selected: T[]
  getLabel: (value: T) => string
  onToggle: (value: T) => void
}

function FacetGroup<T extends string>({
  title,
  options,
  selected,
  getLabel,
  onToggle,
}: FacetGroupProps<T>) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
        {title}
      </Typography>
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                size="small"
                checked={selected.includes(option)}
                onChange={() => onToggle(option)}
              />
            }
            label={<Typography variant="body2">{getLabel(option)}</Typography>}
          />
        ))}
      </FormGroup>
    </Box>
  )
}

interface FilterSidebarProps {
  filters: MarketplaceFilters
  onChange: (next: MarketplaceFilters) => void
}

export function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  const hasFilters =
    filters.types.length > 0 ||
    filters.squads.length > 0 ||
    filters.maturities.length > 0 ||
    filters.areas.length > 0 ||
    filters.search !== ''

  return (
    <Box component="aside" aria-label="Filters" sx={{ width: { xs: '100%', md: 248 }, flexShrink: 0 }}>
      <TextField
        fullWidth
        size="small"
        label="Search the Marketplace"
        value={filters.search}
        onChange={(event) =>
          onChange({ ...filters, search: event.target.value })
        }
        sx={{ mb: 2 }}
      />
      <TextField
        select
        fullWidth
        size="small"
        label="Sort by"
        value={filters.sort}
        onChange={(event) =>
          onChange({ ...filters, sort: event.target.value as MarketplaceSort })
        }
        sx={{ mb: 2 }}
      >
        <MenuItem value="popular">Most used</MenuItem>
        <MenuItem value="newest">Newest</MenuItem>
        <MenuItem value="name">Name (A–Z)</MenuItem>
      </TextField>
      <Divider sx={{ mb: 2 }} />

      <FacetGroup
        title="Type"
        options={typeOptions}
        selected={filters.types}
        getLabel={(value) => assetTypeLabel[value]}
        onToggle={(value) =>
          onChange({ ...filters, types: toggleValue(filters.types, value) })
        }
      />
      <FacetGroup
        title="Owner squad"
        options={squadOptions}
        selected={filters.squads}
        getLabel={(value) => value}
        onToggle={(value) =>
          onChange({ ...filters, squads: toggleValue(filters.squads, value) })
        }
      />
      <FacetGroup
        title="Maturity"
        options={maturityOptions}
        selected={filters.maturities}
        getLabel={(value) => maturityLabel[value]}
        onToggle={(value) =>
          onChange({
            ...filters,
            maturities: toggleValue(filters.maturities, value),
          })
        }
      />
      <FacetGroup
        title="Business area"
        options={areaOptions}
        selected={filters.areas}
        getLabel={(value) => value}
        onToggle={(value) =>
          onChange({ ...filters, areas: toggleValue(filters.areas, value) })
        }
      />

      {hasFilters && (
        <Button size="small" onClick={() => onChange(emptyFilters)}>
          Clear all filters
        </Button>
      )}
    </Box>
  )
}
