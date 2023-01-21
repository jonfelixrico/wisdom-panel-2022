<template>
  <q-card flat>
    <q-card-section class="row">
      <div class="col">
        <div class="text-h5">{{ quote?.content }}</div>
      </div>

      <div class="column justify-center">
        <q-btn
          color="secondary"
          unelevated
          :label="$t('quote.toDetailsPage')"
          no-caps
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { useApi } from 'src/composables/use-api.composable'
import { Quote } from 'src/models/quote.interface'
import { defineComponent, toRefs, watch, ref } from 'vue'

export default defineComponent({
  props: {
    quoteId: {
      type: String,
      required: true,
    },

    serverId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const api = useApi()

    const { quoteId, serverId } = toRefs(props)
    const quote = ref<Quote | null>(null)

    watch(
      [quoteId, serverId],
      async ([quoteId, serverId]) => {
        const { data } = await api.get(`server/${serverId}/quote/${quoteId}`)
        quote.value = data
      },
      {
        immediate: true,
      }
    )

    return {
      quote,
    }
  },
})
</script>
