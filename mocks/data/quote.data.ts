import { Quote } from 'src/stores/quote-store'

export function generateQuoteListData(count: number): string[] {
  const partials: string[] = []

  for (let i = 1; i <= count; i++) {
    partials.push(`quote-fodder-${i}`)
  }

  return partials
}

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
