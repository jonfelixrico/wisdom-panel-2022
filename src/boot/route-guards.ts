import { boot } from 'quasar/wrappers'
import { checkSession } from 'src/route-guards/session-check.guard'

export default boot(({ router }) => {
  router.beforeEach(checkSession)
})
