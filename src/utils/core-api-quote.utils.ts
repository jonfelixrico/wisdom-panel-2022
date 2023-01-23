import { plainToInstance, Type } from 'class-transformer'
import {
  CoreAPIQuote,
  CoreAPIQuoteReceive,
  CoreAPIQuoteStatusDeclaration,
} from 'src/types/core-api/core-api-quote.interface'
import { ApprovedQuote, PendingQuote } from 'src/types/quote.interface'

class CoreAPIQuoteReceiveTransformer implements CoreAPIQuoteReceive {
  id!: string

  @Type(() => Date)
  timestamp!: Date

  userId!: string
  serverId!: string
  channelId!: string | null
  messageId!: string | null
  isLegacy!: boolean
}

class CoreAPIQuoteStatusDeclarationTransformer
  implements CoreAPIQuoteStatusDeclaration
{
  status!: 'EXPIRED' | 'APPROVED'

  @Type(() => Date)
  timestamp!: Date
}

class CoreAPIQuoteTransformer implements CoreAPIQuote {
  id!: string
  content!: string
  authorId!: string

  submitterId!: string

  @Type(() => Date)
  submitDt!: Date

  serverId!: string
  channelId!: string | null
  messageId!: string | null

  @Type(() => CoreAPIQuoteReceiveTransformer)
  receives!: CoreAPIQuoteReceiveTransformer[]

  @Type(() => CoreAPIQuoteStatusDeclarationTransformer)
  statusDeclaration!: CoreAPIQuoteStatusDeclarationTransformer | null

  votes!: Record<string, Date>
  requiredVoteCount!: number

  @Type(() => Date)
  expirationDt!: Date

  isLegacy!: boolean
  revision!: number
}

export function consumeAPIQuote(
  quote: CoreAPIQuote
): ApprovedQuote | PendingQuote {
  const { statusDeclaration, ...others } = plainToInstance(
    CoreAPIQuoteTransformer,
    quote
  )

  if (!statusDeclaration) {
    return Object.assign(others, { status: 'PENDING' }) as PendingQuote
  } else if (statusDeclaration.status === 'APPROVED') {
    return Object.assign(others, { status: 'APPROVED' }) as ApprovedQuote
  } else {
    throw new Error('Expired quotes are not yet supported.')
  }
}
