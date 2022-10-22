import { defineStore } from 'pinia'
import {
  RESTGetAPICurrentUserResult,
  RESTGetAPICurrentUserGuildsResult,
  RESTAPIPartialCurrentUserGuild,
} from 'discord-api-types/v10'
import { api } from 'src/boot/axios'

interface DiscordData {
  user?: RESTGetAPICurrentUserResult
  servers?: RESTGetAPICurrentUserGuildsResult
}

export const useDiscordStore = defineStore('discord-data', {
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

    async loadUser() {
      const { data } = await api.get<RESTGetAPICurrentUserResult>(
        'discord/user/@me'
      )
      this.user = data
      return data
    },

    async loadServers() {
      const { data } = await api.get<RESTGetAPICurrentUserGuildsResult>(
        'discord/user/@me/server'
      )
      this.servers = data
      return data
    },
  },
})
