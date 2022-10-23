<template>
  <q-layout view="lHh Lpr lFf" container>
    <q-drawer
      :mini="true"
      side="left"
      v-model="showDrawer"
      class="relative-position"
    >
      <ServerSelectionList class="absolute fit" :servers="servers" />
    </q-drawer>

    <q-page-container>
      <slot>
        <router-view />
      </slot>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import ServerSelectionList from './ServerSelectionList.vue'
import { useDiscordStore } from 'src/stores/discord-store'

export default defineComponent({
  setup() {
    const showDrawer = ref(true)

    const discordData = useDiscordStore()

    return {
      showDrawer,
      servers: computed(() => discordData.userServers ?? []),
    }
  },

  components: { ServerSelectionList },
})
</script>
