<template>
  <q-page class="relative-position">
    <q-resize-observer @resize="size = $event" />
    <q-layout view="lHh LpR fFf" class="absolute" container>
      <q-drawer :model-value="true" class="column">
        <q-toolbar class="shadow-1 justify-between">
          <q-skeleton v-if="!server" type="rect" width="40%" />
          <div v-else class="text-weight-medium">{{ server.name }}</div>

          <q-btn
            flat
            round
            dense
            icon="close"
            color="secondary"
            size="sm"
            @click="$router.push({ name: 'no-server-selected' })"
          />
        </q-toolbar>
        <CServerNavigation class="col" />
      </q-drawer>

      <q-page-container>
        <router-view :key="serverId" />
      </q-page-container>
    </q-layout>
  </q-page>
</template>

<script lang="ts">
import { useServerStore } from 'src/stores/server-store'
import { computed, defineComponent, ref } from 'vue'
import CServerNavigation from 'src/components/server/CServerNavigation.vue'
import { useServerIdParam } from 'src/composables/route-param.composables'

export default defineComponent({
  setup() {
    const serverId = useServerIdParam()
    const size = ref({ width: 0, height: 0 })
    const store = useServerStore()

    return {
      size,
      server: computed(() => store.servers[serverId.value]),
      serverId,
    }
  },

  components: { CServerNavigation },
})
</script>
