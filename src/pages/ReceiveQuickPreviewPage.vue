<template>
  <q-page> initial page </q-page>
</template>

<script lang="ts">
import { api } from 'src/boot/axios'
import { defineComponent } from 'vue'
import { useDiscordStore } from 'src/stores/discord-store'
import { APIGuild } from 'discord-api-types/v10'
import { getLogger } from 'src/boot/pino-logger'

export default defineComponent({
  async beforeRouteEnter(to, from, next) {
    const logger = getLogger('receive-quick-preview:beforeRouteEnter')

    const { params } = to
    const serverId = params.serverId as string
    const receiveId = params.receiveId as string

    const store = useDiscordStore()

    // check server access
    let server = store.servers[serverId]
    if (!server) {
      try {
        const { data } = await api.get<APIGuild>(`/server/${serverId}`)
        server = data
      } catch (e) {
        // TODO only do next if 404 is detected
        logger.error(e, `Error encountered while retrieving server ${serverId}`)
        next(false)
        return
      }
    } else if (server === 'NO_ACCESS') {
      logger.warn(
        `User has no acccess to server ${serverId}, aborting navigation`
      )
      next(false)
      return
    }

    // check quote access
    try {
      await api.head(`server/${serverId}/receive/${receiveId}`)
      next()
    } catch (e) {
      // TODO check if 404 was encountered
      logger.error(e, `Error encountered while checking receive ${receiveId}`)
      next(false)
    }
  },
})
</script>
