<template>
  <q-page class="relative-position">
    <ResizeObserverWrapper class="absolute fit">
      <template #default="{ width, height }">
        <ServerDetailsLayout
          :style="{ width: `${width}px`, height: `${height}px` }"
        >
          <router-view />
        </ServerDetailsLayout>
      </template>
    </ResizeObserverWrapper>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ResizeObserverWrapper from 'components/common/ResizeObserverWrapper.vue'
import ServerDetailsLayout from 'src/layouts/server-details/ServerDetailsLayout.vue'

export default defineComponent({
  components: {
    ResizeObserverWrapper,
    ServerDetailsLayout,
  },
})
</script>
