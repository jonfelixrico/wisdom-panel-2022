<template>
  <q-card flat>
    <q-card-section>
      <div class="q-mb-md">
        <div class="text-h6 text-warning row items-center pre">
          <q-icon name="warning" />
          {{ $t('quote.detailsPage.pendingSection.title') }}
        </div>
        <div class="text-secondary">
          {{ $t('quote.detailsPage.pendingSection.message') }}
        </div>
      </div>

      <i18n-t
        keypath="quote.detailsPage.pendingSection.voteCount"
        :plural="quote.requiredVoteCount"
        tag="div"
      >
        <template #count>
          <span class="text-weight-bold">{{ votes.length }}</span>
        </template>
        <template #total>
          <span class="text-weight-bold">{{ quote.requiredVoteCount }}</span>
        </template>
      </i18n-t>

      <i18n-t
        v-if="votes.length"
        keypath="quote.detailsPage.pendingSection.upvotedBy"
        tag="div"
        class="pre row"
      >
        <template #users>
          <template v-for="(vote, index) of votes" :key="vote.userId">
            <CQuoteUserBadge
              :user="{ serverId: quote.serverId, userId: vote.userId }"
              :class="{ 'q-ml-xs': index > 0 }"
            />
          </template>
        </template>
      </i18n-t>

      <i18n-t
        keypath="quote.detailsPage.pendingSection.deadline"
        tag="div"
        class="text-negative"
      >
        <template #date>
          <span class="text-weight-bold">
            {{ quote.expirationDt.toLocaleString() }}
          </span>
        </template>
      </i18n-t>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { PendingQuote } from 'src/types/quote.interface'
import { defineComponent, PropType } from 'vue'
import CQuoteUserBadge from '../quote/CQuoteUserBadge.vue'

interface Voter {
  userId: string
  timestamp: Date
}

export default defineComponent({
  props: {
    quote: {
      type: Object as PropType<PendingQuote>,
      required: true,
    },
  },

  computed: {
    votes() {
      const { votes = {} } = this.quote
      const arr: Voter[] = []

      for (const userId in votes) {
        arr.push({
          userId,
          timestamp: votes[userId],
        })
      }

      return arr
    },
  },

  components: { CQuoteUserBadge },
})
</script>
