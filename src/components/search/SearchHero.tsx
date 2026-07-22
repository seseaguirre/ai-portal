import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { SearchBar } from './SearchBar'
import { exampleQuestions } from '@/lib/searchMatch'

const suggested = exampleQuestions.slice(0, 5)

export function SearchHero({ onSubmit }: { onSubmit: (value: string) => void }) {
  const [placeholderIndex, setPlaceholderIndex] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const id = window.setInterval(
      () => setPlaceholderIndex((i) => (i + 1) % suggested.length),
      3200,
    )
    return () => window.clearInterval(id)
  }, [])

  return (
    <Box
      sx={{
        maxWidth: 760,
        mx: 'auto',
        pt: { xs: 4, md: 10 },
        textAlign: 'center',
      }}
    >
      <Typography variant="overline" color="text.secondary">
        Ørsted AI Ecosystem
      </Typography>
      <Typography variant="h2" sx={{ mt: 1, mb: 1.5 }}>
        What do you want to do with AI today?
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Ask a question in plain language. The portal answers and points you to
        approved tools and documentation.
      </Typography>

      <SearchBar
        onSubmit={onSubmit}
        large
        withUnderline
        autoFocus
        placeholder={suggested[placeholderIndex]}
      />

      <Stack
        direction="row"
        spacing={1}
        useFlexGap
        flexWrap="wrap"
        justifyContent="center"
        sx={{ mt: 3 }}
      >
        {suggested.map((question) => (
          <Chip
            key={question}
            label={question}
            variant="outlined"
            onClick={() => onSubmit(question)}
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </Stack>
    </Box>
  )
}
