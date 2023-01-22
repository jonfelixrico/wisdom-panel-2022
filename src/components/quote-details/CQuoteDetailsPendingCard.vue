<template>
  <q-card flat>
    <q-card-section>
      <!-- TODO i18nize these -->
      <div>
        <div class="text-h6 text-warning row items-center pre">
          <q-icon name="warning" /> This submission is still pending!
        </div>
        <div class="text-secondary">
          Pending quotes cannot be shown via the `receive` command.
        </div>
      </div>

      <div>
        This quote needs {{ quote.approvalRequirements.voteCount }} votes.
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Quote, ApprovalRequirements } from 'src/stores/quote-store'
import { defineComponent, PropType } from 'vue'

export interface PendingQuote extends Quote {
  approvalRequirements: ApprovalRequirements
}

export default defineComponent({
  props: {
    quote: {
      required: true,
      type: Object as PropType<PendingQuote>,
    },
  },
})
</script>
