<template>
  <q-page class="relative-position">
    <q-resize-observer @resize="size = $event" />
    <q-layout view="lHh LpR fFf" class="absolute" container>
      <q-header class="bg-transparent">
        <q-toolbar class="shadow-1">
          <q-toolbar-title>
            <q-skeleton v-if="!server" width="25%" type="rect" />
            <div v-else>{{ server.name }}</div>
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer :model-value="true"> <q-toolbar class="shadow-1" /></q-drawer>

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
})
</script>
