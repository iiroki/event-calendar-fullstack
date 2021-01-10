const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { db } = require('../database/db')
const {
  getUserById,
  getUserAllById,
  modifyUserById,
  modifyUserPasswordById,
  getAllUsers
} = require('../database/queries')
const {
  JWT_SERCET,
  SALT_ROUNDS,
  TEST_USER
} = require('../utils/config')

// Forbid user from changing test user credentials
const checkIfTestUser = user => TEST_USER && user.username === 'testi'

// GET all users
userRouter.get('/', async (request, response, next) => { //eslint-disable-line
  const result = await db.query(getAllUsers)
  response.json(result[0])
})

// POST modify existing user
userRouter.post('/:id', async (request, response, next) => { //eslint-disable-line
  const reqBody = request.body

  // 400 if passwordChange not provided
  if (reqBody.passwordChange === undefined) {
    return response.status(400).json({
      error: {
        code: 0,
        message: '\'passwordChange\' not provided'
      }
    })
  }

  const { id } = request.params
  const decodedToken = jwt.verify(request.token, JWT_SERCET)

  // Checking that request is sent by the right user
  if (decodedToken.id.toString() !== id) {
    return response.status(401).json({
      error: {
        code: 3,
        message: 'Access denied'
      }
    })
  }

  const result = await db.query(getUserAllById, [id])

  // User not found
  if (result[0].length === 0) {
    return response.status(404).end()
  }

  const user = result[0][0]
  const correctPw = await bcrypt.compare(reqBody.password, user.passwordHash)

  // Password didn't match
  if (!correctPw) {
    return response.status(401).json({
      error: {
        code: 4,
        message: 'Wrong password'
      }
    })
  }

  const link = reqBody.link === ''
    ? null
    : reqBody.link

  // No password change
  if (reqBody.passwordChange === 0) {
    if (checkIfTestUser(user) && user.username !== reqBody.username) {
      return response.status(403).json({
        error: {
          code: 3,
          message: 'Changing test user credentials not allowed.'
        }
      })
    }

    // Testing if the HEX-values are valid
    const re = new RegExp(/^[0-9A-F]{6}$/i)

    if (!re.test(reqBody.bgColor) || !re.test(reqBody.fgColor)) {
      return response.status(400).json({
        error: {
          code: 0,
          message: 'Invalid HEX-color value'
        }
      })
    }

    await db.query(modifyUserById, [
      reqBody.username,
      reqBody.name,
      link,
      reqBody.bgColor,
      reqBody.fgColor,
      id
    ])

    // Returning the modified user
    const newUserResult = await db.query(getUserById, [id])
    response.json(newUserResult[0][0])
  } else if (reqBody.passwordChange === 1) {
    if (checkIfTestUser(user)) {
      return response.status(403).json({
        error: {
          code: 3,
          message: 'Changing test user credentials not allowed.'
        }
      })
    }

    if (!reqBody.newPassword || reqBody.newPassword.length < 3) {
      return response.status(400).json({
        error: {
          code: 0,
          message: 'Password must be at least 3 chars'
        }
      })
    }

    const passwordHash = await bcrypt.hash(reqBody.newPassword, SALT_ROUNDS)

    await db.query(modifyUserPasswordById, [
      passwordHash,
      id
    ])

    response.status(204).end()
  } else {
    response.status(400).json({
      error: {
        code: 0,
        message: 'Unknown value of \'passwordChange\''
      }
    })
  }
})

module.exports = userRouter
