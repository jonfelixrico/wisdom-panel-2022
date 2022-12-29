import express from 'express'
import { controllers } from './controllers'
import { engine } from 'express-handlebars'
import path from 'path'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello, world!').end()
})

controllers(app)

// Handlebars setup
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

app.listen(9081)

console.log('Mock server running')
