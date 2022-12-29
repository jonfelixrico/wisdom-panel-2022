import type { Express } from 'express'
import { engine } from 'express-handlebars'
import path from 'path'

export function setupHandlebars(app: Express) {
  app.engine('handlebars', engine())
  app.set('view engine', 'handlebars')
  app.set('views', path.join(__dirname, '../views'))
}
