const express = require('express')
require('express-async-errors')
const app = express()
const { createTables } = require('./database/db')
const middleware = require('./utils/middleware')
const { PORT } = require('./utils/config')
const eventRouter = require('./controllers/events')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(express.json())
app.use(middleware.tokenExtractor)

// Setup for development environment
if (process.env.NODE_ENV === 'development') {
  app.use(middleware.requestLogger)
}

// Routers
app.use('/api/events', eventRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

// Create database tables if needed
createTables()

app.listen(PORT, () => {
  console.log(`Server running - PORT: ${PORT}`)
})
