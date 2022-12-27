import express from 'express'
import { controllers } from './controllers'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello, world!').end()
})

controllers(app)

app.listen(9081)

console.log('Mock server running')
