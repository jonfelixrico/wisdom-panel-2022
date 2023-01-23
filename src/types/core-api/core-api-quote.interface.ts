export interface CoreAPIQuote {
  id: string
  content: string
  authorId: string
  submitterId: string
  submitDt: Date

  serverId: string

  /**
   * Nullish if `isLegacy` is true.
   */
  channelId: string | null
  /**
   * Nullish if `isLegacy` is true.
   */
  messageId: string | null

  receives: CoreAPIQuoteReceive[] | null

  /**
   * If null, then Quote is still pending.
   */
  statusDeclaration: CoreAPIQuoteStatusDeclaration | null

  votes: Record<string, Date> | null
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
  channelId: string | null
  /**
   * Nullish if `isLegacy` is true.
   */
  messageId: string | null

  isLegacy: boolean
}

export interface CoreAPIQuoteStatusDeclaration {
  status: 'EXPIRED' | 'APPROVED'
  timestamp: Date
}

export type CoreRESTGetQuoteResult = CoreAPIQuote
export type CoreRESTGetQuoteList = CoreAPIQuote[]
