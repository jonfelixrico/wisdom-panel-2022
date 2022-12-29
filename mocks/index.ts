import express from 'express'
import { controllers } from './controllers'
import { setupHandlebars } from './setup/handlebars.setup'
import { setupSession } from './setup/session.setup'

const app = express()

controllers(app)

setupSession(app)
setupHandlebars(app)

app.listen(9081)

console.log('Mock server running')
