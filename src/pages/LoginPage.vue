<template>
  <q-page class="row items-center justify-center">
    <CLoginCard class="card-width" :discord-oauth-url-query="$route.query" />
  </q-page>
</template>

<script lang="ts">
import { getLogger } from 'src/boot/pino-logger'
import { useSessionStore } from 'src/stores/session-store'
import { defineComponent } from 'vue'
import CLoginCard from 'src/components/login/CLoginCard.vue'

const LOGGER = getLogger('login-page')

export default defineComponent({
  components: { CLoginCard },
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

<style lang="scss" scoped>
.card-width {
  max-width: 80dvw;
  width: 600px;
}
</style>
