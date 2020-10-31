const eventRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { db } = require('../database/db')
const { JWT_SERCET } = require('../utils/config')
const {
  getAllEvents,
  getEventById,
  addNewEvent,
  deleteEventById,
  getUserById,
  modifyEventById
} = require('../database/queries')

// Input sanitization is done with mysql2's placeholders!

// GET all events
eventRouter.get('/', async (request, response, next) => { //eslint-disable-line
  const result = await db.query(getAllEvents)
  response.json(result[0])
})

// GET specific event
eventRouter.get('/:id', async (request, response, next) => { //eslint-disable-line
  const result = await db.query(getEventById, [request.params.id])

  // Event not found
  if (result[0].length === 0) {
    return response.status(404).end()
  }

  response.json(result[0][0])
})

// POST new event with jsonwebtoken
eventRouter.post('/', async (request, response, next) => { //eslint-disable-line
  const reqBody = request.body
  const decodedToken = jwt.verify(request.token, JWT_SERCET)
  const userResult = await db.query(getUserById, [decodedToken.id])

  // No user found with the id decoded from the token
  if (userResult[0].length === 0) {
    return response.status(404).end()
  }

  if (new Date(reqBody.start) > new Date(reqBody.end)) {
    return response.status(400).json({
      error: {
        code: 0,
        message: 'Start date cannot be greater than end date'
      }
    })
  }

  // Organizer id from decoded token
  const addEventResult = await db.query(addNewEvent, [
    reqBody.title,
    reqBody.location,
    reqBody.start,
    reqBody.end,
    reqBody.multi,
    reqBody.description,
    userResult[0][0].id
  ])

  // Returning the newly added event
  const eventResult = await db.query(getEventById, [
    addEventResult[0].insertId
  ])

  response.status(201).json(eventResult[0][0])
})

// POST edit existing event
eventRouter.post('/:id', async (request, response, next) => { // eslint-disable-line
  const eventResult = await db.query(getEventById, [request.params.id])

  // No event found with the given id
  if (eventResult[0].length === 0) {
    return response.status(404).end()
  }

  const event = eventResult[0][0]

  const decodedToken = jwt.verify(request.token, JWT_SERCET)

  // Request was made by someone else than the organizer
  if (event.organizer_id !== decodedToken.id) {
    return response.status(401).json({
      error: {
        code: 3,
        message: 'Access denied'
      }
    })
  }

  const reqBody = request.body

  if (new Date(reqBody.start) > new Date(reqBody.end)) {
    return response.status(400).json({
      error: {
        code: 0,
        message: 'Start date cannot be greater than end date'
      }
    })
  }

  await db.query(modifyEventById, [
    reqBody.title,
    reqBody.location,
    reqBody.start,
    reqBody.end,
    reqBody.multi,
    reqBody.description,
    event.id
  ])

  // Returning the recently edited event
  const modifiedEventResult = await db.query(getEventById, [
    event.id
  ])

  response.json(modifiedEventResult[0][0])
})

// DELETE existing event
eventRouter.delete('/:id', async (request, response, next) => { //eslint-disable-line
  const eventResult = await db.query(getEventById, [request.params.id])

  // No event found with the given id
  if (eventResult[0].length === 0) {
    return response.status(404).end()
  }

  const event = eventResult[0][0]
  const decodedToken = jwt.verify(request.token, JWT_SERCET)

  // Token doesn't belong to the organizer
  if (decodedToken.id !== event.organizer_id) {
    return response.status(401).json({
      error: {
        code: 3,
        message: 'Access denied'
      }
    })
  }

  // Deleting the event
  await db.query(deleteEventById, [event.id])
  response.status(204).end()
})

module.exports = eventRouter
