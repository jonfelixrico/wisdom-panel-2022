import { Router } from 'express'

export function sessionController(app: Router) {
  const router = Router()

  router.head('/', (req, res) => {
    // will return 401 if the route guard auth fails
    res.end()
  })

  router.delete('/', (req, res) => {
    req.session.destroy(() => {
      res.end()
    })
  })

  app.use('/session', router)
}
