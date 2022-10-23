<template>
  <q-layout view="lHh Lpr lFf" container>
    <q-drawer side="left" :model-value="true" class="column q-pa-md" bordered>
      <!-- server details section -->
      <div v-if="server">
        <div class="text-h5">{{ server.name }}</div>
      </div>
      <div v-else>
        <q-skeleton type="rect" />
      </div>

      <q-separator class="q-my-md" />

      <!-- navigation section -->
      <q-scroll-area class="col">
        <q-list dense>
          <q-item
            clickable
            :active="$route.name === 'server-quotes'"
            @click="$router.push({ name: 'server-quotes' })"
          >
            <q-item-section>
              {{ $t('server.navigation.allQuotes') }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <slot>
        <router-view />
      </slot>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useDiscordStore } from 'src/stores/discord-store'
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const store = useDiscordStore()

    const server = computed(() =>
      store.userServers?.find(({ id }) => route.params.serverId === id)
    )

    return {
      server,
    }
  },
})
</script>
