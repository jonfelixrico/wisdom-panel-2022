import { Quote } from 'src/models/quote.interface'

export function generatePartialQuotes(count: number) {
  const partials: { quoteId: string }[] = []

  for (let i = 1; i <= count; i++) {
    partials.push({
      quoteId: `quote-fodder-${i}`,
    })
  }

  return partials
}

export function generateQuote(serverId: string, quoteId: string): Quote {
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
