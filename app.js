const mongoose = require('mongoose');
const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')

const app = express()

const Event = require('./models/event')

mongoose.connect(`mongodb://localhost/${process.env.MONGO_DB}`)
    .then(() => console.log(`Connected to MongoDB...`))
    .catch(err => console.log('Could not connect to MongoDB...'));

app.use(bodyParser.json())

app.use('/graphql',graphqlHttp({
  schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    events: async() => {
      return await Event
        .find()
        .then(events => {
          console.log(events)
          return events.map(event => {
            return {...event._doc}
          })
        })
        .catch(err => {
          console.log(err)
          throw err;
        });
    },
    createEvent: async ({ eventInput }) => {
      const event = new Event({
        title: eventInput.title,
        description: eventInput.description,
        price: eventInput.price,
        date: new Date(eventInput.date)
      })
      return await event
        .save()
        .then(result => {
          console.log(result)
          return {...result._doc}
        })
        .catch(err => {
          console.log(err)
          throw err;
        });
    }
  },
  graphiql: true
}))

app.listen(4000)
