import type { SearchAnswer } from '@/types'

/**
 * Pre-canned answers for the AI Search hero. `keywords` drives matching: a
 * query is matched to the answer with the most keyword hits. Anything with no
 * match falls back to `genericAnswer`.
 */
export const searchAnswers: SearchAnswer[] = [
  {
    id: 'model-access',
    question: 'How do I get access to an approved AI model?',
    keywords: ['access', 'approved', 'model', 'llm', 'claude', 'gpt', 'gemini'],
    answer:
      'To use an approved AI model with Ørsted data, open Self-Service and choose “AI Model Access”. Describe your use case, pick an environment (Sandbox, Dev, or Prod), and set the data classification. The portal then shows which reviews apply — for internal or confidential data it will ask you to stay in Sandbox or Dev while the use case is reviewed. Once approved, access is provisioned to your team and you will see it under My Requests.',
    citations: [
      { label: 'Model approval process', docId: 'model-approval' },
      { label: 'Getting started', docId: 'getting-started' },
    ],
    results: [
      {
        title: 'AI Model Access request',
        snippet: 'Start a governed request for an approved model in a few steps.',
        source: 'Self-Service',
        type: 'doc',
        href: '/self-service',
      },
      {
        title: 'Model approval process',
        snippet: 'Which models are approved and how access is reviewed.',
        source: 'ØAE Docs',
        type: 'doc',
        href: '/docs/model-approval',
      },
    ],
  },
  {
    id: 'what-is-mcp',
    question: 'What is an MCP server?',
    keywords: ['mcp', 'server', 'context', 'protocol', 'connect', 'connection'],
    answer:
      'An MCP server is a secure adapter that lets an approved AI assistant read from one of Ørsted’s systems — for example SAP finance or SharePoint — so it can answer using real, current information. MCP stands for Model Context Protocol, but you do not need the details to use one. The important part: access is read-only by default, respects the permissions you already have, and every query is logged for audit. Browse certified MCP servers in the Marketplace, or request a new connection from Self-Service.',
    citations: [
      { label: 'What is an MCP server?', docId: 'what-is-mcp' },
      { label: 'Getting started', docId: 'getting-started' },
    ],
    results: [
      {
        title: 'What is an MCP server?',
        snippet: 'A plain-language explanation of MCP servers.',
        source: 'ØAE Docs',
        type: 'doc',
        href: '/docs/what-is-mcp',
      },
      {
        title: 'SharePoint Knowledge MCP',
        snippet: 'Search and cite your SharePoint documents from any assistant.',
        source: 'Marketplace',
        type: 'mcp',
        href: '/marketplace/sharepoint-knowledge-mcp',
      },
    ],
  },
  {
    id: 'approved-models',
    question: 'Which AI models are approved for use?',
    keywords: ['which', 'models', 'approved', 'allowed', 'list', 'safe'],
    answer:
      'Ørsted keeps a list of approved models that have passed security and data-handling review, including the latest Claude, GPT, and Gemini models running in Ørsted-controlled environments. Only approved models may be used with company data — using an unapproved public tool with confidential information is not allowed. If you need a model that is not yet on the list, raise it through Self-Service and the ØAE team will review it.',
    citations: [
      { label: 'Model approval process', docId: 'model-approval' },
      { label: 'Responsible AI guidelines', docId: 'responsible-ai' },
    ],
    results: [
      {
        title: 'Model approval process',
        snippet: 'The current approved models and how the list is maintained.',
        source: 'ØAE Docs',
        type: 'doc',
        href: '/docs/model-approval',
      },
    ],
  },
  {
    id: 'responsible-ai',
    question: 'What are the responsible-AI guidelines?',
    keywords: ['responsible', 'guidelines', 'ethics', 'risk', 'safe', 'fair', 'governance'],
    answer:
      'AI at Ørsted must be safe, fair, transparent, and under human control — a person is always accountable, so assistants draft and suggest while people decide. Use the least data you need and keep confidential data confidential. Use cases are classified using the EU AI Act tiers (Minimal, Limited, High); higher tiers need more review, and High-risk cases require a conformity assessment and documented human oversight before going live. The Responsible AI Checklist in the Marketplace tells you which reviews apply to your case.',
    citations: [
      { label: 'Responsible AI guidelines', docId: 'responsible-ai' },
    ],
    results: [
      {
        title: 'Responsible AI guidelines',
        snippet: 'Principles, risk tiers, and human oversight.',
        source: 'ØAE Docs',
        type: 'doc',
        href: '/docs/responsible-ai',
      },
      {
        title: 'Responsible AI Checklist',
        snippet: 'Walk through the responsible-AI questions for a new use case.',
        source: 'Marketplace',
        type: 'skill',
        href: '/marketplace/responsible-ai-checklist-tool',
      },
    ],
  },
  {
    id: 'publish-skill',
    question: 'How do I publish a skill to the Marketplace?',
    keywords: ['publish', 'skill', 'marketplace', 'share', 'list', 'certify'],
    answer:
      'To publish a skill, first decide its maturity: Sandbox for early trials with a small group, or Certified for approved everyday use. Complete the responsible-AI checklist, confirm the data classification, and name every permission the skill requests — flagging any broad ones. Write the listing for a non-technical colleague: one line on what it does, then what it can do in plain language, plus a support owner and channel. Submit for review by the ØAE team; once approved it shows a Certified badge.',
    citations: [
      { label: 'Publishing to the Marketplace', docId: 'publishing-marketplace' },
      { label: 'Responsible AI guidelines', docId: 'responsible-ai' },
    ],
    results: [
      {
        title: 'Publishing to the Marketplace',
        snippet: 'How a squad publishes a skill, tool, MCP, or agent.',
        source: 'ØAE Docs',
        type: 'doc',
        href: '/docs/publishing-marketplace',
      },
    ],
  },
  {
    id: 'cost-chargeback',
    question: 'How does AI cost and chargeback work?',
    keywords: ['cost', 'chargeback', 'spend', 'price', 'budget', 'billing', 'money'],
    answer:
      'AI usage is metered and charged back to teams monthly. You can see your own spend without waiting for month-end using the Cost Chargeback Explorer in the Marketplace — it breaks spend down by team, tool, and model, and shows the cost drivers behind each figure. For a full inventory of AI assets and their monthly cost, ØAE members use the AI Inventory control tower.',
    citations: [
      { label: 'Getting started', docId: 'getting-started' },
    ],
    results: [
      {
        title: 'Cost Chargeback Explorer',
        snippet: 'See what your team spends on AI tools and models each month.',
        source: 'Marketplace',
        type: 'skill',
        href: '/marketplace/cost-chargeback-tool',
      },
    ],
  },
]

export const genericAnswer = {
  answer:
    'I could not find a pre-approved answer for that exact question, but here is where to look. Browse the Marketplace for approved tools, use Self-Service to request access or a new capability, and check the ØAE documentation for guidance. If you still need help, every tool lists a support channel, and the Help page can point you to the right squad.',
  citations: [{ label: 'Getting started', docId: 'getting-started' }],
}
