import { useState, type MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import CheckOutlined from '@mui/icons-material/CheckOutlined'
import SwapHorizOutlined from '@mui/icons-material/SwapHorizOutlined'
import LogoutOutlined from '@mui/icons-material/LogoutOutlined'
import { personas } from '@/data/personas'
import { usePersonaStore } from '@/store/usePersonaStore'
import { useActivePersona } from '@/lib/useActivePersona'

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)

export function PersonaMenu() {
  const persona = useActivePersona()
  const switchPersona = usePersonaStore((s) => s.switchPersona)
  const signOut = usePersonaStore((s) => s.signOut)
  const navigate = useNavigate()
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const close = () => setAnchor(null)

  if (!persona) return null

  return (
    <>
      <Tooltip title="Account and demo persona">
        <IconButton
          aria-label="Account and demo persona"
          onClick={(e: MouseEvent<HTMLElement>) => setAnchor(e.currentTarget)}
        >
          <Avatar
            sx={(t) => ({
              width: 36,
              height: 36,
              bgcolor: t.tokens.color.brand.accent,
              color: t.tokens.color.text.onAccent,
              fontSize: t.tokens.typography.scale.label.fontSize,
            })}
          >
            {initials(persona.name)}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={close}
        slotProps={{ paper: { sx: { width: 320, maxWidth: '90vw' } } }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2">{persona.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {persona.roleLabel}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, pt: 1 }}>
          <SwapHorizOutlined fontSize="small" color="primary" />
          <Typography variant="overline" color="text.secondary">
            Demo: switch persona
          </Typography>
        </Box>
        {personas.map((p) => (
          <MenuItem
            key={p.id}
            selected={p.id === persona.id}
            onClick={() => {
              switchPersona(p.id)
              close()
            }}
          >
            <ListItemIcon>
              {p.id === persona.id && <CheckOutlined fontSize="small" />}
            </ListItemIcon>
            <ListItemText primary={p.roleLabel} secondary={p.description} />
          </MenuItem>
        ))}
        <Divider />
        <MenuItem
          onClick={() => {
            signOut()
            navigate('/login')
          }}
        >
          <ListItemIcon>
            <LogoutOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Sign out" />
        </MenuItem>
      </Menu>
    </>
  )
}
