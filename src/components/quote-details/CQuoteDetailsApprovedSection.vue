<template>
  <q-card flat>
    <q-card-section>
      <div class="q-mb-md">
        <div class="text-h6 text-warning row items-center pre">
          <q-icon name="warning" />
          {{ $t('quote.detailsPage.approvedSection.title') }}
        </div>
        <div class="text-secondary">
          {{ $t('quote.detailsPage.approvedSection.message') }}
        </div>
      </div>

      <i18n-t
        keypath="quote.detailsPage.approvedSection.receivedByFormat"
        :plural="quote.receives.length"
        tag="div"
        class="pre row"
      >
        <template #count>{{ quote.receives.length }}</template>
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

  components: { CQuoteUserBadge },
})
</script>
