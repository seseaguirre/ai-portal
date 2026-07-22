import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { TechnicalDetail } from '@/types'

export function TechnicalTab({ detail }: { detail: TechnicalDetail }) {
  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 0.5 }}>
        <strong>Endpoint:</strong> {detail.endpoint}
      </Typography>
      <Typography variant="body2" sx={{ mb: 0.5 }}>
        <strong>Transport:</strong> {detail.transport}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        <strong>Version:</strong> {detail.version}
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Config snippet
      </Typography>
      <Box
        component="pre"
        sx={(t) => ({
          m: 0,
          p: 2,
          borderRadius: `${t.tokens.radii.sm}px`,
          backgroundColor: t.tokens.color.surface.sunken,
          fontSize: t.tokens.typography.scale.bodySmall.fontSize,
          overflowX: 'auto',
        })}
      >
        {detail.configSnippet}
      </Box>
    </Box>
  )
}
