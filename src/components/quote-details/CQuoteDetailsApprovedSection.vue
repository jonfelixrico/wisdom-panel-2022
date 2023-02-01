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
            v-for="({ userId, lastReceived, count }, index) of perUserTally"
            :key="userId"
            :class="{
              'q-ml-xs': index > 0,
            }"
          >
            <CQuoteReceiverChip
              :user="{
                serverId: quote.serverId,
                userId,
              }"
              :count="count"
            />
            <q-tooltip>{{
              $t('quote.detailsPage.approvedSection.lastReceived', {
                date: lastReceived.toLocaleString(),
              })
            }}</q-tooltip>
          </div>
        </template>
      </i18n-t>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { groupBy, orderBy } from 'lodash'
import { ApprovedQuote } from 'src/types/quote.interface'
import { defineComponent, PropType } from 'vue'
import CQuoteReceiverChip from './CQuoteReceiverChip.vue'

interface Tally {
  userId: string
  count: number
  lastReceived: Date
}

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

    perUserTally(): Tally[] {
      const { receives } = this.quote
      if (!receives.length) {
        return []
      }

      const grouped = groupBy(this.quote.receives, (r) => r.userId)
      const tally: Tally[] = []

      for (const userId in grouped) {
        const maxMillis = Math.max(
          ...grouped[userId].map(({ timestamp }) => timestamp.getTime())
        )
        const lastReceived = new Date(maxMillis)

        tally.push({
          userId,
          count: grouped[userId].length,
          lastReceived,
        })
      }

      return orderBy(tally, ['count'], ['desc'])
    },
  },

  components: { CQuoteReceiverChip },
})
</script>
