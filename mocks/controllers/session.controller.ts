import { Router } from 'express'

export function sessionController(app: Router) {
  const router = Router()

  router.get('/', (req, res) => {
    // will return 401 if the route guard auth fails
    res.end()
  })

  app.use('/session', router)
}
