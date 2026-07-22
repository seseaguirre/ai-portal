import { usePersonaStore } from '@/store/usePersonaStore'
import { getPersona } from '@/data/personas'
import type { Persona } from '@/types'

export const useActivePersona = (): Persona | null => {
  const id = usePersonaStore((s) => s.activePersonaId)
  return id ? getPersona(id) : null
}
