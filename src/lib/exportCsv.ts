import type { InventoryAsset } from '@/types'
import {
  assetTypeLabel,
  dataClassLabel,
  inventoryStatusLabel,
  riskTierLabel,
} from './labels'

const header = [
  'Name',
  'Type',
  'Owner squad',
  'Business owner',
  'Status',
  'Risk tier',
  'Data classification',
  'Monthly cost (DKK)',
  'Last activity',
]

const escape = (value: string): string => `"${value.replace(/"/g, '""')}"`

export const inventoryToCsv = (assets: InventoryAsset[]): string => {
  const rows = assets.map((a) =>
    [
      a.name,
      assetTypeLabel[a.type],
      a.squad,
      a.businessOwner,
      inventoryStatusLabel[a.status],
      riskTierLabel[a.riskTier],
      dataClassLabel[a.dataClass],
      String(a.monthlyCost),
      a.lastActivity,
    ]
      .map(escape)
      .join(','),
  )
  return [header.map(escape).join(','), ...rows].join('\n')
}

export const downloadCsv = (filename: string, content: string): void => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
