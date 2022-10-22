<template>
  <q-page class="q-pa-md column items-center">
    <QuoteCard
      v-for="quote of quotes"
      class="card-width"
      :key="quote.id"
      :quote="quote"
      :author="names[quote.authorId]"
      :submitter="names[quote.submitterId]"
    />
  </q-page>
</template>

<script lang="ts">
import { useServerMemberNameMap } from 'src/composables/server-member-name-map.composable'
import { useServerMembersLoader } from 'src/composables/server-members-loader.composable'
import { useServerQuoteManager } from 'src/composables/server-quote-manager.composable'
import { defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import QuoteCard from 'src/components/quote/QuoteCard.vue'

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
  components: { QuoteCard },
})
</script>

<style lang="scss" scoped>
.card-width {
  width: 500px;
}
</style>
