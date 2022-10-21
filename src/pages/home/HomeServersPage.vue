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
import ServersLayout from 'layouts/ServersLayout.vue'

export default defineComponent({
  components: { ServersLayout },
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
