import { Router } from 'express'
import { orderBy } from 'lodash'
import { servers } from '../data/server.data'

export function serversController(app: Router) {
  const router = Router()

  router.get('/:serverId', (req, res) => {
    const server = servers[req.params.serverId]

    if (server) {
      res.json(server)
      return
    }

    res.sendStatus(403)
  })

  router.get('/', (req, res) => {
    res.json(servers)
  })

  app.use('/server', router)
}
