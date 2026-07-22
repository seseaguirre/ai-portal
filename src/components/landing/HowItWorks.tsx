import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import VerifiedUserOutlined from '@mui/icons-material/VerifiedUserOutlined'
import RocketLaunchOutlined from '@mui/icons-material/RocketLaunchOutlined'
import { useScrollReveal } from '@/lib/useScrollReveal'

const steps = [
  {
    number: '1',
    title: 'Find what you need',
    description: 'Search or browse the Marketplace for approved AI tools and skills.',
    icon: <SearchOutlined color="primary" />,
  },
  {
    number: '2',
    title: 'Request access',
    description: 'Submit a governed request — the portal routes it for review and approval.',
    icon: <VerifiedUserOutlined color="primary" />,
  },
  {
    number: '3',
    title: 'Start using it',
    description: 'Once approved, connect the tool to your workspace and get going.',
    icon: <RocketLaunchOutlined color="primary" />,
  },
]

export function HowItWorks() {
  const { ref, visible } = useScrollReveal()

  return (
    <Box ref={ref}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        How it works
      </Typography>
      <Box
        sx={(t) => ({
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 3,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: `opacity ${t.tokens.motion.duration.long}ms ${t.tokens.motion.easing.standard}, transform ${t.tokens.motion.duration.long}ms ${t.tokens.motion.easing.standard}`,
        })}
      >
        {steps.map((step) => (
          <Box key={step.number} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Box
              sx={(t) => ({
                width: 40,
                height: 40,
                borderRadius: `${t.tokens.radii.pill}px`,
                backgroundColor: t.tokens.color.brand.accentSoft,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              })}
            >
              {step.icon}
            </Box>
            <Box>
              <Typography variant="subtitle1">{step.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {step.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
