import { getLogger } from 'src/boot/pino-logger'
import { useSessionStore } from 'src/stores/session-store'
import { isAxiosError } from 'src/utils/axios.utils'
import { NavigationGuard } from 'vue-router'

const LOGGER = getLogger('auth-guard')

export const sessionGuard: NavigationGuard = async (to, from, next) => {
  const sessionStore = useSessionStore()

  if (to.meta.isPublicRoute) {
    next()
    return
  }

  try {
    if (await sessionStore.fetchSession()) {
      next()
    } else {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath,
        },
      })
    }
  } catch (e) {
    if (isAxiosError(e)) {
      LOGGER.error(e, 'Non-401 error encountered while doing a session check')
    } else if (e) {
      LOGGER.error(e, 'Generic error encountered while doing a session check')
    }

    next(false)
  }
}
