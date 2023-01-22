<template>
  <q-card flat>
    <q-card-section>
      <!-- TODO i18nize these -->
      <div class="q-mb-md">
        <div class="text-h6 text-warning row items-center pre">
          <q-icon name="warning" /> This submission is still pending!
        </div>
        <div class="text-secondary">
          Pending quotes need a certain amount of votes for approval, and cannot
          be shown via the `receive` command until approved.
        </div>
      </div>

      <div>
        This has received {{ requirements.voters.length }} out of
        {{ requirements.voteCount }} votes.
        <span class="text-negative text-weight-medium">
          Voting is only open until 5pm!
        </span>
      </div>
      <div v-if="requirements.voters.length">Upvoted by</div>
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
