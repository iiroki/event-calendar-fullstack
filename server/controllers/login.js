const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { db } = require('../database/db')
const { getUserAllByUsername } = require('../database/queries')
const { JWT_SERCET } = require('../utils/config')

// POST new login
loginRouter.post('/', async (request, response, next) => {
  const reqBody = request.body
  const result = await db.query(getUserAllByUsername, [ reqBody.username])

  // Username not found
  if (result[0].length === 0) {
    return response.status(401).json({
      error: {
        code: 4,
        message: 'Invalid login credentials'
      }
    })
  }

  const user = result[0][0]

  // Checking that the user account has active-status
  if (!user.active) {
    return response.status(401).json({
      error: {
        code: 5,
        message: 'Account not active'
      }
    })
  }

  const correctPw = await bcrypt.compare(reqBody.password, user.passwordHash)

  // Password didn't match
  if (!correctPw) {
    return response.status(401).json({
      error: {
        code: 4,
        message: 'Invalid login credentials'
      }
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
    name: user.name,
    link: user.link,
    bgColor: user.bgColor,
    fgColor: user.fgColor
  }
  
  // Signing token with user info, expires in 1 hour
  const token = jwt.sign(userForToken, JWT_SERCET, { expiresIn: '1h' })

  const login = {
    token,
    id: userForToken.id,
    username: userForToken.username,
    name: userForToken.name,
    link: userForToken.link,
    bgColor: userForToken.bgColor,
    fgColor: userForToken.fgColor
  }

  // Returning the login object to client
  response.json(login)
})

// GET check if token is expired
loginRouter.get('/', async (request, response, next) => {
  jwt.verify(request.token, JWT_SERCET)
  response.status(204).end()
})

module.exports = loginRouter
