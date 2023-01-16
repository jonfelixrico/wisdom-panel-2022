<template>
  <q-page class="row justify-center items-center bg-deep-purple-6">
    <div
      v-if="quote"
      class="column q-gutter-y-sm q-ma-md col-lg-6 col-md-8 col-sm-10"
    >
      <CQuotePreviewCard :quote="quote" />
      <CQuoteDetailsCard :quote="quote" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { api } from 'src/boot/axios'
import { defineComponent, onMounted, ref } from 'vue'
import { getLogger } from 'src/boot/pino-logger'
import { Dialog, useQuasar } from 'quasar'
import { i18n } from 'src/boot/i18n'
import { useRoute } from 'vue-router'
import { useApi } from 'src/composables/use-api.composable'
import { Quote } from 'src/models/quote.interface'
import CQuotePreviewCard from 'src/components/quote/CQuotePreviewCard.vue'
import CQuoteDetailsCard from 'src/components/quote/CQuoteDetailsCard.vue'

function generateErrorDialog() {
  return Dialog.create({
    title: i18n.t('common.dialog.genericError.title'),
    message: i18n.t('common.dialog.genericError.message'),
    ok: {
      unelevated: true,
      color: 'primary',
      dense: true,
    },
    noRouteDismiss: true,
  })
}

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
        // TODO move this to a separate method to hide the implementation details
        const { data } = await api.get<Quote>(
          `server/${serverId}/quote/${quoteId}`
        )
        quote.value = {
          ...data,
          submitDt: new Date(data.submitDt), // this is a serialized date; need to explicitly convert to JS date
        }
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

    // check quote access
    try {
      await api.head(`server/${serverId}/quote/${quoteId}`)
      next()
    } catch (e) {
      logger.error(e, `Error encountered while retrieving quote ${quoteId}`)
      generateErrorDialog()
      next(false)
    }
  },
  components: { CQuotePreviewCard, CQuoteDetailsCard },
})
</script>
