import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { TypeIcon } from '@/components/ui/TypeIcon'
import type { SearchResult } from '@/types'

export function ResultCard({ result }: { result: SearchResult }) {
  const navigate = useNavigate()

  return (
    <Card>
      <CardActionArea onClick={() => navigate(result.href)} sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <TypeIcon kind={result.type} color="primary" />
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle1">{result.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {result.snippet}
            </Typography>
            <Chip size="small" label={result.source} variant="outlined" />
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  )
}
