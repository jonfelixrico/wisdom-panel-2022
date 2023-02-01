import { keyBy } from 'lodash'
import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { getLogger } from 'src/boot/pino-logger'

const CACHE_EXPIRE_THRESHOLD = 60 * 1000

export interface Server {
  id: string
  name: string
  iconUrl: string

  /**
   * Only necessary to be defined here because TS seems to keep complaining when we try server.noAccess
   */
  noAccess?: undefined
}

interface Store {
  servers: Record<string, Server>
  lastListFetch: null | Date
}

const LOGGER = getLogger('store:server')

export const useServerStore = defineStore('server', {
  state: (): Store => ({
    servers: {},
    lastListFetch: null,
  }),

  actions: {
    async fetchServer(serverId: string): Promise<Server | null> {
      const servers = await this.fetchAllServers()
      return servers[serverId] ?? null
    },

    async fetchAllServers(force?: boolean): Promise<Record<string, Server>> {
      /*
       * Uses the values "cached" in the store if the cache hasn't expired and if we did
       * not use the `force` flag.
       */
      if (
        !force &&
        this.lastListFetch && // this being null means that this call will be the first time that we have loaded the data
        new Date().getTime() - this.lastListFetch?.getTime() >=
          CACHE_EXPIRE_THRESHOLD // check if the cached value is too old
      ) {
        LOGGER.debug('Reused cached servers object')
        return this.servers
      }

      LOGGER.debug('Fetching the servers list...')
      const { data } = await api.get<Server[]>('server')
      const indexed = keyBy(data, (server) => server.id)

      this.servers = indexed
      this.lastListFetch = new Date()
      LOGGER.info('Finished pulling the server list.')
      return indexed
    },
  },
})
