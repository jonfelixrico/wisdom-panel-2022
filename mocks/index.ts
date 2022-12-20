import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello, world!').end()
})

app.listen(9081)

console.log('Mock server running')
