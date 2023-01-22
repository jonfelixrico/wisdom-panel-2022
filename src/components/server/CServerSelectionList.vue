<template>
  <q-scroll-area :visible="false">
    <div class="q-gutter-y-sm column">
      <template v-if="!hasFetched">
        <q-skeleton
          v-for="index in SKELETON_COUNT"
          :key="index"
          type="QAvatar"
        />
      </template>

      <template v-else>
        <CServerSelectionListItem
          v-for="server of serverList"
          :key="server.serverId"
          :server="server"
          :is-active="server.serverId === selectedServerId"
          @click="selectedServerId = server.serverId"
        />
      </template>

      <!-- TODO add item that allows the user to add the bot to their server -->
    </div>
  </q-scroll-area>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { orderBy } from 'lodash'
import { useServerStore } from 'src/stores/server-store'
import { computed, defineComponent, onMounted } from 'vue'
import { getLogger } from 'src/boot/pino-logger'
import CServerSelectionListItem from './CServerSelectionListItem.vue'

const LOGGER = getLogger('component:server-selection-list')

export default defineComponent({
  components: { CServerSelectionListItem },
  setup() {
    const store = useServerStore()
    const $router = useRouter()

    const selectedServerId = computed({
      get() {
        return String($router.currentRoute.value.params.serverId)
      },
      async set(serverId: string) {
        LOGGER.debug(`Changing selected server to ${serverId}...`)
        await $router.push({
          name: 'server-index',
          params: {
            serverId,
          },
        })
        LOGGER.info(`Selected server has been changed to ${serverId}`)
      },
    })

    onMounted(() => {
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
