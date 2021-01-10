require('dotenv').config()

const PORT = process.env.PORT //eslint-disable-line

const DB_CREDENTIALS = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}

const SALT_ROUNDS = 10
const JWT_SERCET = process.env.SECRET
const CLEARDB = process.env.CLEARDB === '1'
const TEST_USER = process.env.TEST_USER === '1'

module.exports = {
  PORT,
  DB_CREDENTIALS,
  SALT_ROUNDS,
  JWT_SERCET,
  CLEARDB,
  TEST_USER
}
