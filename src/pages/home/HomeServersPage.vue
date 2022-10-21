<template>
  <q-page class="relative-position">
    <q-resize-observer @resize="size = $event" />
    <ServersLayout
      class="absolute"
      :style="{ width: `${size.width}px`, height: `${size.height}px` }"
    >
      <router-view />
    </ServersLayout>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const size = ref({
      width: 0,
      height: 0,
    })

    return {
      size,
    }
  },
})
</script>
