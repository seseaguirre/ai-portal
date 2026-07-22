import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import StorefrontOutlined from '@mui/icons-material/StorefrontOutlined'
import AutoFixHighOutlined from '@mui/icons-material/AutoFixHighOutlined'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import MenuBookOutlined from '@mui/icons-material/MenuBookOutlined'
import AccountTreeOutlined from '@mui/icons-material/AccountTreeOutlined'
import LockOutlined from '@mui/icons-material/LockOutlined'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { maturityBadge } from '@/lib/status'
import { marketplaceItems } from '@/data/marketplace'
import { useActivePersona } from '@/lib/useActivePersona'
import { useScrollReveal } from '@/lib/useScrollReveal'

const previewItems = marketplaceItems
  .filter((i) => i.maturity === 'certified')
  .slice(0, 3)

function MarketplacePreview() {
  const navigate = useNavigate()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1.5 }}>
      {previewItems.map((item) => {
        const badge = maturityBadge(item.maturity)
        return (
          <Card key={item.id} variant="outlined" sx={{ cursor: 'pointer' }} onClick={() => navigate(`/marketplace/${item.id}`)}>
            <Box sx={{ p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.name}</Typography>
                <Typography variant="caption" color="text.secondary">{item.squad}</Typography>
              </Box>
              <StatusBadge label={badge.label} tone={badge.tone} />
            </Box>
          </Card>
        )
      })}
    </Box>
  )
}

interface TileProps {
  title: string
  description: string
  icon: React.ReactNode
  to: string
  children?: React.ReactNode
  locked?: boolean
  lockLabel?: string
}

function BentoTile({ title, description, icon, to, children, locked, lockLabel }: TileProps) {
  const navigate = useNavigate()
  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea
        onClick={() => !locked && navigate(to)}
        disabled={locked}
        sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          {icon}
          {locked && <LockOutlined sx={{ fontSize: 16 }} color="disabled" />}
        </Box>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {description}
        </Typography>
        {locked && lockLabel && (
          <Chip label={lockLabel} size="small" variant="outlined" color="default" />
        )}
        {children}
      </CardActionArea>
    </Card>
  )
}

export function BentoGrid() {
  const persona = useActivePersona()
  const { ref, visible } = useScrollReveal()
  const canSeeInventory = persona?.canSeeInventory ?? false

  return (
    <Box ref={ref}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        What's inside
      </Typography>
      <Box
        sx={(t) => ({
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr', lg: '2fr 1fr 1fr' },
          gridTemplateRows: 'auto auto',
          gap: 2,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: `opacity ${t.tokens.motion.duration.long}ms ${t.tokens.motion.easing.standard}, transform ${t.tokens.motion.duration.long}ms ${t.tokens.motion.easing.standard}`,
        })}
      >
        {/* Large tile: Marketplace — spans 1 col, 2 rows on lg */}
        <Box sx={{ gridRow: { lg: '1 / 3' } }}>
          <BentoTile
            title="Marketplace"
            description="Browse approved AI tools, skills, MCP servers, and agents."
            icon={<StorefrontOutlined color="primary" />}
            to="/marketplace"
          >
            <MarketplacePreview />
          </BentoTile>
        </Box>

        {/* Medium: Self-Service */}
        <BentoTile
          title="Self-service"
          description="Request access to a tool, model, or connection with governed approval."
          icon={<AutoFixHighOutlined color="primary" />}
          to="/self-service"
        />

        {/* Medium: AI Search */}
        <BentoTile
          title="AI Search"
          description="Ask a question in plain language and get an answer with sources."
          icon={<SearchOutlined color="primary" />}
          to="/search"
        />

        {/* Small: Docs */}
        <BentoTile
          title="Documentation"
          description="Plain-language guides from getting started to model approval."
          icon={<MenuBookOutlined color="primary" />}
          to="/docs"
        />

        {/* Small: AI Inventory */}
        <BentoTile
          title="AI Inventory"
          description={canSeeInventory
            ? 'Governance dashboard for all deployed AI assets.'
            : 'The governance control tower for the ØAE platform team.'}
          icon={<AccountTreeOutlined color={canSeeInventory ? 'primary' : 'disabled'} />}
          to="/inventory"
          locked={!canSeeInventory}
          lockLabel={!canSeeInventory ? 'ØAE team only' : undefined}
        />
      </Box>
    </Box>
  )
}
