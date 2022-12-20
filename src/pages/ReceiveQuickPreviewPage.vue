<template>
  <q-page> initial page </q-page>
</template>

<script lang="ts">
import { api } from 'src/boot/axios'
import { defineComponent } from 'vue'
import { useDiscordStore } from 'src/stores/discord-store'
import { APIGuild } from 'discord-api-types/v10'
import { getLogger } from 'src/boot/pino-logger'
import { Dialog } from 'quasar'
import axios, { AxiosError } from 'axios'

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
        if (axios.isAxiosError(e) && e?.response?.status === 403) {
          server = 'NO_ACCESS'
        } else {
          logger.error(
            e,
            `An error was encountered while retrieving server ${serverId}`
          )
          next(false)
        }
      }

      store.setServer(serverId, server)
    }

    if (server === 'NO_ACCESS') {
      logger.warn(
        `User has no acccess to server ${serverId}, aborting navigation`
      )

      Dialog.create({
        title: 'Server restricted',
        message: 'You have no access to the server',
        ok: {
          unelevated: true,
          color: 'primary',
          dense: true,
        },
      }).onDismiss(() => {
        next(false)
      })
      return
    }

    // check quote access
    try {
      await api.head(`server/${serverId}/receive/${receiveId}`)
      next()
    } catch (e) {
      logger.error(e, `Error encountered while checking receive ${receiveId}`)
      Dialog.create({
        title: 'Error',
        message: 'An error was encoutered while trying to retrieve the data',
        ok: {
          unelevated: true,
          color: 'primary',
          dense: true,
        },
      }).onDismiss(() => {
        next(false)
      })
    }
  },
})
</script>
