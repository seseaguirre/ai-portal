import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface PageHeaderProps {
  title: string
  subtitle?: string
  action?: ReactNode
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 2,
        mb: 3,
        flexWrap: 'wrap',
      }}
    >
      <Box>
        <Typography variant="h3" component="h1">
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 0.5, maxWidth: 720 }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
      {action}
    </Box>
  )
}
