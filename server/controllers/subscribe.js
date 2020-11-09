const subscribeRouter = require('express').Router()
const ics = require('ics')
const { writeFileSync } = require('fs')
const { db } = require('../database/db')
const { getAllEvents } = require('../database/queries')

subscribeRouter.get('/teekkarikalenteri.ics', async (request, response, next) => { // eslint-disable-line
  const result = await db.query(getAllEvents)
  const eventArray = []

  result[0].forEach(row => {
    const s = row.start
    const e = row.end

    eventArray.push({
      title: row.title,
      location: row.location,
      start: [
        s.getFullYear(),
        s.getMonth() + 1,
        s.getDate(),
        s.getHours(),
        s.getMinutes()
      ],
      end: [
        e.getFullYear(),
        e.getMonth() + 1,
        e.getDate(),
        e.getHours(),
        e.getMinutes()
      ],
      description: row.description,
      productId: 'teekkarikalenteri/ics'
    })
  })

  // No events
  if (eventArray.length === 0) {
    return response.status(404).end()
  }

  const { error, value } = ics.createEvents(eventArray)

  if (error) {
    return response.status(500).end()
  }

  const filePath = `${__dirname}/teekkarikalenteri.ics`
  writeFileSync(filePath, value)
  response.sendFile(filePath)
})

module.exports = subscribeRouter
