import { create } from 'zustand'
import type { PersonaId } from '@/types'

interface PersonaState {
  activePersonaId: PersonaId | null
  signIn: (id: PersonaId) => void
  switchPersona: (id: PersonaId) => void
  signOut: () => void
}

export const usePersonaStore = create<PersonaState>((set) => ({
  activePersonaId: null,
  signIn: (id) => set({ activePersonaId: id }),
  switchPersona: (id) => set({ activePersonaId: id }),
  signOut: () => set({ activePersonaId: null }),
}))
