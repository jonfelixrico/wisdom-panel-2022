import { defineStore } from 'pinia'
import {
  RESTGetAPICurrentUserResult,
  RESTGetAPICurrentUserGuildsResult,
} from 'discord-api-types/v10'
import { api } from 'src/boot/axios'

interface DiscordData {
  user?: RESTGetAPICurrentUserResult
  servers?: RESTGetAPICurrentUserGuildsResult
}

/**
 * Store for everything related to Discord.
 */
export const useDiscordStore = defineStore('discord', {
  state: (): DiscordData => ({
    user: undefined,
    servers: undefined,
  }),

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
