import { Router } from 'express'

function generateReceives() {
  const RECEIVE_COUNT = 30
  const UNIQUE_USER_COUNT = 10
  const receives: { id: string; userId: string }[] = []

  for (let receiveNo = 1; receiveNo <= RECEIVE_COUNT; receiveNo++) {
    receives.push({
      id: `receive-${receiveNo}`,
      userId: `user-${receiveNo % UNIQUE_USER_COUNT || UNIQUE_USER_COUNT}`,
    })
  }

  return receives
}

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

      receives: generateReceives(),
    })
  })

  app.use('/server/:serverId/quote', router)
}
