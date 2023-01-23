<template>
  <q-page class="column">
    <q-toolbar class="shadow-1 row justify-end">
      <q-spinner v-if="isLoading" />
    </q-toolbar>
    <div class="col relative-position">
      <q-scroll-area class="absolute-full">
        <q-infinite-scroll @load="load">
          <template #default>
            <div class="q-mx-auto q-pa-sm content-max-width q-gutter-y-sm">
              <CQuoteListCard
                v-for="quote of quotes"
                :key="quote.id"
                :quote="quote"
              />

              <!-- TODO skeletons while there are no quotes loaded -->
            </div>
          </template>

          <template #loading>
            <div class="row justify-center">
              <q-spinner />
            </div>
          </template>
        </q-infinite-scroll>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script lang="ts">
import { useApi } from 'src/composables/use-api.composable'
import { defineComponent, ref } from 'vue'
import { useServerIdParam } from 'src/composables/route-param.composables'
import { getLogger } from 'src/boot/pino-logger'
import { Quote } from 'src/types/quote.interface'
import { CoreAPIQuote } from 'src/types/core-api/core-api-quote.interface'
import { consumeAPIQuote } from 'src/utils/core-api-quote.utils'
import CQuoteListCard from 'src/components/quote/CQuoteListCard.vue'
import { useQuoteStore } from 'src/stores/quote-store'

interface QueryParams {
  cursorId: string
  count: number
}

const COUNT_PER_FETCH = 20
const LOGGER = getLogger('ServerQuoteList')

export default defineComponent({
  setup() {
    const api = useApi()
    const serverId = useServerIdParam()
    const store = useQuoteStore()
    const quotes = ref<Quote[]>([])
    const isLoading = ref(false)

    function setQuotes(quotes: Quote[]) {
      for (const q of quotes) {
        store.setQuote(q)
      }
    }

    /**
     * This method will be fed into QInfiniteScroll
     * @param index See documentation of QInfiniteScroll for this. For our case, we don't need this since
     * we're using cursor-based pagination.
     * @param done
     */
    async function load(index: number, done: (stop: boolean) => void) {
      const arr = quotes.value
      const params: Partial<QueryParams> = {
        count: COUNT_PER_FETCH,
      }

      if (arr.length === 0) {
        // This means that we are still on the first page
        params.cursorId = arr[arr.length - 1].id
      }

      isLoading.value = true
      let hasNoDataLeft = false

      try {
        const { data } = await api.get<CoreAPIQuote[]>(
          `server/${serverId.value}/quote`,
          { params }
        )
        const consumed = data.map(consumeAPIQuote)
        setQuotes(consumed)

        quotes.value.push(...data.map(consumeAPIQuote))
        hasNoDataLeft = data.length < COUNT_PER_FETCH

        if (hasNoDataLeft) {
          LOGGER.debug('Reached the end of the data to fetch.')
        }
      } catch (e) {
        LOGGER.error(e, 'Error encountered while loading.')
      } finally {
        done(hasNoDataLeft)
        isLoading.value = false
      }
    }

    return {
      quotes,
      load,
      isLoading,
    }
  },

  components: { CQuoteListCard },
})
</script>
