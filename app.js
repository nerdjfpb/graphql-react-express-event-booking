const mongoose = require('mongoose');
const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')

const graphqlSchema = require('./graphql/schema/index')
const rootResolver = require('./graphql/resolvers/index')

const app = express()

mongoose.connect(`mongodb://localhost/${process.env.MONGO_DB}`)
    .then(() => console.log(`Connected to MongoDB...`))
    .catch(err => console.log('Could not connect to MongoDB...'));

app.use(bodyParser.json())

app.use('/graphql',graphqlHttp({
  schema: graphqlSchema,
  rootValue: rootResolver,
  graphiql: true
}))

app.listen(4000)
