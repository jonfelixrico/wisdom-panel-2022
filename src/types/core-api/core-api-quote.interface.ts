export interface CoreAPIQuote {
  id: string
  content: string
  authorId: string
  submitterId: Date
  submitDt: Date

  serverId: string

  /**
   * Nullish if `isLegacy` is true.
   */
  channelId?: string
  /**
   * Nullish if `isLegacy` is true.
   */
  messageId?: string

  receives: CoreAPIQuoteReceive[]

  /**
   * If null, then Quote is still pending.
   */
  statusDeclaration?: CoreAPIQuoteStatusDeclaration

  votes: Record<string, Date>
  requiredVoteCount: number
  /**
   * Voting deadline.
   */
  expirationDt: Date

  isLegacy: boolean
  revision: number
}

export interface CoreAPIQuoteReceive {
  id: string
  timestamp: Date
  userId: string

  serverId: string

  /**
   * Nullish if `isLegacy` is true.
   */
  channelId?: string
  /**
   * Nullish if `isLegacy` is true.
   */
  messageId?: string

  isLegacy: boolean
}

export interface CoreAPIQuoteStatusDeclaration {
  status: 'EXPIRED' | 'APPROVED'
  timestamp: Date
}

export type CoreRESTGetQuoteResult = CoreAPIQuote
export type CoreRESTGetQuoteList = CoreAPIQuote[]
