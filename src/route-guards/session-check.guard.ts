import { api } from 'src/boot/axios'
import { getLogger } from 'src/boot/pino-logger'
import { useSessionStore } from 'src/stores/session-store'
import { isAxiosError } from 'src/utils/axios.utils'
import { NavigationGuard } from 'vue-router'

const LOGGER = getLogger('auth-guard')

export const checkSession: NavigationGuard = async (to, from, next) => {
  const sessionStore = useSessionStore()
  if (!sessionStore.hasSession) {
    try {
      await api.head('session')
      sessionStore.setHasSession(true)
      LOGGER.info('Session found.')
    } catch (e) {
      if (!isAxiosError(e)) {
        LOGGER.error(e, 'Error encountered while trying to check for session')
      } else if (e.response?.status !== 401) {
        LOGGER.error(e, 'Non-401 error encountered while doing a session check')
      } else {
        LOGGER.warn('Encountered 401 while doing a session check')
      }

      next({ name: 'index' })
    }
  }
}
