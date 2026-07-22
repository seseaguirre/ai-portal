import { create } from 'zustand'
import type { ProvisioningRequest } from '@/types'
import { seedRequests } from '@/data/requests'

interface NewRequestInput {
  kind: ProvisioningRequest['kind']
  name: string
  purpose: string
  owningTeam: string
  environment: ProvisioningRequest['environment']
  dataClass: ProvisioningRequest['dataClass']
  transport?: string
  targetSystem?: string
  repoUrl?: string
  requestedBy: string
}

interface RequestState {
  requests: ProvisioningRequest[]
  createRequest: (input: NewRequestInput) => ProvisioningRequest
  approveRequest: (id: string, reviewer: string) => void
  rejectRequest: (id: string, reviewer: string, reason: string) => void
}

const todayIso = () => new Date().toISOString().slice(0, 10)

const nextRequestId = (requests: ProvisioningRequest[]): string => {
  const numbers = requests.map((r) => Number(r.id.replace('REQ-', '')))
  return `REQ-${Math.max(0, ...numbers) + 1}`
}

export const useRequestStore = create<RequestState>((set) => ({
  requests: seedRequests,
  createRequest: (input) => {
    const request: ProvisioningRequest = {
      ...input,
      id: nextRequestId(useRequestStore.getState().requests),
      submittedOn: todayIso(),
      state: { status: 'submitted' },
    }
    set((prev) => ({ requests: [request, ...prev.requests] }))
    return request
  },
  approveRequest: (id, reviewer) =>
    set((prev) => ({
      requests: prev.requests.map((r) =>
        r.id === id
          ? { ...r, state: { status: 'approved', reviewer, approvedOn: todayIso() } }
          : r,
      ),
    })),
  rejectRequest: (id, reviewer, reason) =>
    set((prev) => ({
      requests: prev.requests.map((r) =>
        r.id === id
          ? { ...r, state: { status: 'rejected', reviewer, reason } }
          : r,
      ),
    })),
}))
