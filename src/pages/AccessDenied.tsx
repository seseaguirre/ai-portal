import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import LockOutlined from '@mui/icons-material/LockOutlined'

export function AccessDenied() {
  const [requested, setRequested] = useState(false)

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', pt: { xs: 4, md: 8 } }}>
      <Card sx={{ p: 4, maxWidth: 520, textAlign: 'center' }}>
        <LockOutlined color="primary" sx={{ fontSize: 44, mb: 1 }} />
        <Typography variant="h4" sx={{ mb: 1 }}>
          AI Inventory is for the ØAE team
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
          This page is the governance control tower — a full register of every AI
          asset, its risk tier, cost, and compliance status. Because it includes
          sensitive governance data, it’s limited to members of the AI Ecosystem
          team.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Demo tip: switch to the ØAE Member persona from the avatar menu to see
          it.
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center' }}>
          <Button variant="contained" onClick={() => setRequested(true)}>
            Request ØAE access
          </Button>
          <Button component={RouterLink} to="/">
            Back to search
          </Button>
        </Box>
      </Card>
      <Snackbar
        open={requested}
        autoHideDuration={3000}
        onClose={() => setRequested(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setRequested(false)}>
          Access request sent to the ØAE team.
        </Alert>
      </Snackbar>
    </Box>
  )
}
