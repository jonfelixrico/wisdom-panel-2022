import { defineStore } from 'pinia'
import {
  RESTGetAPICurrentUserResult,
  RESTGetAPICurrentUserGuildsResult,
  RESTAPIPartialCurrentUserGuild,
} from 'discord-api-types/v10'

interface DiscordData {
  user?: RESTGetAPICurrentUserResult
  servers?: RESTGetAPICurrentUserGuildsResult
}

export const useDiscordDataStore = defineStore('discord-data', {
  state: (): DiscordData => ({
    user: undefined,
    servers: undefined,
  }),

  getters: {
    isAuthenticated(): boolean {
      return !!this.user
    },

    serversIndexedById(): Record<string, RESTAPIPartialCurrentUserGuild> {
      const map: Record<string, RESTAPIPartialCurrentUserGuild> = {}

      for (const server of this.servers ?? []) {
        map[server.id] = server
      }

      return map
    },
  },

  actions: {
    setUser(user: RESTGetAPICurrentUserResult) {
      this.user = user
    },

    setServers(servers: RESTGetAPICurrentUserGuildsResult) {
      this.servers = servers
    },
  },
})
