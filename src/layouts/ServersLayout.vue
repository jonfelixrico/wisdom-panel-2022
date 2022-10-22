<template>
  <q-layout view="lHh Lpr lFf" container>
    <q-drawer side="left" v-model="showDrawer" class="relative-position">
      <ServerDrawerList class="absolute fit" :servers="servers ?? []" />
    </q-drawer>
    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import ServerDrawerList from 'src/components/servers-layout/ServerDrawerList.vue'
import { useDiscordDataStore } from 'src/stores/discord-data-store'

export default defineComponent({
  setup() {
    const showDrawer = ref(true)

    const discordData = useDiscordDataStore()

    return {
      showDrawer,
      servers: computed(() => discordData.servers),
    }
  },
  components: { ServerDrawerList },
})
</script>
