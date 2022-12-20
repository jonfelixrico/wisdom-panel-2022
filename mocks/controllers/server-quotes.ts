import { Router } from 'express'

export function serverQuotesController(app: Router) {
  const router = Router()

  router.get('/non-existent', (req, res) => {
    res.sendStatus(404)
  })

  router.get('/dummy', (req, res) => {
    res.json({
      quoteId: 'dummy',
    })
  })

  router.get('/:quoteId', (req, res) => {
    res.json({
      quoteId: req.params.quoteId,
    })
  })

  app.use('/server/:serverId/quote', router)
}
