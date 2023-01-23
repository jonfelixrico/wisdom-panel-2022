import { Router } from 'express'
import { Quote } from 'src/stores/quote-store'
import { generateFodderQuote, generateQuoteListData } from '../data/quote.data'

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

const QUOTE_LIST_DATA = generateQuoteListData(100)

export function serverQuotesController(app: Router) {
  const router = Router()

  router.get('/server/:serverId/quote', (req, res) => {
    const { cursorId, count } = req.query
    const { serverId } = req.params

    if (!cursorId) {
      res.json(
        QUOTE_LIST_DATA.slice(0, Number(count)).map((data) => {
          return {
            ...data,
            serverId,
          }
        })
      )
    } else {
      const idx = QUOTE_LIST_DATA.findIndex((id) => id === cursorId)
      res.json(
        QUOTE_LIST_DATA.slice(idx + 1, idx + Number(count) + 1).map((data) => {
          return {
            ...data,
            serverId,
          }
        })
      )
    }
  })

  router.get('/server/:serverId/quote/dummy', (req, res) => {
    res.json({
      id: 'dummy',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

      authorId: 'user-1',
      submitterId: 'user-2',

      serverId: req.params.serverId,

      receives: generateReceives(),
      status: 'ACCEPTED',
      submitDt: new Date('2022-01-01'),
    } as Quote)
  })

  router.get('/server/:serverId/quote/quote-fodder-:seq', (req, res) => {
    const { serverId, seq } = req.params
    res.json(generateFodderQuote(serverId, Number(seq)))
  })

  app.use('', router)
}
