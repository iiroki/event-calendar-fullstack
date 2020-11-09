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
        s.getUTCFullYear(),
        s.getUTCMonth() + 1,
        s.getUTCDate(),
        s.getUTCHours(),
        s.getUTCMinutes()
      ],
      end: [
        e.getUTCFullYear(),
        e.getUTCMonth() + 1,
        e.getUTCDate(),
        e.getUTCHours(),
        e.getUTCMinutes()
      ],
      description: row.description,
      productId: 'teekkarikalenteri/ics'
    })
  })

  const { error, value } = ics.createEvents(eventArray)

  if (error) {
    return response.status(500).end()
  }

  const filePath = `${__dirname}/teekkarikalenteri.ics`
  writeFileSync(filePath, value)
  response.sendFile(filePath)
})

module.exports = subscribeRouter
