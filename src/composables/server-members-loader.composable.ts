import { RESTGetAPIGuildMembersResult } from 'discord-api-types/v10'
import { useDiscordStore } from 'src/stores/discord-store'
import { useApi } from './api.composable'

export function useServerMembersLoader(serverId: string) {
  const store = useDiscordStore()
  const api = useApi()

  async function load() {
    const { data } = await api.get<RESTGetAPIGuildMembersResult>(
      `discord/server/${serverId}/member`
    )
    store.addToServerMembersMap(serverId, data)
  }

  async function forceLoad() {
    if (!store.serverMembersMap[serverId]) {
      console.debug(
        'Did not load members for server %s: already loaded',
        serverId
      )
      return
    }

    await load()
    console.debug('Member data loaded for server %s', serverId)
  }

  return {
    load,
    forceLoad,
  }
}
