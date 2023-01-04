import { Router } from 'express'

export function serverQuotesController(app: Router) {
  const router = Router()

  router.get('/dummy', (req, res) => {
    res.json({
      id: 'dummy',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

      authorId: 'user-1',
      submitterId: 'user-2',

      serverId: 'dummy',

      receives: [
        {
          id: 'receive-1',
          userId: 'user-1',
        },
        {
          id: 'receive-2',
          userId: 'user-2',
        },
        {
          id: 'receive-3',
          userId: 'user-2',
        },
        {
          id: 'receive-4',
          userId: 'user-3',
        },
      ],
    })
  })

  app.use('/server/:serverId/quote', router)
}
