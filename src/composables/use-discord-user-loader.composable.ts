import { useDiscordStore } from 'src/stores/discord-store'
import { onMounted } from 'vue'

export function useDiscordUserLoader() {
  const store = useDiscordStore()
  onMounted(async () => {
    if (store.user) {
      console.debug('User already found; no need to load.')
      return
    }

    console.debug('No user data found -- now loading')
    try {
      await store.loadUser()
      console.debug('User data loaded')
    } catch (err) {
      console.error('Error encountered while loading user data: %o', err)
    }
  })
}
