import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { NavRail } from './NavRail'
import { TopBar } from './TopBar'

function Footer() {
  return (
    <Box
      component="footer"
      sx={(t) => ({
        borderTop: 1,
        borderColor: t.tokens.color.border.subtle,
        px: { xs: 2, md: 4 },
        py: 2,
        mt: 4,
      })}
    >
      <Typography variant="caption" color="text.secondary">
        Run by the AI Ecosystem team — AI, Data & Architecture · Internal use
        only · Ørsted A/S
      </Typography>
    </Box>
  )
}

export function AppShell() {
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <NavRail />
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <TopBar />
        <Box component="main" sx={{ flex: 1, overflowY: 'auto' }}>
          <Box
            sx={{
              maxWidth: 1440,
              width: '100%',
              mx: 'auto',
              px: { xs: 2, md: 4 },
              py: 3,
            }}
          >
            <Outlet />
          </Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  )
}
