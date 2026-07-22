import { lazy, Suspense } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { OfficeCardGrid } from '@/components/office/OfficeCardGrid'
import { OfficeLegend } from '@/components/office/OfficeLegend'
import { PixiErrorBoundary } from '@/components/office/PixiErrorBoundary'
import { useScrollReveal } from '@/lib/useScrollReveal'

const PixelOffice = lazy(() =>
  import('@/components/office/PixelOffice').then((m) => ({ default: m.PixelOffice })),
)

function LoadingFallback() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
      <CircularProgress size={32} />
    </Box>
  )
}

export function MeetOae() {
  const { ref, visible } = useScrollReveal()

  return (
    <Box
      ref={ref}
      sx={(t) => ({
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity ${t.tokens.motion.duration.long}ms ${t.tokens.motion.easing.standard}, transform ${t.tokens.motion.duration.long}ms ${t.tokens.motion.easing.standard}`,
      })}
    >
      <Typography variant="h4" sx={{ mb: 1 }}>
        Meet ØAE
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        The people behind the AI Ecosystem platform. Click a sprite to learn
        what they work on.
      </Typography>
      <PixiErrorBoundary fallback={<OfficeCardGrid />}>
        <Suspense fallback={<LoadingFallback />}>
          <PixelOffice />
        </Suspense>
      </PixiErrorBoundary>
      <OfficeLegend />
    </Box>
  )
}
