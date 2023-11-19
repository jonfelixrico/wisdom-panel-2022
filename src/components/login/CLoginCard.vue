<template>
  <q-card flat>
    <q-card-section class="column justify-center">
      <div class="text-h1 text-center">Wisdom</div>

      <q-btn
        :disable="!discordLoginUrl"
        :label="$t('login.loginWithDiscord')"
        color="primary"
        unelevated
        :href="discordLoginUrl || ''"
        no-caps
        data-cy="discord-login-btn"
        class="text-h6 q-mt-md"
        dense
      />

      <q-btn
        v-if="syspars?.discordBotInviteUrl"
        :disable="!discordLoginUrl"
        :label="$t('login.inviteBot')"
        unelevated
        :href="syspars.discordBotInviteUrl"
        no-caps
        class="text-h6 q-mt-md"
        flat
        dense
        data-cy="bot-invite"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from 'vue'
import { useSysparStore } from 'src/stores/syspar-store'
import { LocationQuery } from 'vue-router'

const DISCORD_OAUTH_URL = process.env.DISCORD_OAUTH_URL

export default defineComponent({
  props: {
    discordOauthUrlQuery: {
      type: Object as PropType<LocationQuery>,
    },
  },

  setup(props) {
    const { syspars } = useSysparStore()

    const discordLoginUrl = computed(() => {
      if (!DISCORD_OAUTH_URL) {
        return null
      }

      const url = new URL(DISCORD_OAUTH_URL, window.location.origin)

      const query = props.discordOauthUrlQuery
      if (query && Object.keys(query).length) {
        url.searchParams.append('state', JSON.stringify(query))
      }

      return url.toString()
    })

    return {
      syspars,
      discordLoginUrl,
    }
  },
})
</script>
