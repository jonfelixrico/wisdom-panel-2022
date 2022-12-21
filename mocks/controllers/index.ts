import { Router } from 'express'
import { serverQuotesController } from './server-quotes.controller'
import { serversController } from './server.controller'

export function controllers(app: Router) {
  serversController(app)
  serverQuotesController(app)
}
