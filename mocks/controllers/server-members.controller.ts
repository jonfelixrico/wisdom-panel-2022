import { Router } from 'express'

export function serverMembersController(app: Router) {
  const router = Router()

  router.get('/:userId/avatar', (req, res) => {
    res.json({
      url: '/api/dummy-avatar',
    })
  })

  app.use('/server/:serverId/user', router)
}
