import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

const CACHE_EXPIRE_THRESHOLD = 60 * 1000

export interface Server {
  serverId: string
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
      const CACHE_AGE =
        new Date().getTime() - (this.lastListFetch?.getTime() ?? 0)
      /*
       * Uses the values "cached" in the store if the cache hasn't expired and if we did
       * not use the `force` flag.
       */
      if (
        !force &&
        // check if cache hasn't expired
        CACHE_AGE >= CACHE_EXPIRE_THRESHOLD
      ) {
        return this.servers
      }

      /**
       * This will only happen if the value
       */

      const { data } = await api.get<Record<string, Server>>('server')
      this.servers = data
      this.lastListFetch = new Date()
      return data
    },
  },
})
