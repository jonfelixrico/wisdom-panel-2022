import { computed } from 'vue'
import { useRoute } from 'vue-router'

export function useServerIdParam() {
  const $route = useRoute()
  return computed(() => {
    const { serverId } = $route.params

    if (!serverId) {
      null
    }

    return String(serverId)
  })
}
