<template>
  <q-card flat>
    <q-card-section class="row">
      <div class="col">
        <div class="text-h5">"{{ quote.content }}"</div>
        <i18n-t
          keypath="quote.authorFormat"
          class="pre row text-secondary"
          tag="div"
        >
          <template #user>
            <CQuoteUserBadge :user="author" class="text-white" />
          </template>
        </i18n-t>
      </div>

      <div class="row items-start" v-if="quote.status === 'PENDING'">
        <q-badge color="warning" text-color="black">{{
          $t('quote.status.pending')
        }}</q-badge>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Quote } from 'src/stores/quote-store'
import { defineComponent, PropType } from 'vue'

type PartialQuote = Pick<Quote, 'content' | 'authorId' | 'serverId' | 'status'>

export default defineComponent({
  props: {
    quote: {
      required: true,
      type: Object as PropType<PartialQuote>,
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
  },
})
</script>
