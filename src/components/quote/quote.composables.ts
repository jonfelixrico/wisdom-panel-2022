import { useQuoteStore } from 'src/stores/quote-store'
import { computed, toRefs, watch } from 'vue'

export function useQuoteLoader(props: { quoteId: string; serverId: string }) {
  const store = useQuoteStore()

  const { serverId, quoteId } = toRefs(props)

  watch(
    [serverId, quoteId],
    async ([serverId, quoteId]) => {
      await store.getQuote(quoteId, serverId)
    },
    { immediate: true }
  )

  return computed(() => store.servers[props.serverId]?.[props.quoteId] ?? null)
}
