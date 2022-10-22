import { defineStore } from 'pinia'
import { Quote } from 'src/types/quote.interface'

interface QuoteStore {
  quotes: Quote[]
}

export const useQuotesStore = defineStore('quotes', {
  state: (): QuoteStore => ({
    quotes: [],
  }),

  actions: {
    addQuotes(quotes: Quote[]) {
      quotes.push(...quotes)
    },
  },
})
