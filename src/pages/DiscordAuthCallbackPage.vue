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
      `Error encountered during OAuth login: ${error ?? 'NO_CODE'} -- ${
        errorDescription ?? 'NO_DESCRIPTION'
      }`
    )

    let message: string
    if (errorDescription) {
      message = String(errorDescription)
    } else if (error) {
      message = i18n.t(
        'login.dialogs.discordOAuthFailed.message.genericWithCode',
        { errorCode: error }
      )
    } else {
      message = i18n.t('login.dialogs.discordOAuthFailed.message.generic')
    }

    Dialog.create({
      title: i18n.t('login.dialogs.discordOAuthFailed.title'),
      message,
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
