const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP

const app = express()

const schema = require('./schema')

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))
app.listen(5000., () => console.log('Server Running on port 5000'))
//npm run devstart