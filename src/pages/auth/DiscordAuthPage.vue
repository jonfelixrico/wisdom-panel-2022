<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card flat style="width: 500px; height: 250px" class="flex flex-center">
      <q-card-section>
        <q-btn
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
import { defineComponent } from 'vue'

export default defineComponent({
  computed: {
    authUrl() {
      return process.env.DISCORD_OAUTH_URL
    },
  },
})
</script>
