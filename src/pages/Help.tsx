import { useNavigate, Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import StorefrontOutlined from '@mui/icons-material/StorefrontOutlined'
import AutoFixHighOutlined from '@mui/icons-material/AutoFixHighOutlined'
import type { SvgIconComponent } from '@mui/icons-material'
import { PageHeader } from '@/components/ui/PageHeader'

interface Task {
  title: string
  description: string
  to: string
  icon: SvgIconComponent
}

const tasks: Task[] = [
  {
    title: 'Ask a question',
    description: 'Get a plain-language answer with links to the right docs and tools.',
    to: '/',
    icon: SearchOutlined,
  },
  {
    title: 'Find an approved tool',
    description: 'Browse the Marketplace and filter by what you need.',
    to: '/marketplace',
    icon: StorefrontOutlined,
  },
  {
    title: 'Request access',
    description: 'Start a governed request for a tool, model, or connection.',
    to: '/self-service',
    icon: AutoFixHighOutlined,
  },
]

const channels = [
  { name: 'General questions', channel: '#oae-help' },
  { name: 'Marketplace & publishing', channel: '#oae-community' },
  { name: 'Responsible AI & governance', channel: '#oae-responsible-ai' },
]

export function Help() {
  const navigate = useNavigate()

  return (
    <Box>
      <PageHeader
        title="Help"
        subtitle="Not sure where to start? Here are the most common things people do — and where to get support."
      />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          gap: 2,
          mb: 4,
          maxWidth: 960,
        }}
      >
        {tasks.map((task) => {
          const Icon = task.icon
          return (
            <Card key={task.to}>
              <CardActionArea sx={{ p: 3, height: '100%' }} onClick={() => navigate(task.to)}>
                <Icon color="primary" sx={{ mb: 1 }} />
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {task.description}
                </Typography>
              </CardActionArea>
            </Card>
          )
        })}
      </Box>

      <Typography variant="h5" sx={{ mb: 1 }}>
        Support channels
      </Typography>
      {channels.map((item) => (
        <Typography key={item.channel} variant="body1" sx={{ mb: 0.5 }}>
          {item.name} — <strong>{item.channel}</strong>
        </Typography>
      ))}
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        You can also read the{' '}
        <Link component={RouterLink} to="/docs">
          documentation
        </Link>{' '}
        for step-by-step guides.
      </Typography>
    </Box>
  )
}
