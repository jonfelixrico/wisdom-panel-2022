import { getLogger } from 'src/boot/pino-logger'
import {
  isNavigationFailure,
  NavigationFailureType,
  NavigationHookAfter,
  START_LOCATION,
  Router,
} from 'vue-router'

/*
 * This entire thing is to prevent the user from being stuck in a white-screen only page
 * if the navigation was aborted during the starting route for the tab.
 *
 * If the user went to /route-1 and the `beforeRouteEnter` of the page yielded `next(false)`, if we did not
 * have this handling, the user will only be shown a white screen.
 */

const LOGGER = getLogger('guard:abort-on-start')
export const abortOnStartLocationGuard: (
  router: Router
) => NavigationHookAfter = (router) => {
  return (to, from, failure) => {
    if (
      !(
        isNavigationFailure(failure, NavigationFailureType.aborted) &&
        from === START_LOCATION
      )
    ) {
      return
    }

    LOGGER.warn('Abort on START_LOCATION detected; pushing to index')
    router.push({
      name: 'index',
    })
  }
}
