import { Link as RouterLink, useLocation } from 'react-router-dom'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useActivePersona } from '@/lib/useActivePersona'

const currentValue = (pathname: string) => {
  if (pathname.startsWith('/self-service/requests')) return '/self-service/requests'
  if (pathname.startsWith('/self-service/approvals')) return '/self-service/approvals'
  return '/self-service'
}

export function SelfServiceTabs() {
  const persona = useActivePersona()
  const { pathname } = useLocation()

  return (
    <Tabs value={currentValue(pathname)} sx={{ mb: 3 }}>
      <Tab
        label="New request"
        value="/self-service"
        component={RouterLink}
        to="/self-service"
      />
      <Tab
        label="My requests"
        value="/self-service/requests"
        component={RouterLink}
        to="/self-service/requests"
      />
      {persona?.canSeeInventory && (
        <Tab
          label="Approvals"
          value="/self-service/approvals"
          component={RouterLink}
          to="/self-service/approvals"
        />
      )}
    </Tabs>
  )
}
