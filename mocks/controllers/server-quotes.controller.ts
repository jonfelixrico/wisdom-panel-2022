import { Router } from 'express'
import { generateFodderQuote, generateQuoteListData } from '../data/quote.data'

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
      const idx = QUOTE_LIST_DATA.findIndex(({ id }) => id === cursorId)
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

  router.get('/server/:serverId/quote/quote-fodder-:seq', (req, res) => {
    const { serverId, seq } = req.params
    res.json(generateFodderQuote(serverId, Number(seq)))
  })

  app.use('', router)
}
