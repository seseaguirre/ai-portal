import Box from '@mui/material/Box'
import { Hero } from '@/components/landing/Hero'
import { StatsStrip } from '@/components/landing/StatsStrip'
import { BentoGrid } from '@/components/landing/BentoGrid'
import { MeetOae } from '@/components/landing/MeetOae'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { FinalCta } from '@/components/landing/FinalCta'

export function Landing() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <Hero />
      <StatsStrip />
      <BentoGrid />
      <MeetOae />
      <HowItWorks />
      <FinalCta />
    </Box>
  )
}
