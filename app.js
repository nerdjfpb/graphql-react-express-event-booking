const mongoose = require('mongoose');
const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const graphqlSchema = require('./graphql/schema/index')
const rootResolver = require('./graphql/resolvers/index')
const isAuth = require('./middleware/is-auth')

const app = express()

mongoose.connect(`mongodb://localhost/${process.env.MONGO_DB}`)
    .then(() => console.log(`Connected to MongoDB...`))
    .catch(err => console.log('Could not connect to MongoDB...'));

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

app.use(isAuth)

app.use('/graphql',graphqlHttp({
  schema: graphqlSchema,
  rootValue: rootResolver,
  graphiql: true
}))

app.listen(4000)
