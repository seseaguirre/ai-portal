import { useState, useRef, useEffect, useCallback } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { SearchBar } from './SearchBar'
import { ChatMessage } from './ChatMessage'
import type { ChatEntry } from './ChatMessage'
import { buildChatAnswer } from '@/lib/chatAnswer'
import { exampleQuestions } from '@/lib/searchMatch'

const suggestions = exampleQuestions.slice(0, 4)

interface ChatThreadProps {
  initialQuery?: string
}

export function ChatThread({ initialQuery }: ChatThreadProps) {
  const [entries, setEntries] = useState<ChatEntry[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)
  const initialHandled = useRef(false)

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const addQuery = useCallback(
    (text: string) => {
      const userId = crypto.randomUUID()
      const aiId = crypto.randomUUID()
      const answer = buildChatAnswer(text)

      setEntries((prev) => [
        ...prev,
        { id: userId, role: 'user', text },
        { id: aiId, role: 'ai', text: answer.blocks.find((b) => b.type === 'text')?.content ?? '', answer },
      ])
    },
    [],
  )

  // Handle initial query once
  useEffect(() => {
    if (initialQuery && !initialHandled.current) {
      initialHandled.current = true
      addQuery(initialQuery)
    }
  }, [initialQuery, addQuery])

  // Scroll when entries change
  useEffect(() => {
    scrollToBottom()
  }, [entries, scrollToBottom])

  const hasMessages = entries.length > 0

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: 840, mx: 'auto' }}>
      {/* Scrollable message area */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 1, md: 2 }, pt: 2, pb: 2 }}>
        {!hasMessages && (
          <Box sx={{ textAlign: 'center', pt: { xs: 4, md: 10 } }}>
            <Typography variant="overline" color="text.secondary">
              Ørsted AI Ecosystem
            </Typography>
            <Typography variant="h3" sx={{ mt: 1, mb: 1.5 }}>
              What do you want to do with AI today?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Ask a question in plain language. The portal answers and points you
              to approved tools and documentation.
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              flexWrap="wrap"
              justifyContent="center"
            >
              {suggestions.map((q) => (
                <Chip
                  key={q}
                  label={q}
                  variant="outlined"
                  onClick={() => addQuery(q)}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Stack>
          </Box>
        )}

        {entries.map((entry) => (
          <ChatMessage key={entry.id} entry={entry} />
        ))}
        <div ref={bottomRef} />
      </Box>

      {/* Pinned input bar */}
      <Box
        sx={(t) => ({
          px: { xs: 1, md: 2 },
          py: 1.5,
          borderTop: hasMessages ? `1px solid ${t.tokens.color.border.subtle}` : 'none',
          backgroundColor: t.tokens.color.surface.base,
        })}
      >
        <SearchBar
          onSubmit={addQuery}
          placeholder="Ask a follow-up question..."
          autoFocus={!initialQuery}
          large={!hasMessages}
          withUnderline={!hasMessages}
        />
      </Box>
    </Box>
  )
}
