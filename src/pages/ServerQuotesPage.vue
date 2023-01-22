<template>
  <q-page class="column">
    <q-toolbar class="shadow-1" />
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

export default defineComponent({
  setup() {
    const api = useApi()
    const serverId = useServerIdParam()

    const listItems = ref<string[]>([])

    async function load(_: number, done: () => void) {
      try {
        const { data } = await api.get<string[]>(
          `server/${serverId.value}/quote`,
          {
            params: {
              cursorId:
                listItems.value.length === 0
                  ? undefined
                  : listItems.value[listItems.value.length - 1],
              count: 3,
            },
          }
        )
        listItems.value.push(...data)
      } finally {
        done()
      }
    }

    return {
      listItems,
      serverId,
      load,
    }
  },

  components: { CQuoteCard },
})
</script>
