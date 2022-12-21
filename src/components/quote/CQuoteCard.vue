<template>
  <q-card>
    <q-card-section> </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Quote } from 'src/models/quote.interface'
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
