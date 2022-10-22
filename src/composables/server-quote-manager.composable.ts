import { useQuotesStore } from 'src/stores/quotes-store'
import { Quote } from 'src/types/quote.interface'
import { computed } from 'vue'
import { useApi } from './api.composable'

export function useServerQuoteManager(serverId: string) {
  const store = useQuotesStore()
  const api = useApi()

  async function load() {
    const { data } = await api.get<Quote[]>(`server/${serverId}/quote`)
    if (data) {
      store.addQuotes(data)
    }
  }

  const serverQuotes = computed(() =>
    store.quotes?.filter((q) => q.serverId === serverId)
  )

  return {
    load,
    quotes: serverQuotes,
  }
}
