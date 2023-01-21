import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { isAxiosError } from 'src/utils/axios.utils'

export interface InaccessibleServer {
  serverId: string
  noAccess: true
}

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
  servers: Record<string, Server | InaccessibleServer>
}

export const useServerStore = defineStore('server', {
  state: (): Store => ({
    servers: {},
  }),

  actions: {
    async fetchServer(serverId: string): Promise<Server | null> {
      const inStore = this.servers[serverId]
      if (inStore && !inStore.noAccess) {
        return inStore
      }

      try {
        const { data } = await api.get<Server>(`server/${serverId}`)
        this.servers[serverId] = data
        return data
      } catch (e) {
        if (!isAxiosError(e) || e.response?.status !== 403) {
          throw e
        }

        this.servers[serverId] = {
          serverId,
          noAccess: true,
        }
        return null
      }
    },

    async fetchServerList(): Promise<Server[]> {
      const { data } = await api.get<Server[]>('server')

      for (const server of data) {
        this.servers[server.serverId] = server
      }

      return data
    },
  },
})
