import { api } from 'src/boot/axios'
import { getLogger } from 'src/boot/pino-logger'
import { useSessionStore } from 'src/stores/session-store'
import { isAxiosError } from 'src/utils/axios.utils'
import { NavigationGuard } from 'vue-router'

const LOGGER = getLogger('auth-guard')

export const checkSession: NavigationGuard = async (to, from, next) => {
  const sessionStore = useSessionStore()

  if (to.meta.isPublicRoute || sessionStore.hasSession) {
    next()
    return
  }

  try {
    await api.head('session')
    LOGGER.info('Session found.')

    sessionStore.setHasSession(true)
    next()
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
