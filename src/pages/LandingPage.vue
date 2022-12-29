<template>
  <!-- TODO i18nize these -->
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <!-- TODO add proper verbiage for a "coming soon" landing page -->
      <div style="font-size: 30vh">Coming Soon</div>

      <div class="text-h2" style="opacity: 0.4">Oops. Nothing here...</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        label="Sign out"
        no-caps
        @click="signOut"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { getLogger } from 'src/boot/pino-logger'
import { useApi } from 'src/composables/use-api.composable'
import { useSessionStore } from 'src/stores/session-store'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

const LOGGER = getLogger('landing-page')

export default defineComponent({
  setup() {
    const sessionStore = useSessionStore()
    const api = useApi()
    const router = useRouter()

    async function signOut() {
      try {
        await api.delete('session')
        sessionStore.setHasSession(false)
        await router.push({
          name: 'index',
        })
      } catch (e) {
        LOGGER.error(e, 'Unexpected error while trying to sign out')
      }
    }

    return {
      signOut,
    }
  },
})
</script>
