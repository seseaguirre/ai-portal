import Box from '@mui/material/Box'
import { keyframes } from '@emotion/react'

const flow = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`

/**
 * The portal's signature motif: a thin animated gradient line evoking wind and
 * energy flow. Decorative only (aria-hidden) and stilled under
 * prefers-reduced-motion.
 */
export function EnergyFlowUnderline() {
  return (
    <Box
      aria-hidden
      sx={(t) => ({
        height: 3,
        borderRadius: t.tokens.radii.pill,
        backgroundImage: `linear-gradient(90deg, ${t.tokens.color.brand.accentSoft}, ${t.tokens.color.brand.accent}, ${t.tokens.color.brand.primary}, ${t.tokens.color.brand.accent}, ${t.tokens.color.brand.accentSoft})`,
        backgroundSize: '200% 100%',
        animation: `${flow} ${t.tokens.motion.duration.flow}ms ${t.tokens.motion.easing.standard} infinite`,
        '@media (prefers-reduced-motion: reduce)': {
          animation: 'none',
          backgroundPosition: '50% 50%',
        },
      })}
    />
  )
}
