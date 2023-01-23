import type { Quote } from 'src/stores/quote-store'
import type { CoreAPIQuote } from 'src/types/core-api/core-api-quote.interface'

export function generateQuoteListData(count: number): string[] {
  const partials: string[] = []

  for (let i = 1; i <= count; i++) {
    partials.push(`quote-fodder-${i}`)
  }

  return partials
}

/**
 * @deprecated in favor of @method generateFodderQuote
 * @param serverId
 * @param quoteId
 * @returns
 */
export function generateQuote(
  serverId: string,
  quoteId: string
): Omit<Quote, 'status'> {
  return {
    id: quoteId,
    serverId,
    authorId: 'user-1',
    submitterId: 'user-2',
    content: `Fodder -- id ${quoteId} of server ${serverId}`,
    receives: [],
    submitDt: new Date('2022-01-01'),
  }
}

export function generateFodderQuote(
  serverId: string,
  seq: number | string
): Partial<CoreAPIQuote> {
  const quoteId = `fodder-quote-${seq}`
  return {
    id: `fodder-quote-${seq}`,
    serverId,
    authorId: 'user-1',
    submitterId: 'user-2',
    content: `Fodder -- id ${quoteId} of server ${serverId}`,
    receives: [],
    submitDt: new Date('2022-01-01'),
    statusDeclaration: null,
    votes: {},
  }
}
