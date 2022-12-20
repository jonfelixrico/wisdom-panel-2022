import { Router } from 'express'
import { serverQuotesController } from './server-quotes'
import { serverController } from './server.controller'

export function controllers(app: Router) {
  serverController(app)
  serverQuotesController(app)
}
