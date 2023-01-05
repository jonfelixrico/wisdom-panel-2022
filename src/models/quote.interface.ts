export interface QuoteReceive {
  id: string
  userId: string
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
