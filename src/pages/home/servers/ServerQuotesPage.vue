<template>
  <q-page class="column items-center">
    <div v-for="quote of quotes" :key="quote.id">
      {{ quote.content }}
      {{ names[quote.authorId] }}
    </div>
  </q-page>
</template>

<script lang="ts">
import { useServerMemberNameMap } from 'src/composables/server-member-name-map.composable'
import { useServerMembersLoader } from 'src/composables/server-members-loader.composable'
import { useServerQuoteManager } from 'src/composables/server-quote-manager.composable'
import { defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const serverId = route.params.serverId.toString()

    const quoteManager = useServerQuoteManager(serverId)
    const membersLoader = useServerMembersLoader(serverId)
    const map = useServerMemberNameMap(serverId)

    onMounted(async () => {
      await Promise.all([quoteManager.load(), membersLoader.load()])
    })

    return {
      quotes: quoteManager.quotes,
      names: map,
    }
  },
})
</script>
