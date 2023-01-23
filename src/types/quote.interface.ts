/**
 * Base interface for quotes.
 */
interface BaseQuote {
  id: string
  content: string
  authorId: string
  submitterId: Date
  submitDt: Date
  serverId: string
  status: string
}

export interface ApprovedQuote extends BaseQuote {
  status: 'APPROVED'

  receives: {
    id: string
    timestamp: Date
    userId: string
  }[]
}

export interface PendingQuote extends BaseQuote {
  status: 'PENDING'

  expirationDt: Date
  votes: Record<string, Date>
  requiredVoteCount: number
}

export function isPendingQuote(quote: BaseQuote): quote is PendingQuote {
  return quote.status === 'PENDING'
}

export function isApprovedQuote(quote: BaseQuote): quote is ApprovedQuote {
  return quote.status === 'APPROVED'
}
