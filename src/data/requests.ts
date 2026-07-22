import type { ProvisioningRequest } from '@/types'

/** Seed requests spanning the full lifecycle for the My Requests table. */
export const seedRequests: ProvisioningRequest[] = [
  {
    id: 'REQ-2048',
    kind: 'mcp',
    name: 'Procurement Contracts MCP',
    purpose: 'Let the sourcing team query supplier contracts in plain language.',
    owningTeam: 'Procurement — Sourcing',
    environment: 'dev',
    dataClass: 'confidential',
    transport: 'HTTP + SSE',
    targetSystem: 'SAP Ariba',
    submittedOn: '2026-07-14',
    requestedBy: 'Freja Holm',
    state: { status: 'in-review', reviewer: 'Priya Menon' },
  },
  {
    id: 'REQ-2039',
    kind: 'skill',
    name: 'Board Pack Summarizer',
    purpose: 'Summarize quarterly board packs into a one-page brief.',
    owningTeam: 'Finance — Reporting',
    environment: 'prod',
    dataClass: 'confidential',
    submittedOn: '2026-07-02',
    requestedBy: 'Freja Holm',
    state: {
      status: 'approved',
      reviewer: 'Priya Menon',
      approvedOn: '2026-07-08',
    },
  },
  {
    id: 'REQ-2021',
    kind: 'agent-workspace',
    name: 'HSE Reporting Workspace',
    purpose: 'Shared workspace for the safety team to triage incident reports.',
    owningTeam: 'Health & Safety — Offshore',
    environment: 'prod',
    dataClass: 'internal',
    submittedOn: '2026-06-19',
    requestedBy: 'Anders Vestergaard',
    state: {
      status: 'provisioned',
      reviewer: 'Priya Menon',
      approvedOn: '2026-06-24',
    },
  },
  {
    id: 'REQ-2007',
    kind: 'model-access',
    name: 'Claude Opus — Trading desk',
    purpose: 'Access to an approved frontier model for market commentary drafts.',
    owningTeam: 'Trading — Power',
    environment: 'sandbox',
    dataClass: 'internal',
    submittedOn: '2026-06-05',
    requestedBy: 'Anders Vestergaard',
    state: {
      status: 'rejected',
      reviewer: 'Priya Menon',
      reason:
        'Confidential trading positions were listed as example inputs. Resubmit with a sandbox dataset and no live position data.',
    },
  },
]
