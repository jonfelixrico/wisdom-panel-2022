import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

const RELOAD_THRESHOLD = 60 * 1000
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
      if (
        !force &&
        this.lastListFetch &&
        new Date().getTime() - this.lastListFetch.getTime() >= RELOAD_THRESHOLD
      ) {
        return this.servers
      }

      const { data } = await api.get<Record<string, Server>>('server')
      this.servers = data
      this.lastListFetch = new Date()
      return data
    },
  },
})
