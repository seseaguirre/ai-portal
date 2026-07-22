import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableSortLabel from '@mui/material/TableSortLabel'
import Card from '@mui/material/Card'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { inventoryStatusBadge, riskTierBadge } from '@/lib/status'
import { assetTypeLabel, dataClassLabel } from '@/lib/labels'
import { formatCost } from '@/lib/format'
import type { SortDirection, SortKey } from '@/lib/inventoryFilter'
import type { InventoryAsset } from '@/types'

interface Column {
  key?: SortKey
  label: string
  numeric?: boolean
}

const columns: Column[] = [
  { key: 'name', label: 'Name' },
  { label: 'Type' },
  { key: 'squad', label: 'Owner squad' },
  { label: 'Business owner' },
  { key: 'status', label: 'Status' },
  { key: 'riskTier', label: 'Risk tier' },
  { label: 'Data class' },
  { key: 'monthlyCost', label: 'Monthly cost', numeric: true },
  { key: 'lastActivity', label: 'Last activity' },
]

interface InventoryTableProps {
  assets: InventoryAsset[]
  sortKey: SortKey
  sortDirection: SortDirection
  onSort: (key: SortKey) => void
  dense: boolean
  onSelect: (asset: InventoryAsset) => void
}

export function InventoryTable({
  assets,
  sortKey,
  sortDirection,
  onSort,
  dense,
  onSelect,
}: InventoryTableProps) {
  return (
    <Card>
      <TableContainer>
        <Table size={dense ? 'small' : 'medium'} stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.label}
                  align={column.numeric ? 'right' : 'left'}
                  sortDirection={
                    column.key && sortKey === column.key ? sortDirection : false
                  }
                >
                  {column.key ? (
                    <TableSortLabel
                      active={sortKey === column.key}
                      direction={sortKey === column.key ? sortDirection : 'asc'}
                      onClick={() => onSort(column.key as SortKey)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {assets.map((asset) => (
              <TableRow
                key={asset.id}
                hover
                onClick={() => onSelect(asset)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>{asset.name}</TableCell>
                <TableCell>{assetTypeLabel[asset.type]}</TableCell>
                <TableCell>{asset.squad}</TableCell>
                <TableCell>{asset.businessOwner}</TableCell>
                <TableCell>
                  <StatusBadge {...inventoryStatusBadge(asset.status)} />
                </TableCell>
                <TableCell>
                  <StatusBadge {...riskTierBadge(asset.riskTier)} />
                </TableCell>
                <TableCell>{dataClassLabel[asset.dataClass]}</TableCell>
                <TableCell align="right">{formatCost(asset.monthlyCost)}</TableCell>
                <TableCell>{asset.lastActivity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
