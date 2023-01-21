<template>
  <q-card flat>
    <q-card-section class="row">
      <template v-if="quote">
        <div class="col">
          <div class="text-h6 text-weight-regular">"{{ quote?.content }}"</div>
          <i18n-t
            keypath="quote.authorFormat"
            tag="div"
            class="text-weight-regular"
          >
            <template #author>{{ quote?.authorId }}</template>
            <template #year>{{
              new Date(quote?.submitDt).getFullYear()
            }}</template>
          </i18n-t>
        </div>

        <div class="column justify-center">
          <q-btn
            color="secondary"
            unelevated
            :label="$t('quote.toDetailsPage')"
            no-caps
          />
        </div>
      </template>

      <template v-else> Loading... </template>
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
