import { APIGuild } from 'discord-api-types/v10'
import { Router } from 'express'

export function serverController(app: Router) {
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

  router.get('/:id', (req, res) => {
    res.sendStatus(404)
  })

  app.use('/server', router)
}
