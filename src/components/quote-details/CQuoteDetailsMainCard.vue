<template>
  <q-card flat>
    <q-card-section>
      <div class="text-h4 q-mb-sm">"{{ quote.content }}"</div>
      <i18n-t
        keypath="quote.detailsPage.authorFormat"
        class="pre row text-secondary q-mb-xs"
        tag="div"
      >
        <template #user>
          <CQuoteUserBadge :user="author" class="text-white" />
        </template>
      </i18n-t>

      <i18n-t
        keypath="quote.detailsPage.submitterFormat"
        class="pre row text-secondary"
        tag="div"
      >
        <template #user>
          <CQuoteUserBadge :user="submitter" class="text-white" />
        </template>

        <template #date>
          {{ formattedDate }}
        </template>
      </i18n-t>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Quote } from 'src/types/quote.interface'
import { defineComponent, PropType } from 'vue'
import CQuoteUserBadge from '../quote/CQuoteUserBadge.vue'

export default defineComponent({
  props: {
    quote: {
      required: true,
      type: Object as PropType<Quote>,
    },
  },
  computed: {
    author() {
      const { serverId, authorId } = this.quote
      return {
        serverId,
        userId: authorId,
      }
    },

    submitter() {
      const { serverId, submitterId } = this.quote
      return {
        serverId,
        userId: submitterId,
      }
    },

    formattedDate() {
      return this.quote.submitDt.toLocaleDateString()
    },
  },
  components: { CQuoteUserBadge },
})
</script>
