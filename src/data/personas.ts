import type { Persona } from '@/types'

export const personas: Persona[] = [
  {
    id: 'employee',
    name: 'Freja Holm',
    roleLabel: 'Employee',
    description:
      'Non-technical colleague in any department. Wants to find approved AI tools, ask questions, and request access.',
    technical: false,
    canSeeInventory: false,
  },
  {
    id: 'engineer',
    name: 'Anders Vestergaard',
    roleLabel: 'Engineer',
    description:
      'Technical colleague. Wants MCP server specs, config snippets, and provisioning workflows.',
    technical: true,
    canSeeInventory: false,
  },
  {
    id: 'oae',
    name: 'Priya Menon',
    roleLabel: 'ØAE Member',
    description:
      'AI Ecosystem platform team. Everything above, plus the AI Inventory and approval controls.',
    technical: true,
    canSeeInventory: true,
  },
]

export const getPersona = (id: Persona['id']): Persona =>
  personas.find((p) => p.id === id) ?? personas[0]
