import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import AutoAwesomeOutlined from '@mui/icons-material/AutoAwesomeOutlined'
import ArrowForwardOutlined from '@mui/icons-material/ArrowForwardOutlined'
import { keyframes } from '@emotion/react'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { maturityBadge } from '@/lib/status'
import { useTypewriter } from '@/lib/useTypewriter'
import type { RichBlock, ChatAnswer } from '@/lib/chatAnswer'
import type { Citation, MarketplaceItem } from '@/types'

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`

function UserBubble({ text }: { text: string }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
      <Box
        sx={(t) => ({
          px: 2.5,
          py: 1.5,
          borderRadius: `${t.tokens.radii.lg}px`,
          backgroundColor: t.tokens.color.brand.accent,
          color: t.tokens.color.text.onAccent,
          maxWidth: '75%',
        })}
      >
        <Typography variant="body1">{text}</Typography>
      </Box>
    </Box>
  )
}

function InlineMarketplaceCard({ item }: { item: MarketplaceItem }) {
  const navigate = useNavigate()
  const badge = maturityBadge(item.maturity)
  return (
    <Card variant="outlined" sx={{ minWidth: 220, maxWidth: 260, flexShrink: 0 }}>
      <CardActionArea onClick={() => navigate(`/marketplace/${item.id}`)} sx={{ p: 1.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
          <Typography variant="subtitle2">{item.name}</Typography>
          <StatusBadge label={badge.label} tone={badge.tone} />
        </Box>
        <Typography variant="caption" color="text.secondary">
          {item.squad} · {item.installs.toLocaleString('en-US')} in use
        </Typography>
      </CardActionArea>
    </Card>
  )
}

function RichBlockRenderer({ block }: { block: RichBlock }) {
  const navigate = useNavigate()

  switch (block.type) {
    case 'marketplace-cards':
      return (
        <Stack direction="row" spacing={1.5} sx={{ overflowX: 'auto', py: 1 }}>
          {block.items?.map((item) => (
            <InlineMarketplaceCard key={item.id} item={item} />
          ))}
        </Stack>
      )
    case 'action-link':
      return (
        <Button
          variant="outlined"
          size="small"
          endIcon={<ArrowForwardOutlined />}
          onClick={() => block.href && navigate(block.href)}
          sx={{ mt: 0.5, textTransform: 'none' }}
        >
          {block.label}
        </Button>
      )
    default:
      return null
  }
}

function StreamingText({ text }: { text: string }) {
  const { shown, done } = useTypewriter(text)
  return (
    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
      {shown}
      {!done && (
        <Box
          component="span"
          aria-hidden
          sx={(t) => ({
            display: 'inline-block',
            ml: 0.25,
            color: t.tokens.color.brand.accent,
            animation: `${blink} 1s steps(2) infinite`,
          })}
        >
          ▍
        </Box>
      )}
    </Typography>
  )
}

function CitationChips({ citations }: { citations: Citation[] }) {
  const navigate = useNavigate()
  if (citations.length === 0) return null
  return (
    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 1.5 }}>
      {citations.map((c) => (
        <Chip
          key={c.docId}
          label={c.label}
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => navigate(`/docs/${c.docId}`)}
          sx={{ cursor: 'pointer' }}
        />
      ))}
    </Stack>
  )
}

interface AiBubbleProps {
  answer: ChatAnswer
}

function AiBubble({ answer }: AiBubbleProps) {
  const textBlock = answer.blocks.find((b) => b.type === 'text')
  const richBlocks = answer.blocks.filter((b) => b.type !== 'text')

  return (
    <Box sx={{ mb: 2, maxWidth: '85%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.75 }}>
        <AutoAwesomeOutlined color="primary" sx={{ fontSize: 18 }} />
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
          ØAE
        </Typography>
      </Box>
      <Box
        sx={(t) => ({
          px: 2.5,
          py: 2,
          borderRadius: `${t.tokens.radii.lg}px`,
          backgroundColor: t.tokens.color.surface.raised,
          boxShadow: t.tokens.elevation.level1,
        })}
      >
        {textBlock?.content && <StreamingText text={textBlock.content} />}
        {richBlocks.map((block, i) => (
          <RichBlockRenderer key={i} block={block} />
        ))}
        <CitationChips citations={answer.citations} />
      </Box>
    </Box>
  )
}

export interface ChatEntry {
  id: string
  role: 'user' | 'ai'
  text: string
  answer?: ChatAnswer
}

export function ChatMessage({ entry }: { entry: ChatEntry }) {
  if (entry.role === 'user') return <UserBubble text={entry.text} />
  if (entry.answer) return <AiBubble answer={entry.answer} />
  return null
}
