<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute fit">
      <div class="q-gutter-y-sm q-py-sm">
        <div v-for="quote of quotes" :key="quote.id" class="row justify-center">
          <QuoteCard
            class="card-width"
            :quote="quote"
            :author="names[quote.authorId]"
            :submitter="names[quote.submitterId]"
          />
        </div>
      </div>
    </q-scroll-area>
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
