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
              <CQuoteCard
                v-for="quoteId of listItems"
                :key="quoteId"
                :quote-id="quoteId"
                :server-id="serverId"
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
import CQuoteCard from 'src/components/quote/CQuoteCard.vue'
import { useServerIdParam } from 'src/composables/route-param.composables'
import { getLogger } from 'src/boot/pino-logger'

interface QueryParams {
  cursorId: string
  count: number
}

const COUNT_PER_FETCH = 20
const LOGGER = getLogger('ServerQuotesPage')

export default defineComponent({
  setup() {
    const api = useApi()
    const serverId = useServerIdParam()

    const quoteIdArr = ref<string[]>([])
    const isLoading = ref(false)

    /**
     * This method will be fed into QInfiniteScroll
     * @param index See documentation of QInfiniteScroll for this. For our case, we don't need this since
     * we're using cursor-based pagination.
     * @param done
     */
    async function load(index: number, done: (stop: boolean) => void) {
      const arr = quoteIdArr.value

      const params: Partial<QueryParams> = {
        count: COUNT_PER_FETCH,
      }

      if (arr.length === 0) {
        // This means that we are still on the first page
        params.cursorId = arr[arr.length - 1]
      }

      isLoading.value = true
      let hasNoDataLeft = false
      try {
        const { data } = await api.get<string[]>(
          `server/${serverId.value}/quote`,
          { params }
        )
        quoteIdArr.value.push(...data)
        hasNoDataLeft = data.length < COUNT_PER_FETCH
      } catch (e) {
        LOGGER.error(e, 'Error encountered while loading.')
      } finally {
        done(hasNoDataLeft)
        isLoading.value = false
      }
    }

    return {
      listItems: quoteIdArr,
      serverId,
      load,
      isLoading,
    }
  },

  components: { CQuoteCard },
})
</script>
