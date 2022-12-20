import { Router } from 'express'

export function serverQuotesController(app: Router) {
  const router = Router()

  router.get('/non-existent', (req, res) => {
    res.sendStatus(404)
  })

  router.get('/dummy', (req, res) => {
    res.json({
      id: 'dummy',
      content: 'Dummy quote',

      authorId: 'user-1',
      submitterId: 'user-2',
      submitDt: new Date('2022-01-01'),

      receives: [
        {
          id: 'receive-1',
          receiverId: 'user-3',
          receiveDt: new Date('2022-01-02'),
        },
        {
          id: 'receive-2',
          receiverId: 'user-3',
          receiveDt: new Date('2022-01-02'),
        },
        {
          id: 'receive-3',
          receiverId: 'user-3',
          receiveDt: new Date('2022-01-02'),
        },
        {
          id: 'receive-4',
          receiverId: 'user-3',
          receiveDt: new Date('2022-01-02'),
        },
      ],
    })
  })

  router.get('/:quoteId', (req, res) => {
    res.json({
      id: req.params.quoteId,
    })
  })

  app.use('/server/:serverId/quote', router)
}
