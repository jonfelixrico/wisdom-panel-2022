<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card flat style="width: 500px; height: 250px" class="flex flex-center">
      <q-card-section>
        <q-btn
          :label="$t('auth.loginWithDiscord')"
          color="primary"
          unelevated
          @click="handleClick"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { uid } from 'quasar'
import { defineComponent } from 'vue'

const DISCORD_OAUTH_URL = process.env.DISCORD_OAUTH_URL

export default defineComponent({
  methods: {
    handleClick() {
      if (!DISCORD_OAUTH_URL) {
        console.warn(
          'OAuth URL not found in env. Was there a misconfiguration?'
        )
        return
      }

      const url = new URL(DISCORD_OAUTH_URL)
      const state = uid()
      url.searchParams.append('state', state)
      this.$q.localStorage.set('state', state)

      console.debug('Changing location to the OAuth URL')
      window.location.assign(url)
    },
  },

  mounted() {
    this.$q.localStorage.set('state', uid())
  },
})
</script>
