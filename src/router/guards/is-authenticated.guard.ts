import { NavigationGuard } from 'vue-router'
import { Pinia } from 'pinia'
import { useDiscordDataStore } from 'src/stores/discord-data-store'

export const isAuthenticatedGuard: (ctx: {
  store: Pinia
}) => NavigationGuard = ({ store }) => {
  return async (to) => {
    if (to.meta.publicRoute) {
      return
    }

    const discordStore = useDiscordDataStore(store)
    if (discordStore.isAuthenticated) {
      // allow navigation
      return
    }

    try {
      await discordStore.loadUser()
      return
    } catch (e) {
      // TODO use logger
      console.error(
        'Error encountered while trying to retrieve the session user data',
        e
      )

      return {
        name: 'login',
        replace: true,
      }
    }
  }
}
