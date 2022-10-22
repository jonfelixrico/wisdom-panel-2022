import { defineStore } from 'pinia'
import {
  RESTGetAPICurrentUserResult,
  RESTGetAPICurrentUserGuildsResult,
  RESTGetAPIGuildResult,
  RESTGetAPIGuildMembersResult,
} from 'discord-api-types/v10'

interface DiscordData {
  user?: RESTGetAPICurrentUserResult
  userServers?: RESTGetAPICurrentUserGuildsResult

  serverMap: Record<string, RESTGetAPIGuildResult>
  serverMembersMap: Record<string, RESTGetAPIGuildMembersResult>
}

/**
 * Store for everything related to Discord.
 */
export const useDiscordStore = defineStore('discord', {
  state: (): DiscordData => ({
    user: undefined,
    userServers: undefined,

    serverMap: {},
    serverMembersMap: {},
  }),

  actions: {
    setUser(user: RESTGetAPICurrentUserResult) {
      this.user = user
    },

    setServers(servers: RESTGetAPICurrentUserGuildsResult) {
      this.userServers = servers
    },

    addToServerMap(server: RESTGetAPIGuildResult) {
      this.serverMap[server.id] = server
    },

    addToServerMembersMap(
      serverId: string,
      members: RESTGetAPIGuildMembersResult
    ) {
      this.serverMembersMap[serverId] = members
    },
  },
})
