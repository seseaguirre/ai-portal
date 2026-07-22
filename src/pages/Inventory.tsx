import { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined'
import { PageHeader } from '@/components/ui/PageHeader'
import { InventoryKpis } from '@/components/inventory/InventoryKpis'
import { InventoryTable } from '@/components/inventory/InventoryTable'
import { InventoryDetailPanel } from '@/components/inventory/InventoryDetailPanel'
import { AccessDenied } from './AccessDenied'
import { useActivePersona } from '@/lib/useActivePersona'
import { inventoryAssets } from '@/data/inventory'
import { deprecatedNames } from '@/data/marketplace'
import {
  applyPreset,
  presetLabels,
  searchAssets,
  sortAssets,
  type InventoryPreset,
  type SortKey,
  type SortDirection,
} from '@/lib/inventoryFilter'
import { inventoryToCsv, downloadCsv } from '@/lib/exportCsv'
import type { InventoryAsset } from '@/types'

const presets = Object.keys(presetLabels) as InventoryPreset[]

export function Inventory() {
  const persona = useActivePersona()
  const [preset, setPreset] = useState<InventoryPreset | null>(null)
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [dense, setDense] = useState(false)
  const [selected, setSelected] = useState<InventoryAsset | null>(null)

  if (!persona?.canSeeInventory) return <AccessDenied />

  const visible = sortAssets(
    searchAssets(applyPreset(inventoryAssets, preset, deprecatedNames), search),
    sortKey,
    sortDirection,
  )

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection((dir) => (dir === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  return (
    <Box>
      <PageHeader
        title="AI Inventory"
        subtitle="The governance control tower: every AI asset across Ørsted, its risk tier, cost, and compliance status."
        action={
          <Button
            variant="outlined"
            startIcon={<FileDownloadOutlined />}
            onClick={() =>
              downloadCsv('oae-ai-inventory.csv', inventoryToCsv(visible))
            }
          >
            Export CSV
          </Button>
        }
      />

      <InventoryKpis assets={inventoryAssets} />

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          mb: 2,
        }}
      >
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          {presets.map((key) => (
            <Chip
              key={key}
              label={presetLabels[key]}
              color={preset === key ? 'primary' : 'default'}
              variant={preset === key ? 'filled' : 'outlined'}
              onClick={() => setPreset(preset === key ? null : key)}
            />
          ))}
        </Stack>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            size="small"
            label="Search assets"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <FormControlLabel
            control={
              <Switch
                checked={dense}
                onChange={(event) => setDense(event.target.checked)}
              />
            }
            label="Dense"
          />
        </Box>
      </Box>

      <InventoryTable
        assets={visible}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={handleSort}
        dense={dense}
        onSelect={setSelected}
      />

      <InventoryDetailPanel asset={selected} onClose={() => setSelected(null)} />
    </Box>
  )
}
