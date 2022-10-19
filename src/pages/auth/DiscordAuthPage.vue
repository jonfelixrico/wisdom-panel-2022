<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card flat style="width: 500px; height: 250px" class="flex flex-center">
      <q-card-section>
        <q-btn
          v-if="authUrl"
          :label="$t('auth.loginWithDiscord')"
          :href="authUrl"
          color="primary"
          unelevated
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { uid } from 'quasar'
import { defineComponent } from 'vue'

export default defineComponent({
  computed: {
    authUrl() {
      const envUrl = process.env.DISCORD_OAUTH_URL
      if (!envUrl) {
        return null
      }

      const url = new URL(envUrl)

      const state = this.$q.localStorage.getItem<string>('state')
      if (state) {
        url.searchParams.append('state', state)
      }

      return url.toString()
    },
  },

  mounted() {
    this.$q.localStorage.set('state', uid())
  },
})
</script>
