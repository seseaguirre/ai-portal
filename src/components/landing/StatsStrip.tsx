import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useLandingStats } from '@/lib/useLandingStats'
import { useScrollReveal } from '@/lib/useScrollReveal'

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setValue(target)
      return
    }
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, active, duration])

  return value
}

interface StatProps {
  value: number
  label: string
  active: boolean
  delay: number
}

function StatTile({ value, label, active, delay }: StatProps) {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!active) return
    const id = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(id)
  }, [active, delay])

  const displayed = useCountUp(value, started)

  return (
    <Box sx={{ textAlign: 'center', flex: 1, minWidth: 120 }}>
      <Typography
        variant="h3"
        sx={(t) => ({ color: t.tokens.color.brand.accent, fontWeight: t.tokens.typography.weight.bold })}
      >
        {displayed.toLocaleString('en-US')}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
  )
}

export function StatsStrip() {
  const stats = useLandingStats()
  const { ref, visible } = useScrollReveal()

  const items = [
    { value: stats.skills, label: 'Skills published' },
    { value: stats.mcpServers, label: 'MCP servers available' },
    { value: stats.employeesOnboarded, label: 'Employees using AI tools' },
    { value: stats.requestsFulfilled, label: 'Requests fulfilled' },
  ]

  return (
    <Box
      ref={ref}
      sx={(t) => ({
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        py: 4,
        px: 2,
        borderRadius: `${t.tokens.radii.lg}px`,
        backgroundColor: t.tokens.color.surface.raised,
        boxShadow: t.tokens.elevation.level1,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity ${t.tokens.motion.duration.long}ms ${t.tokens.motion.easing.standard}, transform ${t.tokens.motion.duration.long}ms ${t.tokens.motion.easing.standard}`,
      })}
    >
      {items.map((item, i) => (
        <StatTile key={item.label} {...item} active={visible} delay={i * 150} />
      ))}
    </Box>
  )
}
