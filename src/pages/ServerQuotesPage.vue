<template>
  <q-page class="column">
    <q-toolbar class="shadow-1" />
    <div class="col relative-position">
      <q-scroll-area class="absolute-full">
        <div class="q-mx-auto q-pa-sm content-max-width q-gutter-y-sm">
          <CQuoteCard
            v-for="quote of quotes"
            :key="quote.quoteId"
            :quote-id="quote.quoteId"
            :server-id="serverId"
          />

          <!-- TODO skeletons while there are no quotes loaded -->
        </div>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
import { useApi } from 'src/composables/use-api.composable'
import { computed, defineComponent, onMounted, ref } from 'vue'
import CQuoteCard from 'src/components/quote/CQuoteCard.vue'

interface PartialQuote {
  quoteId: string
}

export default defineComponent({
  // TODO implement cursor-based pagination
  setup() {
    const api = useApi()
    const $route = useRoute()
    const serverId = computed(() => String($route.params.serverId))

    async function fetchQuotes(serverId: string) {
      const { data } = await api.get<PartialQuote[]>(`server/${serverId}/quote`)
      return data
    }
    const quotes = ref<PartialQuote[]>([])
    onMounted(async () => {
      quotes.value = await fetchQuotes(serverId.value)
    })
    return {
      quotes,
      serverId,
    }
  },

  components: { CQuoteCard },
})
</script>
