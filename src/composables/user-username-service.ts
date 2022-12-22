import { useLogger } from 'src/boot/pino-logger'
import { useUsernameStore } from 'src/stores/username-store'
import { useApi } from './use-api.composable'

export function useUsernameService() {
  const store = useUsernameStore()
  const api = useApi()
  const logger = useLogger('username-service')

  async function getServerMemberUsername(userId: string, serverId: string) {
    const username = store.servers[serverId]?.[userId]
    if (username) {
      // already cached
      return username
    }

    try {
      const { data } = await api.get<{ username: string }>(
        `server/${serverId}/user/${userId}/username`
      )

      store.setServerMemberUsername(userId, serverId, data.username)
      return data.username
    } catch (e) {
      logger.error(
        e,
        `An error was encountered while trying to fetch the username for ${serverId}/${userId}`
      )
    }
  }

  return {
    getUsername: getServerMemberUsername,
  }
}
