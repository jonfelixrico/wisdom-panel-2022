import { useAvatarStore } from 'src/stores/avatar-store'
import { useApi } from './use-api.composable'

export function userAvatarService() {
  const store = useAvatarStore()
  const api = useApi()

  /**
   * Retrieves the avatar URL from the server.
   * Caching is implemented.
   */
  async function getServerMemberAvatarUrl(userId: string, serverId: string) {
    let url = store.servers[serverId]?.userId
    if (!url) {
      const { data } = await api.get<{ url: string }>(
        `server/${serverId}/user/${userId}/avatar`
      )

      url = data.url
      store.setServerMemberAvatarUrl(userId, serverId, url)
    }

    return url
  }

  return {
    /**
     * Fetches the URL to the server member's avatar.
     */
    getAvatarUrl: getServerMemberAvatarUrl,
  }
}
