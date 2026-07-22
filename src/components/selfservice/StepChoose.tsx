import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import type { RequestForm } from './requestForm'
import { requestKindLabel } from '@/lib/labels'

interface StepChooseProps {
  form: RequestForm
  onChange: (patch: Partial<RequestForm>) => void
}

export function StepChoose({ form, onChange }: StepChooseProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, maxWidth: 560 }}>
      <TextField
        label="Name"
        placeholder={`e.g. ${requestKindLabel[form.kind]} for my team`}
        value={form.name}
        onChange={(event) => onChange({ name: event.target.value })}
        required
        fullWidth
      />
      <TextField
        label="What do you want to use it for?"
        helperText="A sentence or two in plain language. This helps us review your request."
        value={form.purpose}
        onChange={(event) => onChange({ purpose: event.target.value })}
        required
        fullWidth
        multiline
        minRows={3}
      />
      <TextField
        label="Owning team or squad"
        placeholder="e.g. Finance — Reporting"
        value={form.owningTeam}
        onChange={(event) => onChange({ owningTeam: event.target.value })}
        required
        fullWidth
      />
    </Box>
  )
}
