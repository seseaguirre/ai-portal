import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { DesignTokens } from '@/theme/tokens'
import type { OfficeStatus } from '@/types'

const entries: { status: OfficeStatus; label: string; meaning: string }[] = [
  { status: 'working', label: 'Working', meaning: 'Actively building or coding' },
  { status: 'reviewing', label: 'In review', meaning: 'Reviewing a pull request or design' },
  { status: 'blocked', label: 'Blocked', meaning: 'Waiting on something before they can continue' },
  { status: 'idle', label: 'Available', meaning: 'At their desk and free' },
  { status: 'away', label: 'Away', meaning: 'Not at their desk right now' },
]

function getDotColor(status: OfficeStatus, tokens: DesignTokens): string {
  switch (status) {
    case 'working':
    case 'reviewing':
      return tokens.color.status.info
    case 'blocked':
      return tokens.color.status.danger
    case 'idle':
      return tokens.color.status.certified
    case 'away':
      return tokens.color.text.disabled
  }
}

export function OfficeLegend() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 2, px: 1 }}>
      {entries.map((entry) => (
        <Box key={entry.status} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={(t) => ({
              width: 10,
              height: 10,
              borderRadius: `${t.tokens.radii.pill}px`,
              backgroundColor: getDotColor(entry.status, t.tokens),
              flexShrink: 0,
            })}
          />
          <Typography variant="caption">
            <strong>{entry.label}</strong> — {entry.meaning}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}
