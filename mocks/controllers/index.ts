import { Router } from 'express'
import { serverController } from './server.controller'

export function controllers(app: Router) {
  serverController(app)
}
