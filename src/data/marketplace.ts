import type { MarketplaceItem } from '@/types'

/**
 * The Marketplace catalog. Names and squads here are the canonical source for
 * the "one coherent world" — the Inventory reuses these names for deployed
 * assets, and Search results point back to them.
 */
export const marketplaceItems: MarketplaceItem[] = [
  {
    id: 'sap-finance-mcp',
    name: 'SAP Finance MCP',
    type: 'mcp',
    summary: 'Ask questions about ledgers, cost centres, and invoices in plain language.',
    overview:
      'Connects approved AI assistants to the SAP finance backbone so teams can ask about postings, cost centres, and open invoices without writing a report. Read-only by default; every query is logged for audit.',
    capabilities: [
      'Look up cost centre balances and open items',
      'Explain an invoice or posting in plain language',
      'Draft a variance commentary from month-end figures',
    ],
    squad: 'MiniMax',
    maturity: 'certified',
    businessArea: 'Finance',
    installs: 412,
    rating: 4.6,
    permissions: [
      { scope: 'Read SAP FI postings', description: 'View ledger entries and open items.', broad: false },
      { scope: 'Read cost centre master data', description: 'Resolve names for cost centres.', broad: false },
    ],
    supportOwner: 'MiniMax squad',
    supportChannel: '#oae-sap-finance',
    changelog: [
      { version: '1.4.0', date: '2026-06-30', note: 'Added open-invoice lookup.' },
      { version: '1.3.1', date: '2026-05-12', note: 'Faster cost-centre resolution.' },
    ],
    technical: {
      endpoint: 'https://mcp.oae.orsted.net/sap-finance',
      transport: 'HTTP + SSE',
      version: '1.4.0',
      configSnippet:
        '{\n  "server": "sap-finance",\n  "url": "https://mcp.oae.orsted.net/sap-finance",\n  "transport": "http-sse",\n  "auth": "entra-sso"\n}',
    },
  },
  {
    id: 'sharepoint-knowledge-mcp',
    name: 'SharePoint Knowledge MCP',
    type: 'mcp',
    summary: 'Search and cite your team’s SharePoint documents from any AI assistant.',
    overview:
      'Grounds AI answers in your own SharePoint sites so responses come with links back to the source page. Respects existing SharePoint permissions — people only see what they already have access to.',
    capabilities: [
      'Find the right document across your SharePoint sites',
      'Answer questions with citations to the source page',
      'Summarize a long policy or handbook',
    ],
    squad: 'Gemma',
    maturity: 'certified',
    businessArea: 'IT & Platform',
    installs: 987,
    rating: 4.8,
    permissions: [
      { scope: 'Read SharePoint sites you can access', description: 'Honours your existing SharePoint permissions.', broad: false },
    ],
    supportOwner: 'Gemma squad',
    supportChannel: '#oae-knowledge',
    changelog: [
      { version: '2.1.0', date: '2026-07-05', note: 'Citations now deep-link to the exact page.' },
    ],
    technical: {
      endpoint: 'https://mcp.oae.orsted.net/sharepoint',
      transport: 'HTTP + SSE',
      version: '2.1.0',
      configSnippet:
        '{\n  "server": "sharepoint-knowledge",\n  "url": "https://mcp.oae.orsted.net/sharepoint",\n  "transport": "http-sse",\n  "auth": "entra-sso"\n}',
    },
  },
  {
    id: 'wind-farm-telemetry-mcp',
    name: 'Wind Farm Telemetry MCP',
    type: 'mcp',
    summary: 'Query live and historical turbine telemetry for offshore sites.',
    overview:
      'Exposes turbine and substation telemetry to AI assistants for engineers investigating performance. Sandbox release — data is a replayed sample, not the live SCADA feed.',
    capabilities: [
      'Pull power curves for a turbine over a time window',
      'Compare availability across an offshore site',
      'Flag turbines with abnormal vibration readings',
    ],
    squad: 'Vector',
    maturity: 'sandbox',
    businessArea: 'Offshore Operations',
    installs: 63,
    rating: 4.1,
    permissions: [
      { scope: 'Read turbine telemetry (sample set)', description: 'Replayed telemetry, not the live feed.', broad: false },
    ],
    supportOwner: 'Vector squad',
    supportChannel: '#oae-offshore',
    changelog: [
      { version: '0.4.0', date: '2026-07-01', note: 'Added substation metrics to the sample set.' },
    ],
    technical: {
      endpoint: 'https://mcp-sandbox.oae.orsted.net/wind-telemetry',
      transport: 'HTTP + SSE',
      version: '0.4.0',
      configSnippet:
        '{\n  "server": "wind-telemetry",\n  "url": "https://mcp-sandbox.oae.orsted.net/wind-telemetry",\n  "transport": "http-sse",\n  "auth": "entra-sso"\n}',
    },
  },
  {
    id: 'trading-signals-mcp',
    name: 'Trading Signals MCP',
    type: 'mcp',
    summary: 'Access approved market and weather signals for power trading.',
    overview:
      'Provides curated market, weather, and generation-forecast signals to assistants supporting the trading desk. Confidential — access is limited to the trading floor and logged per query.',
    capabilities: [
      'Retrieve day-ahead price and load forecasts',
      'Combine weather and generation signals for a region',
      'Explain a signal’s recent movement in plain language',
    ],
    squad: 'Kimi',
    maturity: 'certified',
    businessArea: 'Trading',
    installs: 154,
    rating: 4.4,
    permissions: [
      { scope: 'Read curated market signals', description: 'Approved signals only, no live position data.', broad: false },
      { scope: 'Read weather and generation forecasts', description: 'Regional forecast data.', broad: false },
    ],
    supportOwner: 'Kimi squad',
    supportChannel: '#oae-trading',
    changelog: [
      { version: '1.1.0', date: '2026-06-20', note: 'Added intraday weather refresh.' },
    ],
    technical: {
      endpoint: 'https://mcp.oae.orsted.net/trading-signals',
      transport: 'HTTP + SSE',
      version: '1.1.0',
      configSnippet:
        '{\n  "server": "trading-signals",\n  "url": "https://mcp.oae.orsted.net/trading-signals",\n  "transport": "http-sse",\n  "auth": "entra-sso"\n}',
    },
  },
  {
    id: 'meeting-minutes-skill',
    name: 'Meeting Minutes Skill',
    type: 'skill',
    summary: 'Turn a meeting transcript into clear minutes with action points.',
    overview:
      'Takes a Teams transcript and produces structured minutes: decisions, action points with owners, and open questions. Works in the language of the meeting.',
    capabilities: [
      'Summarize decisions and next steps',
      'Extract action points with owners and due dates',
      'Produce minutes in the meeting’s language',
    ],
    squad: 'Gemma',
    maturity: 'certified',
    businessArea: 'People & Culture',
    installs: 1320,
    rating: 4.7,
    permissions: [
      { scope: 'Read the transcript you provide', description: 'Only the transcript you paste or upload.', broad: false },
    ],
    supportOwner: 'Gemma squad',
    supportChannel: '#oae-productivity',
    changelog: [
      { version: '3.0.0', date: '2026-07-10', note: 'Better owner detection for action points.' },
    ],
  },
  {
    id: 'contract-summarizer-skill',
    name: 'Contract Summarizer Skill',
    type: 'skill',
    summary: 'Summarize a contract and surface key clauses and risks.',
    overview:
      'Reads a contract and highlights term, value, renewal, liability, and termination clauses in plain language. Built for bid and legal teams reviewing large volumes.',
    capabilities: [
      'Summarize a contract in one page',
      'Surface renewal, liability, and termination clauses',
      'Compare two contract versions',
    ],
    squad: 'MiniMax',
    maturity: 'certified',
    businessArea: 'Bid Management',
    installs: 542,
    rating: 4.5,
    permissions: [
      { scope: 'Read the document you provide', description: 'Only the contract you upload.', broad: false },
    ],
    supportOwner: 'MiniMax squad',
    supportChannel: '#oae-bid-support',
    changelog: [
      { version: '2.2.0', date: '2026-06-28', note: 'Added version comparison.' },
    ],
  },
  {
    id: 'translation-skill',
    name: 'Translation Skill',
    type: 'skill',
    summary: 'Translate text between Danish, English, German, and Polish.',
    overview:
      'A certified translation helper for everyday work text. Keeps formatting and offers a more formal or more casual tone on request.',
    capabilities: [
      'Translate between Danish, English, German, and Polish',
      'Keep bullet lists and tables intact',
      'Adjust tone between formal and casual',
    ],
    squad: 'Community',
    maturity: 'certified',
    businessArea: 'IT & Platform',
    installs: 2210,
    rating: 4.6,
    permissions: [
      { scope: 'Read the text you provide', description: 'Only the text you enter.', broad: false },
    ],
    supportOwner: 'Community maintainers',
    supportChannel: '#oae-community',
    changelog: [
      { version: '1.8.0', date: '2026-05-30', note: 'Added Polish.' },
    ],
  },
  {
    id: 'procurement-spend-skill',
    name: 'Procurement Spend Analyzer Skill',
    type: 'skill',
    summary: 'Explain spend patterns and flag off-contract purchasing.',
    overview:
      'Analyses a spend export and explains where money is going, which suppliers dominate a category, and where buying happens off-contract. Sandbox — validate figures before acting on them.',
    capabilities: [
      'Break down spend by category and supplier',
      'Flag likely off-contract purchases',
      'Draft a savings hypothesis for a category',
    ],
    squad: 'MiniMax',
    maturity: 'sandbox',
    businessArea: 'Procurement',
    installs: 88,
    rating: 4.0,
    permissions: [
      { scope: 'Read the spend export you provide', description: 'Only the file you upload.', broad: false },
    ],
    supportOwner: 'MiniMax squad',
    supportChannel: '#oae-procurement',
    changelog: [
      { version: '0.6.0', date: '2026-07-03', note: 'Added off-contract detection.' },
    ],
  },
  {
    id: 'hse-incident-triage-agent',
    name: 'HSE Incident Triage Agent',
    type: 'agent',
    summary: 'Triage health & safety reports and suggest a severity and owner.',
    overview:
      'Reads incoming HSE incident reports, proposes a severity level and responsible team, and drafts the first notification. A safety officer reviews and confirms every case — the agent never closes a report on its own.',
    capabilities: [
      'Propose a severity level for a new report',
      'Suggest the responsible team and next action',
      'Draft the initial notification for review',
    ],
    squad: 'Vector',
    maturity: 'certified',
    businessArea: 'Health & Safety',
    installs: 96,
    rating: 4.3,
    permissions: [
      { scope: 'Read HSE incident reports', description: 'Reports submitted to the HSE queue.', broad: false },
      { scope: 'Draft notifications', description: 'Creates drafts only; a person sends them.', broad: false },
    ],
    supportOwner: 'Vector squad',
    supportChannel: '#oae-hse',
    changelog: [
      { version: '1.2.0', date: '2026-06-25', note: 'Improved severity calibration.' },
    ],
    technical: {
      endpoint: 'https://agents.oae.orsted.net/hse-triage',
      transport: 'Agent runtime',
      version: '1.2.0',
      configSnippet:
        '{\n  "agent": "hse-incident-triage",\n  "runtime": "oae-agents",\n  "tools": ["sharepoint-knowledge", "translation"],\n  "humanReview": "required"\n}',
    },
  },
  {
    id: 'bid-support-agent',
    name: 'Bid Support Agent',
    type: 'agent',
    summary: 'Assemble first-draft bid responses from past submissions.',
    overview:
      'Older agent that drafts bid responses from a library of past submissions. Deprecated — replaced by the Contract Summarizer Skill plus the new bid workspace. Kept read-only for reference while teams migrate.',
    capabilities: [
      'Draft answers from a library of past bids',
      'Suggest relevant case studies',
    ],
    squad: 'Kimi',
    maturity: 'deprecated',
    businessArea: 'Bid Management',
    installs: 47,
    rating: 3.4,
    permissions: [
      { scope: 'Read the past-bids library', description: 'Historical bid submissions.', broad: false },
      { scope: 'Read all tender folders', description: 'Broad access to every tender workspace.', broad: true },
    ],
    supportOwner: 'Kimi squad',
    supportChannel: '#oae-bid-support',
    changelog: [
      { version: '0.9.3', date: '2025-11-18', note: 'Final release before deprecation.' },
    ],
    technical: {
      endpoint: 'https://agents.oae.orsted.net/bid-support',
      transport: 'Agent runtime',
      version: '0.9.3',
      configSnippet:
        '{\n  "agent": "bid-support",\n  "runtime": "oae-agents",\n  "status": "deprecated"\n}',
    },
  },
  {
    id: 'offshore-maintenance-copilot',
    name: 'Offshore Maintenance Copilot',
    type: 'agent',
    summary: 'Help technicians plan turbine maintenance visits.',
    overview:
      'Assists offshore technicians in planning a maintenance visit: pulls the work order, checks parts availability, and drafts a task list. Sandbox — plans are advisory and must be confirmed by the site lead.',
    capabilities: [
      'Summarize a work order and its history',
      'Check parts availability for a job',
      'Draft a task list for a maintenance visit',
    ],
    squad: 'Vector',
    maturity: 'sandbox',
    businessArea: 'Offshore Operations',
    installs: 41,
    rating: 4.0,
    permissions: [
      { scope: 'Read work orders', description: 'Maintenance work orders for your site.', broad: false },
      { scope: 'Read parts inventory', description: 'Warehouse stock levels.', broad: false },
    ],
    supportOwner: 'Vector squad',
    supportChannel: '#oae-offshore',
    changelog: [
      { version: '0.3.0', date: '2026-06-30', note: 'Added parts availability check.' },
    ],
    technical: {
      endpoint: 'https://agents-sandbox.oae.orsted.net/offshore-maintenance',
      transport: 'Agent runtime',
      version: '0.3.0',
      configSnippet:
        '{\n  "agent": "offshore-maintenance-copilot",\n  "runtime": "oae-agents",\n  "tools": ["wind-telemetry"],\n  "humanReview": "required"\n}',
    },
  },
  {
    id: 'document-redaction-tool',
    name: 'Document Redaction Tool',
    type: 'tool',
    summary: 'Automatically redact personal and confidential data from documents.',
    overview:
      'Scans a document for names, contact details, and other sensitive data and produces a redacted copy. Used before sharing files outside a team or with external partners.',
    capabilities: [
      'Detect and mask personal data',
      'Redact commercially sensitive figures',
      'Produce a clean, shareable copy',
    ],
    squad: 'Gemma',
    maturity: 'certified',
    businessArea: 'IT & Platform',
    installs: 631,
    rating: 4.5,
    permissions: [
      { scope: 'Read the document you provide', description: 'Only the file you upload.', broad: false },
    ],
    supportOwner: 'Gemma squad',
    supportChannel: '#oae-knowledge',
    changelog: [
      { version: '1.5.0', date: '2026-06-15', note: 'Better detection of Danish CPR numbers.' },
    ],
  },
  {
    id: 'cost-chargeback-tool',
    name: 'Cost Chargeback Explorer',
    type: 'tool',
    summary: 'See what your team spends on AI tools and models each month.',
    overview:
      'A self-service view of AI spend by team, tool, and model, with the cost drivers behind each figure. Helps managers understand chargeback before month-end.',
    capabilities: [
      'Break down AI spend by team and tool',
      'Show the cost drivers behind a figure',
      'Export a monthly chargeback summary',
    ],
    squad: 'MiniMax',
    maturity: 'certified',
    businessArea: 'Finance',
    installs: 289,
    rating: 4.4,
    permissions: [
      { scope: 'Read AI usage metering', description: 'Aggregated usage for your teams.', broad: false },
    ],
    supportOwner: 'MiniMax squad',
    supportChannel: '#oae-finops',
    changelog: [
      { version: '1.0.0', date: '2026-07-06', note: 'Certified and available org-wide.' },
    ],
  },
  {
    id: 'responsible-ai-checklist-tool',
    name: 'Responsible AI Checklist',
    type: 'tool',
    summary: 'Walk through the responsible-AI checklist for a new use case.',
    overview:
      'An interactive checklist that walks you through Ørsted’s responsible-AI questions for a new use case and produces a shareable summary for review.',
    capabilities: [
      'Guide you through the responsible-AI questions',
      'Flag which reviews your use case needs',
      'Produce a summary to attach to a request',
    ],
    squad: 'Community',
    maturity: 'certified',
    businessArea: 'IT & Platform',
    installs: 705,
    rating: 4.7,
    permissions: [
      { scope: 'Read the answers you provide', description: 'Only what you enter in the checklist.', broad: false },
    ],
    supportOwner: 'Community maintainers',
    supportChannel: '#oae-responsible-ai',
    changelog: [
      { version: '1.3.0', date: '2026-05-22', note: 'Aligned with the latest EU AI Act guidance.' },
    ],
  },
  {
    id: 'turbine-fault-classifier-skill',
    name: 'Turbine Fault Classifier Skill',
    type: 'skill',
    summary: 'Classify turbine fault codes and suggest likely causes.',
    overview:
      'Older skill that maps turbine fault codes to likely causes. Deprecated — its logic moved into the Offshore Maintenance Copilot. Kept available while sites migrate their runbooks.',
    capabilities: [
      'Map a fault code to a likely cause',
      'Suggest a first diagnostic step',
    ],
    squad: 'Vector',
    maturity: 'deprecated',
    businessArea: 'Offshore Operations',
    installs: 58,
    rating: 3.6,
    permissions: [
      { scope: 'Read the fault code you provide', description: 'Only the code you enter.', broad: false },
    ],
    supportOwner: 'Vector squad',
    supportChannel: '#oae-offshore',
    changelog: [
      { version: '0.8.0', date: '2025-12-02', note: 'Final release before deprecation.' },
    ],
  },
  {
    id: 'email-draft-assistant-skill',
    name: 'Email Draft Assistant Skill',
    type: 'skill',
    summary: 'Draft clear, on-tone emails from a few bullet points.',
    overview:
      'Turns a few bullet points into a clear email draft in your chosen tone. Sandbox while tone presets are being tuned for Ørsted style.',
    capabilities: [
      'Draft an email from bullet points',
      'Match a formal or friendly tone',
      'Tighten a draft you already have',
    ],
    squad: 'Gemma',
    maturity: 'sandbox',
    businessArea: 'People & Culture',
    installs: 134,
    rating: 4.1,
    permissions: [
      { scope: 'Read the notes you provide', description: 'Only the points you enter.', broad: false },
    ],
    supportOwner: 'Gemma squad',
    supportChannel: '#oae-productivity',
    changelog: [
      { version: '0.5.0', date: '2026-07-08', note: 'Added Ørsted tone presets (in tuning).' },
    ],
  },
]

export const getMarketplaceItem = (id: string): MarketplaceItem | undefined =>
  marketplaceItems.find((item) => item.id === id)

export const deprecatedNames = new Set(
  marketplaceItems.filter((i) => i.maturity === 'deprecated').map((i) => i.name),
)
