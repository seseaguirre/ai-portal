import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { formatCost } from '@/lib/format'
import { computeKpis } from '@/lib/inventoryFilter'
import type { InventoryAsset } from '@/types'

function KpiTile({
  label,
  value,
  sub,
  highlight = false,
}: {
  label: string
  value: string
  sub?: string
  highlight?: boolean
}) {
  return (
    <Card sx={{ p: 2, minWidth: 0 }}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography
        variant="h4"
        sx={(t) => ({
          my: 0.25,
          color: highlight ? t.tokens.color.status.pending : undefined,
        })}
      >
        {value}
      </Typography>
      {sub && (
        <Typography variant="caption" color="text.secondary">
          {sub}
        </Typography>
      )}
    </Card>
  )
}

export function InventoryKpis({ assets }: { assets: InventoryAsset[] }) {
  const kpis = computeKpis(assets)

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr 1fr',
          md: 'repeat(4, 1fr)',
        },
        gap: 2,
        mb: 3,
      }}
    >
      <KpiTile
        label="Total AI assets"
        value={String(kpis.total)}
        sub={`${kpis.active} active · ${kpis.pilot} pilot · ${kpis.retired} retired`}
      />
      <KpiTile label="Monthly cost" value={formatCost(kpis.monthlyCost)} sub="Mock figure" />
      <KpiTile label="Active agents" value={String(kpis.activeAgents)} />
      <KpiTile
        label="Pending reviews"
        value={String(kpis.pendingReviews)}
        sub="Compliance not yet complete"
        highlight={kpis.pendingReviews > 0}
      />
    </Box>
  )
}
