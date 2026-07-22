import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { officeAgents } from '@/data/office-agents'
import type { OfficeStatus } from '@/types'

const statusLabel: Record<OfficeStatus, string> = {
  idle: 'Available',
  working: 'Working',
  reviewing: 'In review',
  blocked: 'Blocked',
  away: 'Away',
}

const statusTone: Record<OfficeStatus, 'success' | 'info' | 'warning' | 'error' | 'default'> = {
  idle: 'success',
  working: 'info',
  reviewing: 'info',
  blocked: 'error',
  away: 'default',
}

export function OfficeCardGrid() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 2,
      }}
    >
      {officeAgents.map((agent) => (
        <Card key={agent.id} variant="outlined" sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Box>
              <Typography variant="subtitle1">{agent.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {agent.role}
              </Typography>
            </Box>
            <Chip
              label={statusLabel[agent.status]}
              color={statusTone[agent.status]}
              size="small"
              variant="outlined"
            />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            {agent.squad} squad
          </Typography>
          {agent.currentTask && (
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              {agent.currentTask}
            </Typography>
          )}
        </Card>
      ))}
    </Box>
  )
}
