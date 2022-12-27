export interface QuoteReceive {
  id: string
  receiverId: string
  receiveDt: Date
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
