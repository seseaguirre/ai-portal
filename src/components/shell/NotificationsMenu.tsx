import { useState, type MouseEvent } from 'react'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Menu from '@mui/material/Menu'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import NotificationsNoneOutlined from '@mui/icons-material/NotificationsNoneOutlined'
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline'
import ScheduleOutlined from '@mui/icons-material/ScheduleOutlined'
import InfoOutlined from '@mui/icons-material/InfoOutlined'
import type { Theme } from '@mui/material/styles'
import { useNotificationStore } from '@/store/useNotificationStore'
import type { NotificationKind } from '@/types'

const kindIcon: Record<NotificationKind, typeof InfoOutlined> = {
  approved: CheckCircleOutline,
  pending: ScheduleOutlined,
  info: InfoOutlined,
}

const kindColor = (t: Theme, kind: NotificationKind): string =>
  ({
    approved: t.tokens.color.status.certified,
    pending: t.tokens.color.status.pending,
    info: t.tokens.color.status.info,
  })[kind]

export function NotificationsMenu() {
  const notifications = useNotificationStore((s) => s.notifications)
  const markAllRead = useNotificationStore((s) => s.markAllRead)
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const unread = notifications.filter((n) => !n.read).length

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          aria-label={`Notifications, ${unread} unread`}
          onClick={(e: MouseEvent<HTMLElement>) => setAnchor(e.currentTarget)}
        >
          <Badge badgeContent={unread} color="primary">
            <NotificationsNoneOutlined />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        slotProps={{ paper: { sx: { width: 380, maxWidth: '90vw' } } }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1,
          }}
        >
          <Typography variant="h6">Notifications</Typography>
          <Button size="small" onClick={markAllRead} disabled={unread === 0}>
            Mark all as read
          </Button>
        </Box>
        <Divider />
        {notifications.map((n) => {
          const Icon = kindIcon[n.kind]
          return (
            <Box
              key={n.id}
              sx={(t) => ({
                display: 'flex',
                gap: 1.5,
                px: 2,
                py: 1.5,
                backgroundColor: n.read
                  ? 'transparent'
                  : t.tokens.color.brand.accentSoft,
              })}
            >
              <Icon
                fontSize="small"
                sx={(t) => ({ color: kindColor(t, n.kind), mt: 0.25 })}
              />
              <Box>
                <Typography variant="subtitle2">{n.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {n.body}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {n.timeAgo}
                </Typography>
              </Box>
            </Box>
          )
        })}
      </Menu>
    </>
  )
}
