import { Router } from 'express'
import { authController } from './auth.controller'
import { avatarController } from './avatar.controller'
import { serverMemberController } from './server-member.controller'
import { serverQuotesController } from './server-quotes.controller'
import { serversController } from './server.controller'
import { sessionController } from './session.controller'

export function controllers(app: Router) {
  serversController(app)
  serverQuotesController(app)
  serverMemberController(app)
  avatarController(app)
  authController(app)
  sessionController(app)
}
