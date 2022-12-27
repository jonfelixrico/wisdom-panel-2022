import { APIGuild } from 'discord-api-types/v10'
import { Router } from 'express'

export function serversController(app: Router) {
  const router = Router()

  router.get('/no-access', (req, res) => {
    res.sendStatus(403)
  })

  router.get('/dummy', (req, res) => {
    res.json({
      id: 'dummy',
      name: 'Dummy Server',
    } as Partial<APIGuild>)
  })

  app.use('/server', router)
}
