<template>
  <q-page class="flex flex-center">
    <q-spinner />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { LocalStorage } from 'quasar'

export default defineComponent({
  beforeRouteEnter(to, from, next) {
    const { state: fromRedirect } = to.query
    const fromLocalStorage = LocalStorage.getItem<string>('state')
    if (fromRedirect !== fromLocalStorage) {
      console.warn('Expected %s, received %s', fromLocalStorage, fromRedirect)
      next({ name: 'auth-discord' })
      return
    }

    next()
  },
})
</script>
