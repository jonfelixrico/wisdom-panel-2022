import { Router } from 'express'

export function serverMemberController(app: Router) {
  const router = Router()

  router.get('/:userId', (req, res) => {
    res.json({
      username: `mockusername:${req.params.userId}`,
      avatarUrl: '/api/dummy-avatar',
    })
  })

  app.use('/server/:serverId/user', router)
}
