import { Router } from 'express'
import { generateFodderQuote, generateQuoteListData } from '../data/quote.data'

const QUOTE_LIST_DATA = generateQuoteListData(100)

export function serverQuotesController(app: Router) {
  const router = Router()

  router.get('/server/:serverId/quote', (req, res) => {
    const { after, limit } = req.query
    const { serverId } = req.params

    if (!after) {
      res.json(
        QUOTE_LIST_DATA.slice(0, Number(limit)).map((data) => {
          return {
            ...data,
            serverId,
          }
        })
      )
    } else {
      const idx = QUOTE_LIST_DATA.findIndex(({ id }) => id === after)
      res.json(
        QUOTE_LIST_DATA.slice(idx + 1, idx + Number(limit) + 1).map((data) => {
          return {
            ...data,
            serverId,
          }
        })
      )
    }
  })

  router.get('/server/:serverId/quote/fodder-quote-:seq', (req, res) => {
    const { serverId, seq } = req.params
    res.json(generateFodderQuote(serverId, Number(seq)))
  })

  app.use('', router)
}
