import { useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import { ChatThread } from '@/components/search/ChatThread'

export function Search() {
  const [params] = useSearchParams()
  const initialQuery = params.get('q')?.trim() || undefined

  return (
    <Box sx={{ height: 'calc(100vh - 64px)' }}>
      <ChatThread key={initialQuery} initialQuery={initialQuery} />
    </Box>
  )
}
