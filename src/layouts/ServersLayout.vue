<template>
  <q-layout view="lHh Lpr lFf" container>
    <q-drawer
      :mini="true"
      side="left"
      v-model="showDrawer"
      class="relative-position"
    >
      <ServerDrawerList class="absolute fit" :servers="servers" />
    </q-drawer>
    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import ServerDrawerList from 'src/components/servers-layout/ServerDrawerList.vue'
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
  components: { ServerDrawerList },
})
</script>
