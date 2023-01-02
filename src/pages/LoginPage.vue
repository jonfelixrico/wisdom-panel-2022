<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card flat style="width: 500px; height: 250px" class="flex flex-center">
      <q-card-section>
        <q-btn
          :disable="!discordLoginUrl"
          :label="$t('auth.loginWithDiscord')"
          color="discord"
          unelevated
          :href="discordLoginUrl || ''"
          no-caps
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { getLogger } from 'src/boot/pino-logger'
import { useSessionStore } from 'src/stores/session-store'
import { defineComponent } from 'vue'

const DISCORD_OAUTH_URL = process.env.DISCORD_OAUTH_URL
const LOGGER = getLogger('login-page')

export default defineComponent({
  computed: {
    discordLoginUrl() {
      if (!DISCORD_OAUTH_URL) {
        return null
      }

      const url = new URL(DISCORD_OAUTH_URL)

      const { query } = this.$route
      if (query && Object.keys(query).length) {
        url.searchParams.append('state', JSON.stringify(query))
      }

      return url.toString()
    },
  },

  async beforeRouteEnter(to, from, next) {
    const sessionStore = useSessionStore()
    try {
      if (await sessionStore.fetchSession()) {
        next({ name: 'home' })
        return
      } else {
        next(true)
      }
    } catch (e) {
      LOGGER.error(e, 'Error encountered while trying to fetch the session')
      next(true)
    }
  },
})
</script>
