import { matchAnswer } from '@/lib/searchMatch'
import { marketplaceItems } from '@/data/marketplace'
import type { Citation, SearchResult } from '@/types'

export interface RichBlock {
  type: 'text' | 'marketplace-cards' | 'action-link'
  content?: string
  items?: typeof marketplaceItems
  label?: string
  href?: string
}

export interface ChatAnswer {
  blocks: RichBlock[]
  citations: Citation[]
  results: SearchResult[]
}

/**
 * Converts a matched answer into rich blocks that the chat UI can render
 * as dynamic HTML — inline marketplace cards, action links, etc.
 */
export function buildChatAnswer(query: string): ChatAnswer {
  const match = matchAnswer(query)

  const blocks: RichBlock[] = [{ type: 'text', content: match.answer }]

  // If the answer mentions marketplace items, embed preview cards
  const q = query.toLowerCase()
  const relevantItems = marketplaceItems.filter(
    (item) =>
      q.includes(item.name.toLowerCase().split(' ')[0].toLowerCase()) ||
      match.results.some((r) => r.href.includes(item.id)),
  )
  if (relevantItems.length > 0) {
    blocks.push({ type: 'marketplace-cards', items: relevantItems.slice(0, 3) })
  }

  // Add action links for Self-Service and Docs where relevant
  if (q.includes('access') || q.includes('request')) {
    blocks.push({
      type: 'action-link',
      label: 'Start a request in Self-Service',
      href: '/self-service',
    })
  }
  if (match.citations.length > 0) {
    blocks.push({
      type: 'action-link',
      label: 'Read the documentation',
      href: `/docs/${match.citations[0].docId}`,
    })
  }

  return { blocks, citations: match.citations, results: match.results }
}
