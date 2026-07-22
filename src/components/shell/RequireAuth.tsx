import { Navigate, Outlet } from 'react-router-dom'
import { usePersonaStore } from '@/store/usePersonaStore'

/** Gate for the whole authenticated app: no persona means back to login. */
export function RequireAuth() {
  const signedIn = usePersonaStore((s) => s.activePersonaId !== null)
  return signedIn ? <Outlet /> : <Navigate to="/login" replace />
}
