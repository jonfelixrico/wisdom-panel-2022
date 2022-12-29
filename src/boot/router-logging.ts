import { boot } from 'quasar/wrappers'
import { isNavigationFailure } from 'vue-router'
import { getLogger } from './pino-logger'

export default boot(({ router }) => {
  const logger = getLogger('vue-router:navigation')

  router.beforeEach((to, from, next) => {
    logger.debug(`Attempted: ${from.fullPath} to ${to.fullPath}`)
    next()
  })

  router.afterEach((to, from, failure) => {
    if (isNavigationFailure(failure)) {
      logger.info(failure, `Failed: ${from.fullPath} to ${to.fullPath}`)
    } else {
      logger.info(`Completed: ${from.fullPath} to ${to.fullPath}`)
    }
  })
})
