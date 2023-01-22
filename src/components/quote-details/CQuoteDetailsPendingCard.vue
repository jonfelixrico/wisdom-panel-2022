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
        :plural="requirements.requiredVoteCount"
        tag="div"
      >
        <template #count>
          <span class="text-weight-bold">{{ requirements.voters.length }}</span>
        </template>
        <template #total>
          <span class="text-weight-bold">{{
            requirements.requiredVoteCount
          }}</span>
        </template>
      </i18n-t>

      <i18n-t keypath="quote.detailsPage.pendingSection.upvotedBy" tag="div">
        <template #users>aaa</template>
      </i18n-t>

      <i18n-t
        keypath="quote.detailsPage.pendingSection.deadline"
        tag="div"
        class="text-negative"
      >
        <template #date>
          <span class="text-weight-bold">
            {{ requirements.deadline.toLocaleString() }}
          </span>
        </template>
      </i18n-t>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { ApprovalRequirements } from 'src/stores/quote-store'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    requirements: {
      required: true,
      type: Object as PropType<ApprovalRequirements>,
    },
  },
})
</script>
