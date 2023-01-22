<template>
  <q-page class="column">
    <q-toolbar class="shadow-1">
      <q-btn icon="arrow_back" flat round dense @click="goBackToList" />
      <q-toolbar-title>{{ $t('quote.detailsPage.title') }}</q-toolbar-title>
    </q-toolbar>
    <div class="col">
      <div class="content-max-width q-mx-auto q-py-sm">
        <CQuoteDetailsMainCard :quote="quote" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { getLogger } from 'src/boot/pino-logger'
import CQuoteDetailsMainCard from 'src/components/quote-details/CQuoteDetailsMainCard.vue'
import { useQuoteStore } from 'src/stores/quote-store'
import { defineComponent, computed } from 'vue'
import { RouteParams, useRoute } from 'vue-router'

const LOGGER = getLogger('ServerQuoteDetails')

function extractIdsFromParams({ quoteId, serverId }: RouteParams) {
  return {
    quoteId: String(quoteId),
    serverId: String(serverId),
  }
}

export default defineComponent({
  setup() {
    const $route = useRoute()
    const store = useQuoteStore()
    return {
      /*
       * We can assume that this is not null because it should've been pre-loaded
       * by `beforeRouteEnter`.
       */
      quote: computed(() => {
        const { quoteId, serverId } = extractIdsFromParams($route.params)
        return store.servers[serverId]?.[quoteId]
      }),
    }
  },

  computed: {
    author() {
      const { serverId, authorId } = this.quote
      return {
        serverId,
        userId: authorId,
      }
    },
  },

  methods: {
    goBackToList() {
      this.$router.push({
        name: 'server-quote-list',
      })
    },
  },

  async beforeRouteEnter(to, from, next) {
    const { quoteId, serverId } = extractIdsFromParams(to.params)
    const store = useQuoteStore()
    try {
      // checks for existence + preloads the quote
      await store.getQuote(quoteId, serverId)
      next()
    } catch (e) {
      LOGGER.error(e, 'Error during beforeRouteEnter')
      // TODO create error dialog
      next(false)
    }
  },
  components: { CQuoteDetailsMainCard },
})
</script>
