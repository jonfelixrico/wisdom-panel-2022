<template>
  <div>test</div>
</template>

<script lang="ts">
import { Server } from 'src/stores/server-store'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    server: {
      required: true,
      type: Object as PropType<Server>,
    },
  },
})
</script>
