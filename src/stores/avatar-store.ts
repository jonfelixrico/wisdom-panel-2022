import { defineStore } from 'pinia'

interface ServerMemberAvatars {
  [serverId: string]: {
    [userId: string]: string
  }
}

interface AvatarStore {
  servers: ServerMemberAvatars
}

export const useAvatarStore = defineStore('avatar', {
  state: (): AvatarStore => ({
    servers: {},
  }),

  actions: {
    setServerMemberAvatarUrl(userId: string, serverId: string, url: string) {
      let members = this.servers[serverId]
      if (!members) {
        members = this.servers[serverId] = {}
      }

      members[userId] = url
    },
  },
})
