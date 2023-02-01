<template>
  <!-- TODO i18nize these -->
  <div class="fullscreen text-center q-pa-md flex flex-center">
    <div>
      <div class="text-h1">More coming soon</div>
      <div class="text-h4 q-mt-lg" style="opacity: 0.4">
        Nothing here for now.
      </div>

      <div class="q-mt-xl row justify-center">
        <q-btn
          unelevated
          label="Sign out"
          no-caps
          @click="signOut"
          class="col-md-3 col-xs-12 text-h6"
          color="primary"
        />
      </div>
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
