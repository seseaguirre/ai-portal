import type { DocPage } from '@/types'

export const docPages: DocPage[] = [
  {
    id: 'getting-started',
    title: 'Getting started with the ØAE Portal',
    summary:
      'What the portal is, who runs it, and how to find approved AI tools for your work.',
    sections: [
      {
        id: 'what-is-this',
        heading: 'What is the ØAE Portal?',
        body: [
          'The ØAE Portal is Ørsted’s front door to approved AI capabilities. ØAE stands for Ørsted AI Ecosystem — the platform team inside AI, Data & Architecture that provides AI tooling and governance to the whole company.',
          'You can use it to find approved AI tools, ask questions, and request access — whether or not you work in technology.',
        ],
      },
      {
        id: 'find-tools',
        heading: 'Finding a tool',
        body: [
          'Start on the home page and ask a question in plain language, or browse the Marketplace and filter by what you need. Each Marketplace item explains what it can do, who owns it, and how to get support.',
          'Look for the Certified badge — it means the tool has been reviewed and is approved for everyday use. Sandbox tools are still being trialled.',
        ],
      },
      {
        id: 'get-help',
        heading: 'Getting help',
        body: [
          'Every tool lists a support channel. If you are not sure where to start, use the Help page or ask a question on the home page and follow the cited documents.',
        ],
      },
    ],
  },
  {
    id: 'what-is-mcp',
    title: 'What is an MCP server?',
    summary:
      'A plain-language explanation of MCP servers and why the ØAE team provides them.',
    sections: [
      {
        id: 'plain-language',
        heading: 'In plain language',
        body: [
          'An MCP server is a secure adapter that lets an approved AI assistant read from one of Ørsted’s systems — for example SAP finance or SharePoint — so it can answer questions using real, up-to-date information.',
          'MCP stands for Model Context Protocol. You do not need to know the details to use one: the important part is that it connects an assistant to a system in a governed, logged way.',
        ],
      },
      {
        id: 'why-it-matters',
        heading: 'Why we use them',
        body: [
          'Without a governed connection, people copy data into chat tools by hand, which is slow and risky. An MCP server gives the assistant controlled, read-only access and keeps a record of every query for audit.',
          'MCP servers respect the permissions you already have. An assistant using the SharePoint Knowledge MCP can only see documents you could already open yourself.',
        ],
      },
      {
        id: 'get-one',
        heading: 'How to get one',
        body: [
          'Browse certified MCP servers in the Marketplace, or request a new one from Self-Service if the system you need is not yet connected.',
        ],
      },
    ],
  },
  {
    id: 'responsible-ai',
    title: 'Responsible AI guidelines',
    summary:
      'The principles every AI use case at Ørsted must follow, and the reviews that apply.',
    sections: [
      {
        id: 'principles',
        heading: 'Our principles',
        body: [
          'AI at Ørsted must be safe, fair, transparent, and under human control. A person is always accountable for decisions — assistants draft and suggest, people decide.',
          'Use the least data you need, keep confidential data confidential, and be able to explain what a tool does and why.',
        ],
      },
      {
        id: 'risk-tiers',
        heading: 'Risk tiers',
        body: [
          'We classify use cases using the EU AI Act tiers: Minimal, Limited, and High. Higher tiers require more review — a High-risk use case needs a conformity assessment and documented human oversight before it goes live.',
          'If you are unsure of your tier, use the Responsible AI Checklist in the Marketplace; it tells you which reviews apply.',
        ],
      },
      {
        id: 'oversight',
        heading: 'Human oversight',
        body: [
          'High-risk assistants, such as the HSE Incident Triage Agent, never take a final action on their own. They prepare a recommendation and a person confirms it.',
        ],
      },
    ],
  },
  {
    id: 'publishing-marketplace',
    title: 'Publishing to the Marketplace',
    summary:
      'How a squad publishes a skill, tool, MCP server, or agent for the rest of Ørsted.',
    sections: [
      {
        id: 'before',
        heading: 'Before you publish',
        body: [
          'Decide the maturity you are publishing at. Sandbox is for early trials with a small group. Certified means the item has passed review and is approved for everyday use.',
          'Complete the responsible-AI checklist and confirm the data classification and permissions your item needs.',
        ],
      },
      {
        id: 'listing',
        heading: 'Writing a good listing',
        body: [
          'Write for a non-technical colleague. Say what the item does in one line, then list what it can do in plain language. Name every permission it requests and flag any broad ones.',
          'Give a support owner and a channel so people know where to go with questions.',
        ],
      },
      {
        id: 'review',
        heading: 'Getting certified',
        body: [
          'Submit your listing for review by the ØAE team. Certification checks the listing, the permissions, and the responsible-AI status. Once approved, the item shows a Certified badge.',
        ],
      },
    ],
  },
  {
    id: 'model-approval',
    title: 'Model approval process',
    summary:
      'How AI models are reviewed and approved, and how to request access to one.',
    sections: [
      {
        id: 'approved-models',
        heading: 'Approved models',
        body: [
          'Ørsted maintains a list of approved AI models that have passed security and data-handling review. Approved options today include the latest Claude, GPT, and Gemini models running in Ørsted-controlled environments.',
          'Only approved models may be used with company data. Using an unapproved public tool with confidential information is not allowed.',
        ],
      },
      {
        id: 'request-access',
        heading: 'Requesting access',
        body: [
          'Open Self-Service and choose AI Model Access. Describe your use case, pick an environment, and set the data classification. The portal shows which reviews apply before you submit.',
          'For internal or confidential data, keep to Sandbox or Dev while your use case is being reviewed.',
        ],
      },
      {
        id: 'timeline',
        heading: 'What to expect',
        body: [
          'A typical request moves from Submitted to In review, then Approved and Provisioned. Confidential use cases add a security review, which the portal flags on the governance step.',
        ],
      },
    ],
  },
]

export const getDocPage = (id: string): DocPage | undefined =>
  docPages.find((page) => page.id === id)
