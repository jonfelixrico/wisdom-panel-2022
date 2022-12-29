import { defineStore } from 'pinia'
import { APIGuild } from 'discord-api-types/v10'
import { api } from 'src/boot/axios'
import { isAxiosError } from 'src/utils/axios.utils'

export type InaccessibleServer = 'NO_ACCESS'

interface ServerMap {
  [serverId: string]: APIGuild | InaccessibleServer
}

interface Store {
  servers: ServerMap
}

export const useServerStore = defineStore('server', {
  state: (): Store => ({
    servers: {},
  }),

  actions: {
    /**
     * @deprecated
     * @param id
     * @param serverData
     */
    setServer(id: string, serverData: APIGuild | InaccessibleServer) {
      this.servers[id] = serverData
    },

    async fetchServer(serverId: string) {
      const inStore = this.servers[serverId]
      if (inStore) {
        return inStore
      }

      try {
        const { data } = await api.get<APIGuild>(`server/${serverId}`)
        this.servers[serverId] = data
        return data
      } catch (e) {
        if (isAxiosError(e) && e.response?.status === 403) {
          this.servers[serverId] = 'NO_ACCESS'
          return 'NO_ACCESS'
        }

        throw e
      }
    },
  },
})
