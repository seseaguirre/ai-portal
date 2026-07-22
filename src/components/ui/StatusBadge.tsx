import Chip from '@mui/material/Chip'
import type { Theme } from '@mui/material/styles'
import type { BadgeTone } from '@/lib/status'

const toneColors = (t: Theme, tone: BadgeTone): { fg: string; bg: string } => {
  const s = t.tokens.color.status
  const map: Record<BadgeTone, { fg: string; bg: string }> = {
    certified: { fg: s.certified, bg: s.certifiedSurface },
    sandbox: { fg: s.sandbox, bg: s.sandboxSurface },
    pending: { fg: s.pending, bg: s.pendingSurface },
    deprecated: { fg: s.deprecated, bg: s.deprecatedSurface },
    info: { fg: s.info, bg: s.infoSurface },
    danger: { fg: s.danger, bg: s.dangerSurface },
    neutral: {
      fg: t.tokens.color.text.secondary,
      bg: t.tokens.color.surface.sunken,
    },
  }
  return map[tone]
}

interface StatusBadgeProps {
  label: string
  tone: BadgeTone
  size?: 'small' | 'medium'
}

export function StatusBadge({ label, tone, size = 'small' }: StatusBadgeProps) {
  return (
    <Chip
      label={label}
      size={size}
      sx={(t) => {
        const c = toneColors(t, tone)
        return {
          color: c.fg,
          backgroundColor: c.bg,
          fontWeight: t.tokens.typography.weight.semibold,
        }
      }}
    />
  )
}
