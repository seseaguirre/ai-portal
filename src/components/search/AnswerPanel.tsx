import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import AutoAwesomeOutlined from '@mui/icons-material/AutoAwesomeOutlined'
import { keyframes } from '@emotion/react'
import { SearchBar } from './SearchBar'
import { useTypewriter } from '@/lib/useTypewriter'
import type { Citation } from '@/types'

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`

interface AnswerPanelProps {
  query: string
  answer: string
  citations: Citation[]
  onFollowUp: (value: string) => void
}

export function AnswerPanel({
  query,
  answer,
  citations,
  onFollowUp,
}: AnswerPanelProps) {
  const { shown, done } = useTypewriter(answer)
  const navigate = useNavigate()

  return (
    <Card sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <AutoAwesomeOutlined color="primary" fontSize="small" />
        <Typography variant="overline" color="text.secondary">
          ØAE answer
        </Typography>
      </Box>
      <Typography variant="h5" component="h1" sx={{ mb: 1.5 }}>
        {query}
      </Typography>

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

      {done && citations.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="overline" color="text.secondary">
            Sources
          </Typography>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 0.5 }}>
            {citations.map((citation) => (
              <Chip
                key={citation.docId}
                label={citation.label}
                variant="outlined"
                color="primary"
                onClick={() => navigate(`/docs/${citation.docId}`)}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Stack>
        </Box>
      )}

      <Divider sx={{ my: 2.5 }} />
      <SearchBar onSubmit={onFollowUp} placeholder="Ask a follow-up" />
    </Card>
  )
}
