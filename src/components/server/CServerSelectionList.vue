<template>
  <q-scroll-area>
    <div>test</div>
  </q-scroll-area>
</template>

<script lang="ts">
import { orderBy } from 'lodash'
import { useServerStore } from 'src/stores/server-store'
import { computed, defineComponent, onMounted } from 'vue'

export default defineComponent({
  setup() {
    const store = useServerStore()

    onMounted(() => {
      store.fetchServerList()
    })

    return {
      servers: () =>
        computed(() => orderBy(Object.values(store.servers), ['name'], 'asc')),
    }
  },
})
</script>
