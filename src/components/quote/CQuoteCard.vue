<template>
  <q-card flat>
    <q-card-section class="row">
      <template v-if="quote">
        <div class="col">
          <div class="text-h6 text-weight-regular">"{{ quote?.content }}"</div>
          <i18n-t
            keypath="quote.authorFormat"
            tag="div"
            class="text-weight-regular text-grey-5 row pre items-center"
          >
            <template #author>
              <CQuoteUserBadge
                class="text-white"
                :user="{ userId: quote.authorId, serverId }"
              />
            </template>
            <template #year>
              <div class="text-weight-medium">
                {{ new Date(quote?.submitDt).toLocaleDateString() }}
              </div>
            </template>
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
import { defineComponent } from 'vue'
import CQuoteUserBadge from './CQuoteUserBadge.vue'
import { useQuoteLoader } from './quote.composables'

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
    const quote = useQuoteLoader(props)

    return {
      quote,
    }
  },
  components: { CQuoteUserBadge },
})
</script>
