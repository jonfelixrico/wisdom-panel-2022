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

const LOGGER = getLogger('page:DiscordAuthCallbackPage')

export default defineComponent({
  beforeRouteEnter({ query }, from, next) {
    const { state, error } = query
    if (error) {
      const { errorDescription } = query
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
    }

    let parsedState: { redirect?: string } = {}
    if (state) {
      parsedState = JSON.parse(String(state))
    }

    if (parsedState.redirect) {
      next({
        replace: true,
        path: parsedState.redirect,
      })
    } else {
      next({
        replace: true,
        name: 'index',
      })
    }
  },
})
</script>
