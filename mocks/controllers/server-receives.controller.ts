import { Router } from 'express'

export function serverReceivesController(app: Router) {
  const router = Router()

  router.get('/non-existent', (req, res) => {
    res.sendStatus(404)
  })

  router.get('/dummy', (req, res) => {
    res.json({
      receiveId: 'dummy',
      content: 'This is a dummy quote',
      authorId: 'author',
      submitterId: 'subimtter',
      quoteId: 'dummy',
    })
  })

  router.get('/:receiveId', (req, res) => {
    res.json({
      receiveId: req.params.receiveId,
    })
  })

  app.use('/server/:serverId/receive', router)
}
