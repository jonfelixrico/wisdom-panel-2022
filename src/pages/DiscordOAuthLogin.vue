<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card flat style="width: 500px; height: 250px" class="flex flex-center">
      <q-card-section>
        <q-btn
          :label="$t('auth.loginWithDiscord')"
          color="primary"
          unelevated
          :href="DISCORD_OAUTH_URL"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const DISCORD_OAUTH_URL = process.env.DISCORD_OAUTH_URL

export default defineComponent({
  setup() {
    return {
      DISCORD_OAUTH_URL,
    }
  },
})
</script>
