import { Router } from 'express'
import { serverReceivesController } from './server-receives.controller'
import { serverController } from './server.controller'

export function controllers(app: Router) {
  serverController(app)
  serverReceivesController(app)
}
