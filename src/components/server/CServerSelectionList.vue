<template>
  <q-scroll-area>
    <div class="q-gutter-y-sm column items-center">
      <template v-if="!hasFetched">
        <q-skeleton
          v-for="index in SKELETON_COUNT"
          :key="index"
          type="QAvatar"
        />
      </template>

      <template v-else> </template>
    </div>
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
      // TODO add logging
      store.fetchAllServers()
    })

    return {
      serverList: computed(() =>
        orderBy(Object.values(store.servers), ['name'], 'asc')
      ),
      hasFetched: computed(() => !!store.lastListFetch),
      SKELETON_COUNT: 5,
    }
  },
})
</script>
