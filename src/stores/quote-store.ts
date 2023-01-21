import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { getLogger } from 'src/boot/pino-logger'

export interface QuoteReceive {
  id: string
  userId: string
}

export interface Quote {
  id: string
  content: string
  authorId: string

  submitterId: string
  submitDt: Date

  serverId: string

  receives: QuoteReceive[]

  status: 'PENDING' | 'ACCEPTED'
}

interface Store {
  servers: {
    [serverId: string]: {
      [quoteId: string]: Quote
    }
  }
}

const LOGGER = getLogger('store:quote')

export const useQuoteStore = defineStore('quote', {
  state: (): Store => ({
    servers: {},
  }),

  actions: {
    async getQuote(quoteId: string, serverId: string) {
      const quote = this.servers[serverId]?.[quoteId]
      if (quote) {
        LOGGER.debug(`Quote ${serverId}/${quoteId} was found in the store.`)
        return quote
      }

      if (!this.servers[serverId]) {
        this.servers[serverId] = {}
        LOGGER.debug(`Created sub-object for ${serverId}.`)
      }

      LOGGER.debug(`Fetching quote ${serverId}/${quoteId}`)
      const { data } = await api.get(`server/${serverId}/quote/${quoteId}`)
      this.servers[serverId][quoteId] = data
      LOGGER.info(`Fetched and stored quote ${serverId}/${quoteId}`)
      return data
    },
  },
})
