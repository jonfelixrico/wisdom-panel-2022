/**
 * Base interface for quotes.
 */
export interface BaseQuote {
  id: string
  content: string
  authorId: string
  submitterId: Date
  submitDt: Date
  serverId: string
  type: 'APPROVED' | 'PENDING'
}

export interface ApprovedQuote extends BaseQuote {
  type: 'APPROVED'

  receives: {
    id: string
    timestamp: Date
    userId: string
  }[]
}

export interface PendingQuote extends BaseQuote {
  type: 'PENDING'

  expirationDt: Date
  votes: Record<string, Date>
  requiredVoteCount: number
}
