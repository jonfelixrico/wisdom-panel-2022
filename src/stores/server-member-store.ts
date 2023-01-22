import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { usePromiseCache } from 'src/utils/promise-cache.utils'

const promiseCache = usePromiseCache()

interface ServerMember {
  username: string
  avatarUrl: string
}

interface ServerMemberStore {
  servers: {
    [serverId: string]: {
      [userId: string]: ServerMember
    }
  }
}

export const userServerMemberStore = defineStore('server-member', {
  state: (): ServerMemberStore => {
    return {
      servers: {},
    }
  },
  actions: {
    async fetchServerMember(
      serverId: string,
      userId: string
    ): Promise<ServerMember> {
      const member = this.servers[serverId]?.[userId]
      if (member) {
        return member
      }

      const url = `server/${serverId}/user/${userId}`
      return await promiseCache.wrap(url, async () => {
        let server = this.servers[serverId]
        if (!server) {
          this.servers[serverId] = {}
          server = this.servers[serverId]
        }

        const { data } = await api.get<ServerMember>(
          `server/${serverId}/user/${userId}`
        )

        server[userId] = data
        return data
      })
    },
  },
})
