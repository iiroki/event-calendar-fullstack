const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { db } = require('../database/db')
const {
  addNewUser,
  getAllEvents,
  getUserById,
  getUserAllById,
  modifyUserById,
  modifyUserPasswordById,
  getAllUsers
} = require('../database/queries')
const { JWT_SERCET, SALT_ROUNDS } = require('../utils/config')

// GET all users
userRouter.get('/', async (request, response, next) => {
  const result = await db.query(getAllUsers)
  response.json(result[0])
})

// POST new user
/*userRouter.post('/', async (request, response, next) => {
  const reqBody = request.body

  if (!reqBody.password || reqBody.password.length < 3) {
    return response.status(400).json({
      error: {
        code: 0,
        message: 'Password must be at least 3 chars'
      }
    })
  }

  // Generating new password hash
  const pwHash = await bcrypt.hash(reqBody.password, SALT_ROUNDS)

  const result = await db.query(addNewUser, [
    reqBody.username,
    reqBody.name,
    reqBody.link,
    pwHash
  ])

  // Returning the newly added user
  const userResult = await db.query(getUserById, [result[0].insertId])
  response.status(201).json(userResult[0][0])
})*/

// POST modify existing user
userRouter.post('/:id', async (request, response, next) => {
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

  const id = request.params.id
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

  const correctPw = await bcrypt.compare(reqBody.password, result[0][0].password_hash)

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
