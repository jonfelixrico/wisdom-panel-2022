import { Router } from 'express'
import { serverMembersController } from './server-members.controller'
import { serverQuotesController } from './server-quotes.controller'
import { serversController } from './server.controller'

export function controllers(app: Router) {
  serversController(app)
  serverQuotesController(app)
  serverMembersController(app)
}
