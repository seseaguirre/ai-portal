import Box from '@mui/material/Box'

interface CostSparklineProps {
  data: number[]
  width?: number
  height?: number
}

export function CostSparkline({ data, width = 180, height = 44 }: CostSparklineProps) {
  if (data.length < 2) return null

  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const stepX = width / (data.length - 1)

  const points = data
    .map((value, index) => {
      const x = index * stepX
      const y = height - ((value - min) / range) * height
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  return (
    <Box
      component="svg"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Monthly cost trend"
      sx={{ width, height, display: 'block' }}
    >
      <Box
        component="polyline"
        points={points}
        sx={(t) => ({
          fill: 'none',
          stroke: t.tokens.color.brand.accent,
          strokeWidth: 2,
          strokeLinejoin: 'round',
          strokeLinecap: 'round',
        })}
      />
    </Box>
  )
}
