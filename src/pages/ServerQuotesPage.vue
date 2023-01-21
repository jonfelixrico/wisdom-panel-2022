<template>
  <q-page class="column">
    <q-toolbar class="shadow-1" />
    <div class="col relative-position">
      <q-scroll-area class="absolute-full">
        <div class="q-mx-auto q-pa-sm content-max-width q-gutter-y-sm">
          <CQuoteCard
            v-for="quoteId of listItems"
            :key="quoteId"
            :quote-id="quoteId"
            :server-id="serverId"
          />

          <!-- TODO skeletons while there are no quotes loaded -->
        </div>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script lang="ts">
import { useApi } from 'src/composables/use-api.composable'
import { defineComponent, onMounted, ref } from 'vue'
import CQuoteCard from 'src/components/quote/CQuoteCard.vue'
import { useServerIdParam } from 'src/composables/route-param.composables'

export default defineComponent({
  // TODO implement cursor-based pagination
  setup() {
    const api = useApi()
    const serverId = useServerIdParam()

    async function fetchQuotes(serverId: string) {
      const { data } = await api.get<string[]>(`server/${serverId}/quote`)
      return data
    }
    const listItems = ref<string[]>([])
    onMounted(async () => {
      listItems.value = await fetchQuotes(serverId.value)
    })

    return {
      listItems,
      serverId,
    }
  },

  components: { CQuoteCard },
})
</script>
