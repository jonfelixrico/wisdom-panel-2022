import { defineStore } from 'pinia'
import { APIGuild } from 'discord-api-types/v10'

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
    setServer(id: string, serverData: APIGuild | InaccessibleServer) {
      this.servers[id] = serverData
    },
  },
})
