<template>
  <q-card flat>
    <q-card-section class="row justify-center">
      <div class="text-h1">Wisdom</div>

      <q-btn
        :disable="!discordLoginUrl"
        :label="$t('login.loginWithDiscord')"
        color="primary"
        unelevated
        :href="discordLoginUrl || ''"
        no-caps
        data-cy="discord-login-btn"
        class="col-12 text-h6 q-mt-md"
        dense
      />

      <q-btn
        v-if="syspars?.discordBotInviteUrl"
        :disable="!discordLoginUrl"
        :label="$t('login.inviteBot')"
        unelevated
        :href="syspars.discordBotInviteUrl"
        no-caps
        class="col-12 text-h6 q-mt-md"
        flat
        dense
        data-cy="bot-invite"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSysparStore } from 'src/stores/syspar-store'

const DISCORD_OAUTH_URL = process.env.DISCORD_OAUTH_URL

export default defineComponent({
  computed: {
    discordLoginUrl() {
      if (!DISCORD_OAUTH_URL) {
        return null
      }

      const url = new URL(DISCORD_OAUTH_URL, window.location.origin)

      const { query } = this.$route
      if (query && Object.keys(query).length) {
        url.searchParams.append('state', JSON.stringify(query))
      }

      return url.toString()
    },
  },

  setup() {
    const { syspars } = useSysparStore()

    return {
      syspars,
    }
  },
})
</script>
