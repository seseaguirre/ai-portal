import { NavLink, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import StorefrontOutlined from '@mui/icons-material/StorefrontOutlined'
import AutoFixHighOutlined from '@mui/icons-material/AutoFixHighOutlined'
import AccountTreeOutlined from '@mui/icons-material/AccountTreeOutlined'
import MenuBookOutlined from '@mui/icons-material/MenuBookOutlined'
import HelpOutlineOutlined from '@mui/icons-material/HelpOutlineOutlined'
import type { SvgIconComponent } from '@mui/icons-material'
import { useActivePersona } from '@/lib/useActivePersona'

interface NavItem {
  label: string
  to: string
  icon: SvgIconComponent
  oaeOnly?: boolean
}

const items: NavItem[] = [
  { label: 'Search', to: '/', icon: SearchOutlined },
  { label: 'Marketplace', to: '/marketplace', icon: StorefrontOutlined },
  { label: 'Self-service', to: '/self-service', icon: AutoFixHighOutlined },
  { label: 'Inventory', to: '/inventory', icon: AccountTreeOutlined, oaeOnly: true },
  { label: 'Docs', to: '/docs', icon: MenuBookOutlined },
  { label: 'Help', to: '/help', icon: HelpOutlineOutlined },
]

const isActive = (pathname: string, to: string) =>
  to === '/' ? pathname === '/' : pathname.startsWith(to)

function RailItem({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon
  return (
    <Tooltip title={item.label} placement="right">
      <Box
        component={NavLink}
        to={item.to}
        sx={(t) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
          py: 1,
          textDecoration: 'none',
          color: active
            ? t.tokens.color.brand.onPrimary
            : t.tokens.color.surface.onInverse,
          opacity: active ? 1 : 0.72,
          transitionProperty: 'opacity',
          transitionDuration: `${t.tokens.motion.duration.short}ms`,
          '&:hover': { opacity: 1 },
        })}
      >
        <Box
          sx={(t) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 56,
            height: 32,
            borderRadius: `${t.tokens.radii.pill}px`,
            backgroundColor: active
              ? t.tokens.color.brand.accent
              : 'transparent',
          })}
        >
          <Icon fontSize="small" />
        </Box>
        <Typography variant="caption" sx={{ fontWeight: 600 }}>
          {item.label}
        </Typography>
      </Box>
    </Tooltip>
  )
}

export function NavRail() {
  const persona = useActivePersona()
  const { pathname } = useLocation()
  const visible = items.filter((i) => !i.oaeOnly || persona?.canSeeInventory)

  return (
    <Box
      component="nav"
      aria-label="Primary"
      sx={(t) => ({
        width: 92,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        pt: 2,
        backgroundColor: t.tokens.color.surface.inverse,
      })}
    >
      {visible.map((item) => (
        <RailItem
          key={item.to}
          item={item}
          active={isActive(pathname, item.to)}
        />
      ))}
    </Box>
  )
}
