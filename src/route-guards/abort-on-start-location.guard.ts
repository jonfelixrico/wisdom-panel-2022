import { getLogger } from 'src/boot/pino-logger'
import {
  isNavigationFailure,
  NavigationFailureType,
  NavigationHookAfter,
  START_LOCATION,
  Router,
} from 'vue-router'

const LOGGER = getLogger('guard:abort-on-start')

export const abortOnStartLocationGuard: (
  router: Router
) => NavigationHookAfter = (router) => {
  return (to, from, failure) => {
    if (
      !isNavigationFailure(failure, NavigationFailureType.aborted) ||
      from !== START_LOCATION
    ) {
      return
    }

    LOGGER.warn('Abort on START_LOCATION detected; pushing to home')
    router.push({
      name: 'home',
    })
  }
}
