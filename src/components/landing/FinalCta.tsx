import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useScrollReveal } from '@/lib/useScrollReveal'

export function FinalCta() {
  const { ref, visible } = useScrollReveal()

  return (
    <Box
      ref={ref}
      sx={(t) => ({
        textAlign: 'center',
        py: 5,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity ${t.tokens.motion.duration.long}ms ${t.tokens.motion.easing.standard}, transform ${t.tokens.motion.duration.long}ms ${t.tokens.motion.easing.standard}`,
      })}
    >
      <Typography variant="h5" sx={{ mb: 1 }}>
        Not sure where to start?
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Read the getting-started guide or reach out to the team on{' '}
        <strong>#oae-help</strong>.
      </Typography>
      <Button
        component={RouterLink}
        to="/docs"
        variant="contained"
        size="large"
      >
        Open the documentation
      </Button>
    </Box>
  )
}
