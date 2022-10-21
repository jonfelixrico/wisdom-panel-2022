<template>
  <q-page class="relative-position">
    <ResizeObserverWrapper class="absolute fit">
      <template #default="{ width, height }">
        <ServersLayout :style="{ width: `${width}px`, height: `${height}px` }">
          <router-view />
        </ServersLayout>
      </template>
    </ResizeObserverWrapper>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ServersLayout from 'layouts/ServersLayout.vue'
import ResizeObserverWrapper from 'components/ResizeObserverWrapper.vue'

export default defineComponent({
  components: { ServersLayout, ResizeObserverWrapper },
})
</script>
