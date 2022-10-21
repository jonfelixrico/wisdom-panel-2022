import { useDiscordDataStore } from 'src/stores/discord-data-store'
import { onMounted } from 'vue'

export function useDiscordUserGuildsLoader() {
  const store = useDiscordDataStore()
  onMounted(async () => {
    if (store.servers) {
      console.debug('Server list already found; no need to load.')
      return
    }

    console.debug('No server list found -- now loading')
    try {
      await store.loadUser()
      console.debug('User server list loaded')
    } catch (err) {
      console.error('Error encountered while loading user server list: %o', err)
    }
  })
}
