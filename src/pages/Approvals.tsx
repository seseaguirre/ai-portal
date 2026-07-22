import { Navigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { PageHeader } from '@/components/ui/PageHeader'
import { SelfServiceTabs } from '@/components/selfservice/SelfServiceTabs'
import { ApprovalCard } from '@/components/selfservice/ApprovalCard'
import { useRequestStore } from '@/store/useRequestStore'
import { useActivePersona } from '@/lib/useActivePersona'

export function Approvals() {
  const persona = useActivePersona()
  const requests = useRequestStore((s) => s.requests)

  if (!persona?.canSeeInventory) {
    return <Navigate to="/self-service/requests" replace />
  }

  const pending = requests.filter(
    (request) =>
      request.state.status === 'submitted' ||
      request.state.status === 'in-review',
  )

  return (
    <Box>
      <SelfServiceTabs />
      <PageHeader
        title="Approvals"
        subtitle="Requests waiting for a decision. Approving or rejecting updates the requester’s view instantly."
      />
      {pending.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          Nothing is waiting for a decision right now.
        </Typography>
      ) : (
        <Stack spacing={2} sx={{ maxWidth: 720 }}>
          {pending.map((request) => (
            <ApprovalCard
              key={request.id}
              request={request}
              reviewer={persona.name}
            />
          ))}
        </Stack>
      )}
    </Box>
  )
}
