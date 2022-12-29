<template>
  <q-page class="flex flex-center">
    <q-spinner />
  </q-page>
</template>

<script lang="ts">
import { getLogger } from 'src/boot/pino-logger'
import { useApi } from 'src/composables/use-api.composable'
import { defineComponent, onMounted } from 'vue'
import { isNavigationFailure, Router, useRoute, useRouter } from 'vue-router'

const LOGGER = getLogger('page:DiscordAuthCallbackPage')

export default defineComponent({
  setup() {
    const route = useRoute()
    const { code, redirect, ...otherQuery } = route.query

    const api = useApi()
    const router = useRouter()

    onMounted(async () => {
      await api.post('auth/oauth/discord', {
        code,
      })

      const location = {
        query: otherQuery,
      }

      const navResult = redirect
        ? router.push({
            // redirect with target according to the callback
            ...location,
            path: redirect.toString(),
          })
        : router.push({
            // generic redirect
            ...location,
            name: 'index',
          })

      if (isNavigationFailure(await navResult)) {
        LOGGER.warn(
          'Navigation failure encountered, redirecting to the index as fallback'
        )
        router.push({
          name: 'index',
        })
      }
    })
  },

  beforeRouteEnter(to, from, next) {
    if (!to.query.code) {
      // TODO add logging
      // TODO add notice to the user
      return next(false)
    }

    next()
  },
})
</script>
