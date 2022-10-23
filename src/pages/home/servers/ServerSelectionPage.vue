<template>
  <q-page class="relative-position">
    <ResizeObserverWrapper class="absolute fit">
      <template #default="{ width, height }">
        <ServerSelectionLayout
          :style="{ width: `${width}px`, height: `${height}px` }"
        >
          <router-view />
        </ServerSelectionLayout>
      </template>
    </ResizeObserverWrapper>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import ResizeObserverWrapper from 'components/common/ResizeObserverWrapper.vue'
import { useUserServersLoader } from 'src/composables/user-servers-loader.composable'
import ServerSelectionLayout from 'src/layouts/server-selection/ServerSelectionLayout.vue'

export default defineComponent({
  components: { ResizeObserverWrapper, ServerSelectionLayout },

  setup() {
    const { load } = useUserServersLoader()
    onMounted(load)
  },
})
</script>
