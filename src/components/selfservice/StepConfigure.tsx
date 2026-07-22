import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Alert from '@mui/material/Alert'
import type { RequestForm } from './requestForm'
import type { DataClass, Environment } from '@/types'
import { dataClassLabel, environmentLabel } from '@/lib/labels'

const environments: Environment[] = ['sandbox', 'dev', 'prod']
const dataClasses: DataClass[] = ['public', 'internal', 'confidential']
const transports = ['HTTP + SSE', 'stdio', 'WebSocket']

interface StepConfigureProps {
  form: RequestForm
  onChange: (patch: Partial<RequestForm>) => void
  technical: boolean
}

export function StepConfigure({ form, onChange, technical }: StepConfigureProps) {
  const showMcpFields = technical && form.kind === 'mcp'

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, maxWidth: 560 }}>
      {!technical && (
        <Alert severity="info">
          We’ve set sensible defaults for the technical options. You can change
          the environment and data classification below.
        </Alert>
      )}
      <TextField
        select
        label="Environment"
        helperText="Sandbox is best while you try things out."
        value={form.environment}
        onChange={(event) =>
          onChange({ environment: event.target.value as Environment })
        }
        fullWidth
      >
        {environments.map((value) => (
          <MenuItem key={value} value={value}>
            {environmentLabel[value]}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Data classification"
        helperText="Pick the most sensitive data this will touch."
        value={form.dataClass}
        onChange={(event) =>
          onChange({ dataClass: event.target.value as DataClass })
        }
        fullWidth
      >
        {dataClasses.map((value) => (
          <MenuItem key={value} value={value}>
            {dataClassLabel[value]}
          </MenuItem>
        ))}
      </TextField>

      {showMcpFields && (
        <>
          <TextField
            select
            label="Transport"
            value={form.transport}
            onChange={(event) => onChange({ transport: event.target.value })}
            fullWidth
          >
            {transports.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Target system"
            placeholder="e.g. SAP Ariba, SharePoint, SCADA"
            value={form.targetSystem}
            onChange={(event) => onChange({ targetSystem: event.target.value })}
            fullWidth
          />
        </>
      )}
    </Box>
  )
}
