/** Shared domain types for the ØAE Portal. Component-local types stay local. */

// --- Personas & access ------------------------------------------------------

export type PersonaId = 'employee' | 'engineer' | 'oae'

export interface Persona {
  id: PersonaId
  name: string
  roleLabel: string
  description: string
  technical: boolean
  canSeeInventory: boolean
}

// --- Shared vocabulary ------------------------------------------------------

export type AssetType = 'mcp' | 'skill' | 'tool' | 'agent'
export type Squad = 'MiniMax' | 'Gemma' | 'Kimi' | 'Vector' | 'Community'
export type Maturity = 'certified' | 'sandbox' | 'deprecated'
export type DataClass = 'public' | 'internal' | 'confidential'
export type Environment = 'sandbox' | 'dev' | 'prod'

export type BusinessArea =
  | 'Finance'
  | 'Offshore Operations'
  | 'Trading'
  | 'Health & Safety'
  | 'Bid Management'
  | 'Procurement'
  | 'People & Culture'
  | 'IT & Platform'

// --- Marketplace ------------------------------------------------------------

export interface Permission {
  scope: string
  description: string
  broad: boolean
}

export interface ChangelogEntry {
  version: string
  date: string
  note: string
}

export interface TechnicalDetail {
  endpoint: string
  transport: string
  version: string
  configSnippet: string
}

export interface MarketplaceItem {
  id: string
  name: string
  type: AssetType
  summary: string
  overview: string
  capabilities: string[]
  squad: Squad
  maturity: Maturity
  businessArea: BusinessArea
  installs: number
  rating: number
  permissions: Permission[]
  supportOwner: string
  supportChannel: string
  changelog: ChangelogEntry[]
  technical?: TechnicalDetail
}

// --- Inventory --------------------------------------------------------------

export type InventoryStatus = 'active' | 'pilot' | 'retired'
export type RiskTier = 'minimal' | 'limited' | 'high'

export interface ComplianceItem {
  label: string
  done: boolean
}

export interface InventoryAsset {
  id: string
  name: string
  type: AssetType
  squad: Squad
  businessOwner: string
  status: InventoryStatus
  riskTier: RiskTier
  dataClass: DataClass
  monthlyCost: number
  lastActivity: string
  description: string
  lineage: string[]
  compliance: ComplianceItem[]
  costTrend: number[]
}

// --- Self-service requests --------------------------------------------------

export type RequestKind = 'mcp' | 'skill' | 'agent-workspace' | 'model-access'

export type RequestState =
  | { status: 'submitted' }
  | { status: 'in-review'; reviewer: string }
  | { status: 'approved'; reviewer: string; approvedOn: string }
  | { status: 'provisioned'; reviewer: string; approvedOn: string }
  | { status: 'rejected'; reviewer: string; reason: string }

export type RequestStatus = RequestState['status']

export interface ProvisioningRequest {
  id: string
  kind: RequestKind
  name: string
  purpose: string
  owningTeam: string
  environment: Environment
  dataClass: DataClass
  transport?: string
  targetSystem?: string
  submittedOn: string
  requestedBy: string
  state: RequestState
}

// --- Search -----------------------------------------------------------------

export type ResultType = 'doc' | 'skill' | 'mcp' | 'video'

export interface Citation {
  label: string
  docId: string
}

export interface SearchResult {
  title: string
  snippet: string
  source: string
  type: ResultType
  href: string
}

export interface SearchAnswer {
  id: string
  question: string
  keywords: string[]
  answer: string
  citations: Citation[]
  results: SearchResult[]
}

// --- Docs -------------------------------------------------------------------

export interface DocSection {
  id: string
  heading: string
  body: string[]
}

export interface DocPage {
  id: string
  title: string
  summary: string
  sections: DocSection[]
}

// --- Pixel Office -----------------------------------------------------------

export type OfficeStatus = 'idle' | 'working' | 'reviewing' | 'blocked' | 'away'

export interface OfficeAgent {
  id: string
  name: string
  role: string
  squad: 'MiniMax' | 'Gemma' | 'Kimi' | 'Vector' | 'Platform'
  desk: { x: number; y: number }
  spriteKey: string
  status: OfficeStatus
  currentTask?: string
  contact?: string
}

// --- Notifications ----------------------------------------------------------

export type NotificationKind = 'approved' | 'info' | 'pending'

export interface AppNotification {
  id: string
  title: string
  body: string
  kind: NotificationKind
  read: boolean
  timeAgo: string
}
