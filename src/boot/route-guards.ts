import { boot } from 'quasar/wrappers'
import { abortOnStartLocationGuard } from 'src/route-guards/abort-on-start-location.guard'
import { sessionGuard } from 'src/route-guards/session.guard'

export default boot(({ router }) => {
  router.beforeEach(sessionGuard)
  router.afterEach(abortOnStartLocationGuard(router))
})
