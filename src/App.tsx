import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { buildAppTheme, type ThemeVariant } from '@/theme'
import { RequireAuth } from '@/components/shell/RequireAuth'
import { AppShell } from '@/components/shell/AppShell'
import { Login } from '@/pages/Login'
import { Landing } from '@/pages/Landing'
import { Search } from '@/pages/Search'
import { Marketplace } from '@/pages/Marketplace'
import { SelfService } from '@/pages/SelfService'
import { MyRequests } from '@/pages/MyRequests'
import { Approvals } from '@/pages/Approvals'
import { Inventory } from '@/pages/Inventory'
import { DocsIndex } from '@/pages/DocsIndex'
import { DocArticle } from '@/pages/DocArticle'
import { Help } from '@/pages/Help'
import { NotFound } from '@/pages/NotFound'

const themes: Record<ThemeVariant, ReturnType<typeof buildAppTheme>> = {
  default: buildAppTheme('default'),
  alt: buildAppTheme('alt'),
}

// Hidden dev toggle: `?theme=alt` re-skins the whole app and persists across
// navigation; `?theme=default` clears it. Proves design-system portability.
const resolveVariant = (): ThemeVariant => {
  const param = new URLSearchParams(window.location.search).get('theme')
  if (param === 'alt') {
    localStorage.setItem('oae-theme', 'alt')
    return 'alt'
  }
  if (param === 'default') {
    localStorage.removeItem('oae-theme')
    return 'default'
  }
  return localStorage.getItem('oae-theme') === 'alt' ? 'alt' : 'default'
}

export function App() {
  const [variant] = useState<ThemeVariant>(resolveVariant)

  return (
    <ThemeProvider theme={themes[variant]}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route element={<AppShell />}>
              <Route path="/" element={<Landing />} />
              <Route path="/search" element={<Search />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/marketplace/:id" element={<Marketplace />} />
              <Route path="/self-service" element={<SelfService />} />
              <Route path="/self-service/requests" element={<MyRequests />} />
              <Route path="/self-service/approvals" element={<Approvals />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/docs" element={<DocsIndex />} />
              <Route path="/docs/:id" element={<DocArticle />} />
              <Route path="/help" element={<Help />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
