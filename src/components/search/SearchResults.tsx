import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { AnswerPanel } from './AnswerPanel'
import { ResultCard } from './ResultCard'
import { matchAnswer } from '@/lib/searchMatch'
import { docPages } from '@/data/docs'
import type { SearchResult } from '@/types'

const fallbackDocResults: SearchResult[] = docPages.slice(0, 3).map((doc) => ({
  title: doc.title,
  snippet: doc.summary,
  source: 'ØAE Docs',
  type: 'doc',
  href: `/docs/${doc.id}`,
}))

interface SearchResultsProps {
  query: string
  onSearch: (value: string) => void
}

export function SearchResults({ query, onSearch }: SearchResultsProps) {
  const match = matchAnswer(query)
  const results = match.results.length > 0 ? match.results : fallbackDocResults

  return (
    <Box sx={{ maxWidth: 840, mx: 'auto', py: 2 }}>
      <AnswerPanel
        query={query}
        answer={match.answer}
        citations={match.citations}
        onFollowUp={onSearch}
      />
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {match.matched ? 'Sources and results' : 'Top documentation'}
        </Typography>
        <Stack spacing={2}>
          {results.map((result) => (
            <ResultCard key={result.href} result={result} />
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
