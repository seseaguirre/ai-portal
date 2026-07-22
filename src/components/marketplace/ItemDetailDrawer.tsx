import { useEffect, useState } from 'react'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import CloseOutlined from '@mui/icons-material/CloseOutlined'
import { TypeIcon } from '@/components/ui/TypeIcon'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { OverviewTab } from './OverviewTab'
import { TechnicalTab } from './TechnicalTab'
import { maturityBadge } from '@/lib/status'
import { assetTypeLabel } from '@/lib/labels'
import { useActivePersona } from '@/lib/useActivePersona'
import type { MarketplaceItem } from '@/types'

interface ItemDetailDrawerProps {
  item: MarketplaceItem | null
  onClose: () => void
}

export function ItemDetailDrawer({ item, onClose }: ItemDetailDrawerProps) {
  const persona = useActivePersona()
  const [tab, setTab] = useState(0)
  const [toastOpen, setToastOpen] = useState(false)
  const showTechnical = Boolean(persona?.technical && item?.technical)

  useEffect(() => setTab(0), [item?.id])

  return (
    <>
      <Drawer
        anchor="right"
        open={Boolean(item)}
        onClose={onClose}
        slotProps={{ paper: { sx: { width: 560, maxWidth: '100vw' } } }}
      >
        {item && (
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <TypeIcon kind={item.type} color="primary" fontSize="large" />
              <IconButton aria-label="Close" onClick={onClose}>
                <CloseOutlined />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
              <Typography variant="h4">{item.name}</Typography>
              <StatusBadge {...maturityBadge(item.maturity)} />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {assetTypeLabel[item.type]} · {item.squad} squad
            </Typography>

            {showTechnical && (
              <Tabs value={tab} onChange={(_, next) => setTab(next)} sx={{ mb: 2 }}>
                <Tab label="Overview" />
                <Tab label="Technical" />
              </Tabs>
            )}

            {tab === 1 && item.technical ? (
              <TechnicalTab detail={item.technical} />
            ) : (
              <OverviewTab item={item} />
            )}

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
              onClick={() => setToastOpen(true)}
            >
              Add to my workspace
            </Button>
          </Box>
        )}
      </Drawer>
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setToastOpen(false)}
        >
          Added {item?.name} to your workspace.
        </Alert>
      </Snackbar>
    </>
  )
}
