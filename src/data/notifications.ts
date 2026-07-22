import type { AppNotification } from '@/types'

export const seedNotifications: AppNotification[] = [
  {
    id: 'NTF-01',
    title: 'Your MCP server request was approved',
    body: 'Board Pack Summarizer (REQ-2039) is approved and moving to provisioning.',
    kind: 'approved',
    read: false,
    timeAgo: '2 hours ago',
  },
  {
    id: 'NTF-02',
    title: 'Security review needed',
    body: 'Procurement Contracts MCP (REQ-2048) is confidential and needs a security review before it can be provisioned.',
    kind: 'pending',
    read: false,
    timeAgo: 'Yesterday',
  },
  {
    id: 'NTF-03',
    title: 'New in the Marketplace',
    body: 'Cost Chargeback Explorer is now certified. See what your team is spending on AI.',
    kind: 'info',
    read: true,
    timeAgo: '3 days ago',
  },
]
