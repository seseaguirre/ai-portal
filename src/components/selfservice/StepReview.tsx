import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { RequestForm } from './requestForm'
import {
  dataClassLabel,
  environmentLabel,
  requestKindLabel,
} from '@/lib/labels'

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: 'flex', gap: 2, py: 0.75 }}>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ width: 180, flexShrink: 0 }}
      >
        {label}
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  )
}

export function StepReview({ form }: { form: RequestForm }) {
  const showMcp = form.kind === 'mcp' && form.targetSystem.trim() !== ''

  return (
    <Box sx={{ maxWidth: 620 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Please check the details before you submit.
      </Typography>
      <Row label="Type" value={requestKindLabel[form.kind]} />
      <Row label="Name" value={form.name} />
      <Row label="Purpose" value={form.purpose} />
      <Row label="Owning team" value={form.owningTeam} />
      <Row label="Environment" value={environmentLabel[form.environment]} />
      <Row label="Data classification" value={dataClassLabel[form.dataClass]} />
      {showMcp && <Row label="Transport" value={form.transport} />}
      {showMcp && <Row label="Target system" value={form.targetSystem} />}
      {form.repoUrl.trim() !== '' && <Row label="Repository" value={form.repoUrl} />}
    </Box>
  )
}
