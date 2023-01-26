import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { getLogger } from 'src/boot/pino-logger'
import { CoreAPIQuote } from 'src/types/core-api/core-api-quote.interface'
import { Quote } from 'src/types/quote.interface'
import { consumeAPIQuote } from 'src/utils/core-api-quote.utils'
import { usePromiseCache } from 'src/utils/promise-cache.utils'

interface Store {
  servers: {
    [serverId: string]: {
      [quoteId: string]: Quote
    }
  }
}

const LOGGER = getLogger('store:quote')
const promiseCache = usePromiseCache()

export const useQuoteStore = defineStore('quote', {
  state: (): Store => ({
    servers: {},
  }),

  actions: {
    /**
     * Pushes one or more quotes into the store.
     * @param quote
     * @returns
     */
    setQuote(...quotes: Quote[]) {
      for (const quote of quotes) {
        const serverQuotes = this.servers[quote.serverId]

        if (serverQuotes) {
          serverQuotes[quote.id] = quote
          return
        }

        this.servers[quote.serverId] = {
          [quote.id]: quote,
        }
      }
    },

    async getQuote(quoteId: string, serverId: string) {
      const quote = this.servers[serverId]?.[quoteId]
      if (quote) {
        LOGGER.debug(`Quote ${serverId}/${quoteId} was found in the store.`)
        return quote
      }

      const url = `server/${serverId}/quote/${quoteId}`

      /*
       * PromiseCache is being used because we want a unique quote to only have at most one running HTTP
       * call at any given time.
       */
      return await promiseCache.wrap(url, async () => {
        LOGGER.debug(`Fetching quote ${serverId}/${quoteId}`)

        const { data } = await api.get<CoreAPIQuote>(url)
        this.setQuote(consumeAPIQuote(data))

        LOGGER.info(`Fetched and stored quote ${serverId}/${quoteId}`)

        return data
      })
    },
  },
})
