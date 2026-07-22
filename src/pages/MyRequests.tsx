import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { PageHeader } from '@/components/ui/PageHeader'
import { SelfServiceTabs } from '@/components/selfservice/SelfServiceTabs'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { requestStatusBadge } from '@/lib/status'
import { requestKindLabel, environmentLabel, dataClassLabel } from '@/lib/labels'
import { useRequestStore } from '@/store/useRequestStore'
import type { ProvisioningRequest } from '@/types'

function StatusCell({ request }: { request: ProvisioningRequest }) {
  const badge = requestStatusBadge(request.state.status)
  if (request.state.status === 'rejected') {
    return (
      <Tooltip title={request.state.reason}>
        <span>
          <StatusBadge {...badge} />
        </span>
      </Tooltip>
    )
  }
  return <StatusBadge {...badge} />
}

export function MyRequests() {
  const requests = useRequestStore((s) => s.requests)

  return (
    <Box>
      <SelfServiceTabs />
      <PageHeader
        title="My requests"
        subtitle="Track your provisioning requests as they move from submitted to provisioned."
      />
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Request</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Environment</TableCell>
                <TableCell>Data class</TableCell>
                <TableCell>Submitted</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id} hover>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>{requestKindLabel[request.kind]}</TableCell>
                  <TableCell>{request.name}</TableCell>
                  <TableCell>{environmentLabel[request.environment]}</TableCell>
                  <TableCell>{dataClassLabel[request.dataClass]}</TableCell>
                  <TableCell>{request.submittedOn}</TableCell>
                  <TableCell>
                    <StatusCell request={request} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  )
}
