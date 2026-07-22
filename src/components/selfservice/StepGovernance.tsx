import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Link from '@mui/material/Link'
import ShieldOutlined from '@mui/icons-material/ShieldOutlined'
import type { RequestForm } from './requestForm'

interface StepGovernanceProps {
  form: RequestForm
  onChange: (patch: Partial<RequestForm>) => void
}

export function StepGovernance({ form, onChange }: StepGovernanceProps) {
  const confidential = form.dataClass === 'confidential'
  const production = form.environment === 'prod'

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 620 }}>
      {confidential && (
        <Alert severity="warning">
          This request is classified <strong>Confidential</strong>, so a security
          review is required before it can be provisioned. We’ll route it to the
          right reviewers automatically — you don’t need to do anything now.
        </Alert>
      )}
      {production && (
        <Alert severity="info">
          Production requests go through a short readiness check so we can support
          them properly once live.
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 1 }}>
        <ShieldOutlined color="primary" fontSize="small" sx={{ mt: 0.25 }} />
        <Typography variant="body2" color="text.secondary">
          Every request is logged and auditable. Access is read-only by default
          and granted to your team, not shared beyond it.
        </Typography>
      </Box>

      <FormControlLabel
        control={
          <Checkbox
            checked={form.ackResponsibleAi}
            onChange={(event) =>
              onChange({ ackResponsibleAi: event.target.checked })
            }
          />
        }
        label={
          <Typography variant="body2">
            I’ve read the{' '}
            <Link component={RouterLink} to="/docs/responsible-ai">
              Responsible AI guidelines
            </Link>{' '}
            and confirm this use case follows them.
          </Typography>
        }
      />
    </Box>
  )
}
