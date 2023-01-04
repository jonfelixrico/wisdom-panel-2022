export interface QuoteReceive {
  id: string
  userId: string
  timestamp: Date
}

export interface Quote {
  id: string
  content: string
  authorId: string

  submitterId: string
  submitDt: Date

  serverId: string

  receives: QuoteReceive[]
}
