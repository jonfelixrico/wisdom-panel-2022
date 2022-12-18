import { defineStore } from 'pinia'

export interface Server {
  name: string
}

export type InaccessibleServer = 'NO_ACCESS'

interface ServerMap {
  [serverId: string]: Server | InaccessibleServer
}

interface Store {
  servers: ServerMap
}

export const useCounterStore = defineStore('discord', {
  state: (): Store => ({
    servers: {},
  }),

  actions: {
    setServer(id: string, serverData: Server | InaccessibleServer) {
      this.servers[id] = serverData
    },
  },
})
