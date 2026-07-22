import { useSearchParams } from 'react-router-dom'
import { SearchHero } from '@/components/search/SearchHero'
import { SearchResults } from '@/components/search/SearchResults'

export function Home() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q')?.trim() ?? ''
  const runSearch = (value: string) => setParams(value ? { q: value } : {})

  return query ? (
    <SearchResults key={query} query={query} onSearch={runSearch} />
  ) : (
    <SearchHero onSubmit={runSearch} />
  )
}
