<template>
  <q-page class="flex flex-center">
    <q-spinner size="lg" color="primary" />
  </q-page>
</template>

<script lang="ts">
import { getLogger } from 'src/boot/pino-logger'
import { defineComponent } from 'vue'
import { Dialog } from 'quasar'
import { i18n } from 'src/boot/i18n'
import { useSessionStore } from 'src/stores/session-store'

const LOGGER = getLogger('page:DiscordAuthCallbackPage')

export default defineComponent({
  async beforeRouteEnter({ query }) {
    const { state } = query
    let parsedState: { redirect?: string } = {}
    if (state) {
      parsedState = JSON.parse(String(state))
    }

    const sessionStore = useSessionStore()
    const hasSession = await sessionStore.fetchSession()

    // handling for successful OAuth
    if (hasSession) {
      if (parsedState.redirect) {
        return {
          replace: true,
          path: parsedState.redirect,
        }
      } else {
        return {
          replace: true,
          name: 'index',
        }
      }
    }

    const { error, errorDescription } = query
    LOGGER.error(
      `Error encountered during OAuth login: ${error} -- ${
        errorDescription ?? 'NO_DESCRIPTION'
      }`
    )

    Dialog.create({
      title: 'Login unsuccessful',
      message: errorDescription
        ? String(errorDescription)
        : i18n.t('auth.dialogs.discordOAuthFailed.message.generic', {
            errorCode: error,
          }),
      noRouteDismiss: true,
      ok: {
        unelevated: true,
        color: 'primary',
      },
    })

    return {
      name: 'login',
      query: parsedState,
    }
  },
})
</script>
