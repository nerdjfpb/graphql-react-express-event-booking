const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res, next) => {
  res.send("hello bangladesh")
})

app.listen(3000)