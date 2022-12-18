import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
  isNavigationFailure,
} from 'vue-router'

import routes from './routes'
import { getLogger } from 'src/boot/pino-logger'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory

  const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

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

  return router
})
