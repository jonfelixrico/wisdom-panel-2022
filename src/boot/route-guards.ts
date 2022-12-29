import { boot } from 'quasar/wrappers'
import { abortOnStartLocationGuard } from 'src/route-guards/abort-on-start-location.guard'
import { checkSession } from 'src/route-guards/session-check.guard'

export default boot(({ router }) => {
  router.beforeEach(checkSession)
  router.afterEach(abortOnStartLocationGuard(router))
})
