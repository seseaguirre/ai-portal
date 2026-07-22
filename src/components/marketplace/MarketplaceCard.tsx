import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import { TypeIcon } from '@/components/ui/TypeIcon'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { maturityBadge } from '@/lib/status'
import { assetTypeLabel } from '@/lib/labels'
import { formatRating } from '@/lib/format'
import type { MarketplaceItem } from '@/types'

export function MarketplaceCard({ item }: { item: MarketplaceItem }) {
  const navigate = useNavigate()
  const badge = maturityBadge(item.maturity)

  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea
        onClick={() => navigate(`/marketplace/${item.id}`)}
        sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1,
          }}
        >
          <TypeIcon kind={item.type} color="primary" />
          <StatusBadge label={badge.label} tone={badge.tone} />
        </Box>
        <Typography variant="subtitle1">{item.name}</Typography>
        <Typography variant="caption" color="text.secondary">
          {assetTypeLabel[item.type]} · {item.squad}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 1,
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {item.summary}
        </Typography>
        <Box
          sx={{
            mt: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {item.installs.toLocaleString('en-US')} in use
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Rating value={item.rating} precision={0.1} size="small" readOnly />
            <Typography variant="caption" color="text.secondary">
              {formatRating(item.rating)}
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  )
}
