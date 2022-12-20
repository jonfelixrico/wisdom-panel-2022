import { Router } from 'express'

export function serverReceivesController(app: Router) {
  const router = Router()

  router.get('/non-existent', (req, res) => {
    res.sendStatus(404)
  })

  router.get('/:receiveId', (req, res) => {
    res.json({
      receiveId: req.params.receiveId,
    })
  })

  app.use('/server/:serverId/receives', router)
}
