import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline'
import { StepChoose } from './StepChoose'
import { StepConfigure } from './StepConfigure'
import { StepGovernance } from './StepGovernance'
import { StepReview } from './StepReview'
import { blankForm, isStepValid, stepLabels, type RequestForm } from './requestForm'
import { useRequestStore } from '@/store/useRequestStore'
import { useActivePersona } from '@/lib/useActivePersona'
import type { ProvisioningRequest, RequestKind } from '@/types'

function SuccessScreen({
  request,
  onNew,
}: {
  request: ProvisioningRequest
  onNew: () => void
}) {
  return (
    <Card sx={{ p: 4, maxWidth: 560, textAlign: 'center', mx: 'auto' }}>
      <CheckCircleOutline color="success" sx={{ fontSize: 48, mb: 1 }} />
      <Typography variant="h4" sx={{ mb: 1 }}>
        Request submitted
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
        Your request <strong>{request.id}</strong> is now with the ØAE team.
        We’ll review it and you’ll see the status update as it progresses.
      </Typography>
      <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', mt: 3 }}>
        <Button variant="contained" component={RouterLink} to="/self-service/requests">
          View my requests
        </Button>
        <Button onClick={onNew}>Make another request</Button>
      </Box>
    </Card>
  )
}

export function RequestStepper({
  kind,
  onCancel,
}: {
  kind: RequestKind
  onCancel: () => void
}) {
  const persona = useActivePersona()
  const createRequest = useRequestStore((s) => s.createRequest)
  const [form, setForm] = useState<RequestForm>(blankForm(kind))
  const [activeStep, setActiveStep] = useState(0)
  const [created, setCreated] = useState<ProvisioningRequest | null>(null)
  const technical = Boolean(persona?.technical)
  const patch = (next: Partial<RequestForm>) =>
    setForm((prev) => ({ ...prev, ...next }))

  if (created) return <SuccessScreen request={created} onNew={onCancel} />

  const submit = () => {
    const isMcp = kind === 'mcp' && technical
    const hasRepo = kind === 'transformer' || kind === 'assessor'
    setCreated(
      createRequest({
        kind: form.kind,
        name: form.name,
        purpose: form.purpose,
        owningTeam: form.owningTeam,
        environment: form.environment,
        dataClass: form.dataClass,
        transport: isMcp ? form.transport : undefined,
        targetSystem: isMcp && form.targetSystem ? form.targetSystem : undefined,
        repoUrl: hasRepo && form.repoUrl ? form.repoUrl : undefined,
        requestedBy: persona?.name ?? 'You',
      }),
    )
  }

  return (
    <Box>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {stepLabels.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mb: 4 }}>
        {activeStep === 0 && <StepChoose form={form} onChange={patch} />}
        {activeStep === 1 && (
          <StepConfigure form={form} onChange={patch} technical={technical} />
        )}
        {activeStep === 2 && <StepGovernance form={form} onChange={patch} />}
        {activeStep === 3 && <StepReview form={form} />}
      </Box>

      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <Button
          onClick={
            activeStep === 0 ? onCancel : () => setActiveStep((s) => s - 1)
          }
        >
          {activeStep === 0 ? 'Cancel' : 'Back'}
        </Button>
        {activeStep < 3 ? (
          <Button
            variant="contained"
            disabled={!isStepValid(form, activeStep)}
            onClick={() => setActiveStep((s) => s + 1)}
          >
            Continue
          </Button>
        ) : (
          <Button variant="contained" onClick={submit}>
            Submit request
          </Button>
        )}
      </Box>
    </Box>
  )
}
