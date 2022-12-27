import { defineStore } from 'pinia'

interface ServerMemberAvatars {
  [serverId: string]: {
    [userId: string]: string
  }
}

interface UsernameStore {
  servers: ServerMemberAvatars
}

export const useUsernameStore = defineStore('username', {
  state: (): UsernameStore => ({
    servers: {},
  }),

  actions: {
    setServerMemberUsername(
      userId: string,
      serverId: string,
      username: string
    ) {
      let members = this.servers[serverId]
      if (!members) {
        members = this.servers[serverId] = {}
      }

      members[userId] = username
    },
  },
})
