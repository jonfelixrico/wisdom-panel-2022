<template>
  <q-card flat>
    <q-card-section class="row">
      <template v-if="quote">
        <div class="col">
          <div class="pre row items-center q-gutter-x-xs">
            <q-badge
              color="warning"
              text-color="black"
              v-if="quote.status === 'PENDING'"
            >
              {{ $t('quote.status.pending') }}
            </q-badge>
            <div
              class="text-h6 text-weight-regular pre"
              v-text="quote.content"
            />
          </div>
          <i18n-t
            keypath="quote.authorFormatWithYear"
            tag="div"
            class="text-weight-regular text-grey-5 row pre items-center"
          >
            <template #user>
              <CQuoteUserBadge
                class="text-white"
                :user="{ userId: quote.authorId, serverId: quote.serverId }"
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
            color="primary"
            unelevated
            :label="$t('quote.toDetailsPage')"
            no-caps
            @click="goToDetailsPage"
          />
        </div>
      </template>

      <template v-else> Loading... </template>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Quote } from 'src/types/quote.interface'
import { defineComponent, PropType } from 'vue'
import CQuoteUserBadge from './CQuoteUserBadge.vue'

export default defineComponent({
  props: {
    quote: {
      type: Object as PropType<Quote>,
      required: true,
    },
  },

  methods: {
    goToDetailsPage() {
      this.$router.push({
        name: 'server-quote-details',
        params: {
          serverId: this.quote.serverId,
          quoteId: this.quote.id,
        },
      })
    },
  },

  components: { CQuoteUserBadge },
})
</script>
