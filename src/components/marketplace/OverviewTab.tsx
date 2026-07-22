import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline'
import ReportProblemOutlined from '@mui/icons-material/ReportProblemOutlined'
import ForumOutlined from '@mui/icons-material/ForumOutlined'
import type { MarketplaceItem, Permission } from '@/types'

function PermissionRow({ permission }: { permission: Permission }) {
  const Icon = permission.broad ? ReportProblemOutlined : CheckCircleOutline
  return (
    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
      <Icon
        fontSize="small"
        sx={(t) => ({
          mt: 0.25,
          color: permission.broad
            ? t.tokens.color.status.pending
            : t.tokens.color.status.certified,
        })}
      />
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {permission.scope}
          {permission.broad && ' · broad scope'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {permission.description}
        </Typography>
      </Box>
    </Box>
  )
}

export function OverviewTab({ item }: { item: MarketplaceItem }) {
  return (
    <Box>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {item.overview}
      </Typography>

      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        What it can do
      </Typography>
      <Box component="ul" sx={{ pl: 2.5, mt: 0, mb: 2 }}>
        {item.capabilities.map((capability) => (
          <li key={capability}>
            <Typography variant="body2">{capability}</Typography>
          </li>
        ))}
      </Box>

      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Permissions requested
      </Typography>
      {item.permissions.map((permission) => (
        <PermissionRow key={permission.scope} permission={permission} />
      ))}

      <Divider sx={{ my: 2 }} />
      <Typography variant="body2" sx={{ mb: 0.5 }}>
        <strong>Owner:</strong> {item.supportOwner}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
        <ForumOutlined fontSize="small" color="primary" />
        <Typography variant="body2">{item.supportChannel}</Typography>
      </Box>

      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Changelog
      </Typography>
      {item.changelog.map((entry) => (
        <Typography key={entry.version} variant="body2" color="text.secondary">
          {entry.version} · {entry.date} — {entry.note}
        </Typography>
      ))}
    </Box>
  )
}
