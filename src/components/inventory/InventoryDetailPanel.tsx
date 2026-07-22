import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import CloseOutlined from '@mui/icons-material/CloseOutlined'
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline'
import RadioButtonUncheckedOutlined from '@mui/icons-material/RadioButtonUncheckedOutlined'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { CostSparkline } from './CostSparkline'
import { inventoryStatusBadge, riskTierBadge } from '@/lib/status'
import { assetTypeLabel, dataClassLabel } from '@/lib/labels'
import { formatCost } from '@/lib/format'
import type { InventoryAsset } from '@/types'

interface InventoryDetailPanelProps {
  asset: InventoryAsset | null
  onClose: () => void
}

export function InventoryDetailPanel({
  asset,
  onClose,
}: InventoryDetailPanelProps) {
  return (
    <Drawer
      anchor="right"
      open={Boolean(asset)}
      onClose={onClose}
      slotProps={{ paper: { sx: { width: 520, maxWidth: '100vw' } } }}
    >
      {asset && (
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <StatusBadge {...inventoryStatusBadge(asset.status)} />
              <StatusBadge {...riskTierBadge(asset.riskTier)} />
            </Box>
            <IconButton aria-label="Close" onClick={onClose}>
              <CloseOutlined />
            </IconButton>
          </Box>

          <Typography variant="h4">{asset.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {assetTypeLabel[asset.type]} · {asset.squad} squad ·{' '}
            {asset.businessOwner}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {asset.description}
          </Typography>

          <Divider sx={{ my: 2 }} />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="caption" color="text.secondary">
                Monthly cost
              </Typography>
              <Typography variant="h5">{formatCost(asset.monthlyCost)}</Typography>
              <Typography variant="caption" color="text.secondary">
                Data classification: {dataClassLabel[asset.dataClass]}
              </Typography>
            </Box>
            <CostSparkline data={asset.costTrend} />
          </Box>

          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Lineage
          </Typography>
          {asset.lineage.length > 0 ? (
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {asset.lineage.map((dependency) => (
                <Chip key={dependency} label={dependency} variant="outlined" size="small" />
              ))}
            </Stack>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No upstream dependencies recorded.
            </Typography>
          )}

          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Compliance checklist
          </Typography>
          {asset.compliance.map((item) => {
            const Icon = item.done
              ? CheckCircleOutline
              : RadioButtonUncheckedOutlined
            return (
              <Box key={item.label} sx={{ display: 'flex', gap: 1, mb: 0.75 }}>
                <Icon
                  fontSize="small"
                  sx={(t) => ({
                    color: item.done
                      ? t.tokens.color.status.certified
                      : t.tokens.color.status.pending,
                  })}
                />
                <Typography variant="body2">{item.label}</Typography>
              </Box>
            )
          })}
        </Box>
      )}
    </Drawer>
  )
}
