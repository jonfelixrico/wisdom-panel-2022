import express from 'express'
import { controllers } from './controllers'
import { setupHandlebars } from './setup/handlebars.setup'
import { setupSession } from './setup/session.setup'

const app = express()

/*
 * - prevents loading of favicon (we dont have that)
 * - must be declared before setupSession to avoid 401s for favicon calls (we'll still have them)
 */
app.get('/favicon.ico', (req, res) => res.sendStatus(204))

setupSession(app)
setupHandlebars(app)

controllers(app)

app.listen(9081)

console.log('Mock server running')
