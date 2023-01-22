<template>
  <q-card flat>
    <q-card-section>
      <div class="text-h6 text-warning">This submission is still pending!</div>
      <div class="text-secondary">
        Pending quotes will never be shown via the `receive` command.
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Quote } from 'src/stores/quote-store'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    quote: {
      required: true,
      type: Object as PropType<Quote>,
    },
  },
})
</script>
