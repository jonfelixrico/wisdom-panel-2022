<template>
  <q-card flat>
    <q-card-section>
      <div class="text-h6">
        {{
          $t('quote.detailsPage.approvedSection.title', {
            count: receiveCount,
          })
        }}
      </div>
      <div class="text-secondary">
        {{ $t('quote.detailsPage.approvedSection.message') }}
      </div>

      <i18n-t
        v-if="receiveCount"
        keypath="quote.detailsPage.approvedSection.receivedByFormat"
        :plural="receiveCount"
        tag="div"
        class="pre row"
      >
        <template #count>{{ receiveCount }}</template>
        <template #users>
          <div
            v-for="(receive, index) of quote.receives"
            :key="receive.id"
            :class="{
              'q-ml-xs': index > 0,
            }"
          >
            <CQuoteUserBadge
              :user="{
                serverId: quote.serverId,
                userId: receive.userId,
              }"
            />
            <q-tooltip>{{
              $t('quote.detailsPage.approvedSection.lastReceived', {
                date: receive.timestamp.toLocaleString(),
              })
            }}</q-tooltip>
          </div>
        </template>
      </i18n-t>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { ApprovedQuote } from 'src/types/quote.interface'
import { defineComponent, PropType } from 'vue'
import CQuoteUserBadge from '../quote/CQuoteUserBadge.vue'

export default defineComponent({
  props: {
    quote: {
      type: Object as PropType<ApprovedQuote>,
      required: true,
    },
  },

  computed: {
    receiveCount() {
      return this.quote.receives.length
    },
  },

  components: { CQuoteUserBadge },
})
</script>
