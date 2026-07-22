import { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'
import LanOutlined from '@mui/icons-material/LanOutlined'
import AutoAwesomeOutlined from '@mui/icons-material/AutoAwesomeOutlined'
import WorkspacesOutlined from '@mui/icons-material/WorkspacesOutlined'
import PsychologyOutlined from '@mui/icons-material/PsychologyOutlined'
import type { SvgIconComponent } from '@mui/icons-material'
import { PageHeader } from '@/components/ui/PageHeader'
import { SelfServiceTabs } from '@/components/selfservice/SelfServiceTabs'
import { RequestStepper } from '@/components/selfservice/RequestStepper'
import type { RequestKind } from '@/types'

interface EntryOption {
  kind: RequestKind
  title: string
  description: string
  icon: SvgIconComponent
}

const options: EntryOption[] = [
  {
    kind: 'mcp',
    title: 'MCP server',
    description: 'Connect an approved assistant to a system like SAP or SharePoint.',
    icon: LanOutlined,
  },
  {
    kind: 'skill',
    title: 'Skill',
    description: 'A focused capability, such as summarizing or translating.',
    icon: AutoAwesomeOutlined,
  },
  {
    kind: 'agent-workspace',
    title: 'Agent workspace',
    description: 'A shared space for a team to run and supervise an agent.',
    icon: WorkspacesOutlined,
  },
  {
    kind: 'model-access',
    title: 'AI model access',
    description: 'Access to an approved AI model for your use case.',
    icon: PsychologyOutlined,
  },
]

export function SelfService() {
  const [kind, setKind] = useState<RequestKind | null>(null)

  return (
    <Box>
      <SelfServiceTabs />
      <PageHeader
        title={kind ? 'New request' : 'What do you need?'}
        subtitle={
          kind
            ? 'Four short steps. We’ll tell you if anything needs an extra review.'
            : 'Start a governed request. Everything you set up here is reviewed and logged.'
        }
      />
      {kind ? (
        <RequestStepper kind={kind} onCancel={() => setKind(null)} />
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 2,
            maxWidth: 760,
          }}
        >
          {options.map((option) => {
            const Icon = option.icon
            return (
              <Card key={option.kind}>
                <CardActionArea sx={{ p: 3 }} onClick={() => setKind(option.kind)}>
                  <Icon color="primary" sx={{ mb: 1 }} />
                  <Typography variant="h6">{option.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {option.description}
                  </Typography>
                </CardActionArea>
              </Card>
            )
          })}
        </Box>
      )}
    </Box>
  )
}
