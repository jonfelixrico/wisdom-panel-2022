<template>
  <q-card flat>
    <q-card-section> aa </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    quoteId: {
      type: String,
      required: true,
    },

    serverId: {
      type: String,
      required: true,
    },
  },
})
</script>
