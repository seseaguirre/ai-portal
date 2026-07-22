import type { DataClass, Environment, RequestKind } from '@/types'

export interface RequestForm {
  kind: RequestKind
  name: string
  purpose: string
  owningTeam: string
  environment: Environment
  dataClass: DataClass
  transport: string
  targetSystem: string
  repoUrl: string
  ackResponsibleAi: boolean
}

export const blankForm = (kind: RequestKind): RequestForm => ({
  kind,
  name: '',
  purpose: '',
  owningTeam: '',
  environment: 'sandbox',
  dataClass: 'internal',
  transport: 'HTTP + SSE',
  targetSystem: '',
  repoUrl: '',
  ackResponsibleAi: false,
})

export const stepLabels = [
  'Choose & describe',
  'Configure',
  'Governance',
  'Review & submit',
]

export const isStepValid = (form: RequestForm, step: number): boolean => {
  if (step === 0) {
    return (
      form.name.trim() !== '' &&
      form.purpose.trim() !== '' &&
      form.owningTeam.trim() !== ''
    )
  }
  if (step === 2) return form.ackResponsibleAi
  return true
}
