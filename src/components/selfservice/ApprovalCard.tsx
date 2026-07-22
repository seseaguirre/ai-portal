import { useState } from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { requestStatusBadge } from '@/lib/status'
import {
  requestKindLabel,
  environmentLabel,
  dataClassLabel,
} from '@/lib/labels'
import { useRequestStore } from '@/store/useRequestStore'
import type { ProvisioningRequest } from '@/types'

interface ApprovalCardProps {
  request: ProvisioningRequest
  reviewer: string
}

export function ApprovalCard({ request, reviewer }: ApprovalCardProps) {
  const approveRequest = useRequestStore((s) => s.approveRequest)
  const rejectRequest = useRequestStore((s) => s.rejectRequest)
  const [comment, setComment] = useState('')

  return (
    <Card sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
        <Typography variant="h6">{request.name}</Typography>
        <StatusBadge {...requestStatusBadge(request.state.status)} />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        {request.id} · {requestKindLabel[request.kind]} · {request.owningTeam} ·{' '}
        {environmentLabel[request.environment]} ·{' '}
        {dataClassLabel[request.dataClass]}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {request.purpose}
      </Typography>

      {request.dataClass === 'confidential' && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Confidential — confirm the security review is complete before
          approving.
        </Alert>
      )}

      <TextField
        fullWidth
        size="small"
        label="Comment (required to reject)"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <Button
          variant="contained"
          onClick={() => approveRequest(request.id, reviewer)}
        >
          Approve
        </Button>
        <Button
          variant="outlined"
          color="error"
          disabled={comment.trim() === ''}
          onClick={() => rejectRequest(request.id, reviewer, comment.trim())}
        >
          Reject
        </Button>
      </Box>
    </Card>
  )
}
