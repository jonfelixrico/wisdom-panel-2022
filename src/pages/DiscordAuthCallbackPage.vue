<template>
  <q-page class="flex flex-center">
    <q-spinner />
  </q-page>
</template>

<script lang="ts">
import { useApi } from 'src/composables/use-api.composable'
import { defineComponent, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const { code, redirect, ...otherQuery } = route.query

    const api = useApi()
    const router = useRouter()

    onMounted(async () => {
      api.post('auth/oauth/discord', {
        code,
      })

      const location = {
        query: otherQuery,
      }

      if (redirect) {
        await router.push({
          ...location,
          path: JSON.stringify(redirect),
        })
      } else {
        await router.push({
          ...location,
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
