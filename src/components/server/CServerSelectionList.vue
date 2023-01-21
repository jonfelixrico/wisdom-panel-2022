<template>
  <q-scroll-area :visible="false">
    <div class="q-gutter-y-sm column items-center">
      <template v-if="!hasFetched">
        <q-skeleton
          v-for="index in SKELETON_COUNT"
          :key="index"
          type="QAvatar"
        />
      </template>

      <template v-else>
        <q-btn
          round
          unelevated
          v-for="server of serverList"
          :key="server.serverId"
          @click="selectedServerId = server.serverId"
        >
          <q-avatar>
            <q-img :src="server.iconUrl" />
          </q-avatar>
        </q-btn>
      </template>
    </div>
  </q-scroll-area>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { orderBy } from 'lodash'
import { useServerStore } from 'src/stores/server-store'
import { computed, defineComponent, onMounted } from 'vue'

export default defineComponent({
  setup() {
    const store = useServerStore()
    const $router = useRouter()

    const selectedServerId = computed({
      get() {
        return String($router.currentRoute.value.params.serverId)
      },
      set(serverId: string) {
        $router.push({
          name: 'server-index',
          params: {
            serverId,
          },
        })
      },
    })

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
      selectedServerId,
    }
  },
})
</script>
