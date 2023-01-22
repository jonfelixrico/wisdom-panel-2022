import { Router } from 'express'
import { Quote } from 'src/stores/quote-store'
import { generateQuoteListData, generateQuote } from '../data/quote.data'

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
    const parsedCount = Number(count || 10)

    if (!cursorId) {
      res.json(QUOTE_LIST_DATA.slice(0, parsedCount))
    } else {
      const idx = QUOTE_LIST_DATA.findIndex((id) => id === cursorId)
      res.json(QUOTE_LIST_DATA.slice(idx + 1, idx + parsedCount + 1))
    }
  })

  let statusCtr = 0
  router.get('/server/:serverId/quote/:quoteId', (req, res) => {
    const { serverId, quoteId } = req.params

    if (quoteId === 'dummy') {
      // TODO move this to the data file
      res.json({
        id: 'dummy',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

        authorId: 'user-1',
        submitterId: 'user-2',

        serverId: 'dummy',

        receives: generateReceives(),
        status: 'ACCEPTED',
        submitDt: new Date('2022-01-01'),
      } as Quote)
      return
    }

    const generated = generateQuote(serverId, quoteId)

    if (statusCtr++ % 2 === 0) {
      res.json({
        ...generated,
        status: 'ACCEPTED',
      } as Quote)
    } else {
      res.json({
        ...generated,
        status: 'PENDING',
        approvalRequirements: {
          voteCount: 3,
          voters: [],
        },
      } as Quote)
    }
  })

  app.use('', router)
}
