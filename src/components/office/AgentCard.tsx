import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import CloseOutlined from '@mui/icons-material/CloseOutlined'
import EmailOutlined from '@mui/icons-material/EmailOutlined'
import type { OfficeAgent, OfficeStatus } from '@/types'

const statusLabel: Record<OfficeStatus, string> = {
  idle: 'Available',
  working: 'Working',
  reviewing: 'In review',
  blocked: 'Blocked',
  away: 'Away',
}

const statusColor: Record<OfficeStatus, 'success' | 'info' | 'warning' | 'error' | 'default'> = {
  idle: 'success',
  working: 'info',
  reviewing: 'info',
  blocked: 'error',
  away: 'default',
}

interface AgentCardProps {
  agent: OfficeAgent
  onClose: () => void
  style?: React.CSSProperties
}

export function AgentCard({ agent, onClose, style }: AgentCardProps) {
  return (
    <Card
      sx={(t) => ({
        position: 'absolute',
        zIndex: 10,
        p: 2,
        width: 280,
        boxShadow: t.tokens.elevation.level3,
      })}
      style={style}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="subtitle1">{agent.name}</Typography>
          <Typography variant="caption" color="text.secondary">
            {agent.role}
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose} aria-label="Close">
          <CloseOutlined fontSize="small" />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, mb: 1 }}>
        <Chip
          label={statusLabel[agent.status]}
          color={statusColor[agent.status]}
          size="small"
          variant="outlined"
        />
        <Typography variant="body2" color="text.secondary">
          {agent.squad} squad
        </Typography>
      </Box>
      {agent.currentTask && (
        <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1 }}>
          {agent.currentTask}
        </Typography>
      )}
      {agent.contact && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <EmailOutlined sx={{ fontSize: 16 }} color="action" />
          <Typography variant="caption" color="text.secondary">
            {agent.contact}
          </Typography>
        </Box>
      )}
    </Card>
  )
}
