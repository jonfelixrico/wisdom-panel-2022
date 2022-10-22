import { defineStore } from 'pinia'
import { Quote } from 'src/types/quote.interface'

interface QuoteStore {
  quotes: Quote[] | null
}

export const useQuotesStore = defineStore('quotes', {
  state: (): QuoteStore => ({
    quotes: null,
  }),

  actions: {
    addQuotes(quotes: Quote[]) {
      if (!this.quotes) {
        this.quotes = quotes
        return
      }

      quotes.push(...quotes)
    },
  },
})
