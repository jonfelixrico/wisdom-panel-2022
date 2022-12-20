import { Router, Express } from 'express'

export default function (app: Express) {
  const router = Router()

  router.get('/no-access', (req, res) => {
    res.sendStatus(404)
  })

  router.get('/:id', (req, res) => {
    res.json({
      id: req.params.id,
    })
  })

  app.use('/server', router)
}
