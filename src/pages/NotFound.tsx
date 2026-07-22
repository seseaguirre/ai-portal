import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export function NotFound() {
  return (
    <Box sx={{ textAlign: 'center', pt: { xs: 4, md: 8 } }}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        Page not found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        That page doesn’t exist. Try the search, or head back to the home page.
      </Typography>
      <Button component={RouterLink} to="/" variant="contained">
        Back to search
      </Button>
    </Box>
  )
}
