<template>
  <q-page class="flex flex-center bg-deep-purple-6">
    <div class="column q-gutter-y-sm" style="width: 50%">
      <CQuoteCard v-if="quote" :quote="quote" />
      <q-btn unelevated color="white" text-color="black" no-caps>
        Click for more info
      </q-btn>
    </div>
  </q-page>
</template>

<script lang="ts">
import { api } from 'src/boot/axios'
import { defineComponent, onMounted, ref } from 'vue'
import { useDiscordStore } from 'src/stores/discord-store'
import { APIGuild } from 'discord-api-types/v10'
import { getLogger } from 'src/boot/pino-logger'
import { Dialog, useQuasar } from 'quasar'
import axios from 'axios'
import { i18n } from 'src/boot/i18n'
import { useRoute } from 'vue-router'
import { useApi } from 'src/composables/use-api.composable'
import { Quote } from 'src/models/quote.interface'
import CQuoteCard from 'src/components/CQuoteCard.vue'

export default defineComponent({
  setup() {
    const route = useRoute()
    const serverId = route.params.serverId as string
    const quoteId = route.params.quoteId as string
    const api = useApi()
    const { loading } = useQuasar()
    const quote = ref<Quote | null>(null)
    onMounted(async () => {
      loading.show()
      try {
        const { data } = await api.get<Quote>(
          `server/${serverId}/quote/${quoteId}`
        )
        quote.value = data
      } catch (e) {
        // TODO add logging and handling
      } finally {
        loading.hide()
      }
    })
    return {
      quote,
    }
  },
  async beforeRouteEnter(to, from, next) {
    const logger = getLogger('receive-quick-preview:beforeRouteEnter')
    const { params } = to
    const serverId = params.serverId as string
    const quoteId = params.quoteId as string
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
        title: i18n.t('preview.errors.receiveEnter.title'),
        message: i18n.t('preview.errors.receiveEnter.serverNoAccess'),
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
      await api.head(`server/${serverId}/quote/${quoteId}`)
      next()
    } catch (e) {
      logger.error(e, `Error encountered while retrieving quote ${quoteId}`)
      Dialog.create({
        title: i18n.t('preview.errors.receiveEnter.title'),
        message: i18n.t('preview.errors.receiveEnter.generic'),
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
  components: { CQuoteCard },
})
</script>
