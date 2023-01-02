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
import { RouteLocationRaw } from 'vue-router'

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
      })
    }

    const redirectTo: RouteLocationRaw = {
      replace: true,
      name: 'index',
    }

    if (state) {
      // we don't expect this to be an array
      redirectTo.query = JSON.parse(String(state))
    }

    next(redirectTo)
  },
})
</script>
