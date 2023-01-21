<template>
  <q-page class="relative-position">
    <q-resize-observer @resize="size = $event" />
    <q-layout view="lHh LpR fFf" class="absolute" container>
      <q-drawer :model-value="true" class="column">
        <q-toolbar class="shadow-1" />
        <CServerBanner />
        <CServerMenu class="col" />
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </q-page>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
import { useServerStore } from 'src/stores/server-store'
import { computed, defineComponent, ref } from 'vue'
import CServerMenu from 'src/components/server/CServerMenu.vue'
import CServerBanner from 'src/components/server/CServerBanner.vue'

export default defineComponent({
  setup() {
    const size = ref({ width: 0, height: 0 })
    const store = useServerStore()
    const $route = useRoute()
    return {
      size,
      server: computed(() => store.servers[String($route?.params?.serverId)]),
    }
  },

  components: { CServerMenu, CServerBanner },
})
</script>
