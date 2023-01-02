import { Router } from 'express'

const usernameMap: Record<string, string> = {
  'user-1': 'User 1',
  'user-2': 'User 2',
  'user-3': 'User 3',
}

export function serverMemberController(app: Router) {
  const router = Router()

  router.get('/:userId/avatar', (req, res) => {
    res.json({
      url: '/api/dummy-avatar',
    })
  })

  router.get('/:userId/username', (req, res) => {
    const username = usernameMap[req.params.userId]
    if (!username) {
      res.sendStatus(404)
      return
    }

    res.json({ username })
  })

  app.use('/server/:serverId/user', router)
}
