import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { SearchBar } from '@/components/search/SearchBar'
import { exampleQuestions } from '@/lib/searchMatch'
import { useScrollReveal } from '@/lib/useScrollReveal'

const suggested = exampleQuestions.slice(0, 5)

export function Hero() {
  const navigate = useNavigate()
  const { ref, visible } = useScrollReveal()
  const [placeholderIndex, setPlaceholderIndex] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const id = window.setInterval(
      () => setPlaceholderIndex((i) => (i + 1) % suggested.length),
      3200,
    )
    return () => window.clearInterval(id)
  }, [])

  const handleSubmit = (value: string) => {
    if (value.trim()) navigate(`/search?q=${encodeURIComponent(value.trim())}`)
  }

  return (
    <Box
      ref={ref}
      sx={(t) => ({
        position: 'relative',
        py: { xs: 6, md: 10 },
        px: 2,
        textAlign: 'center',
        borderRadius: `${t.tokens.radii.xl}px`,
        backgroundImage: `radial-gradient(80% 90% at 20% -10%, ${t.tokens.color.brand.accent}, transparent 60%), linear-gradient(160deg, ${t.tokens.color.brand.primaryStrong}, ${t.tokens.color.brand.primary})`,
        overflow: 'hidden',
      })}
    >
      {/* Frosted-glass panel — used here and nowhere else */}
      <Box
        sx={(t) => ({
          maxWidth: 760,
          mx: 'auto',
          p: { xs: 3, md: 5 },
          borderRadius: `${t.tokens.radii.xl}px`,
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: `opacity ${t.tokens.motion.duration.long}ms ${t.tokens.motion.easing.standard}, transform ${t.tokens.motion.duration.long}ms ${t.tokens.motion.easing.standard}`,
        })}
      >
        <Typography
          variant="overline"
          sx={(t) => ({ color: t.tokens.color.brand.accentSoft })}
        >
          Ørsted AI Ecosystem
        </Typography>
        <Typography
          variant="h2"
          sx={(t) => ({
            mt: 1,
            mb: 1.5,
            color: t.tokens.color.surface.onInverse,
          })}
        >
          Find, request, and build with approved AI at Ørsted
        </Typography>
        <Typography
          variant="body1"
          sx={(t) => ({
            mb: 4,
            color: t.tokens.color.brand.accentSoft,
            opacity: 0.85,
          })}
        >
          The portal answers your questions and points you to approved tools,
          documentation, and self-service workflows. Run by the ØAE team.
        </Typography>

        <SearchBar
          onSubmit={handleSubmit}
          large
          withUnderline
          placeholder={suggested[placeholderIndex]}
        />

        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          flexWrap="wrap"
          justifyContent="center"
          sx={{ mt: 3 }}
        >
          {suggested.map((question) => (
            <Chip
              key={question}
              label={question}
              variant="outlined"
              onClick={() => handleSubmit(question)}
              sx={(t) => ({
                cursor: 'pointer',
                color: t.tokens.color.surface.onInverse,
                borderColor: 'rgba(255, 255, 255, 0.3)',
                '&:hover': { borderColor: 'rgba(255, 255, 255, 0.6)' },
              })}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
