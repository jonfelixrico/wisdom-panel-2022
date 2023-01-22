import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { getLogger } from 'src/boot/pino-logger'
import { usePromiseCache } from 'src/utils/promise-cache.utils'

export interface QuoteReceive {
  id: string
  userId: string
}

export interface ApprovalRequirements {
  requiredVoteCount: number
  voters: string[]
}

export interface Quote {
  id: string
  content: string
  authorId: string

  submitterId: string
  submitDt: Date

  serverId: string

  receives: QuoteReceive[]

  /**
   * @deprecated
   * Deprecated in favor of `pendingRequirements`.
   */
  status: 'PENDING' | 'ACCEPTED'

  /**
   * If not null, then it means that the quote is still pending.
   */
  approvalRequirements?: ApprovalRequirements
}

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
        if (!this.servers[serverId]) {
          this.servers[serverId] = {}
          LOGGER.debug(`Created sub-object for ${serverId}.`)
        }

        LOGGER.debug(`Fetching quote ${serverId}/${quoteId}`)

        const { data } = await api.get<Quote>(url)
        data.submitDt = new Date(data.submitDt) // deserialize the date
        this.servers[serverId][quoteId] = data

        LOGGER.info(`Fetched and stored quote ${serverId}/${quoteId}`)

        return data
      })
    },
  },
})
