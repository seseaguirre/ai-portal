import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import { NotificationsMenu } from './NotificationsMenu'
import { PersonaMenu } from './PersonaMenu'

export function TopBar() {
  const navigate = useNavigate()

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={(t) => ({
        backgroundColor: t.tokens.color.surface.raised,
        color: t.tokens.color.text.primary,
        borderBottom: 1,
        borderColor: t.tokens.color.border.subtle,
      })}
    >
      <Toolbar sx={{ gap: 2 }}>
        <Box
          component="button"
          onClick={() => navigate('/')}
          aria-label="ØAE Portal home"
          sx={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            p: 0,
            display: 'flex',
            alignItems: 'baseline',
            gap: 0.5,
          }}
        >
          <Typography variant="h5" component="span" sx={{ color: 'primary.main' }}>
            ØAE
          </Typography>
          <Typography variant="h5" component="span">
            Portal
          </Typography>
        </Box>

        <Button
          onClick={() => navigate('/')}
          startIcon={<SearchOutlined />}
          variant="outlined"
          color="inherit"
          sx={(t) => ({
            ml: 2,
            justifyContent: 'flex-start',
            color: t.tokens.color.text.secondary,
            borderColor: t.tokens.color.border.subtle,
            backgroundColor: t.tokens.color.surface.base,
            textTransform: 'none',
            minWidth: 280,
            display: { xs: 'none', md: 'inline-flex' },
          })}
        >
          Ask the ØAE Portal…
        </Button>

        <Box sx={{ flexGrow: 1 }} />
        <NotificationsMenu />
        <PersonaMenu />
      </Toolbar>
    </AppBar>
  )
}
