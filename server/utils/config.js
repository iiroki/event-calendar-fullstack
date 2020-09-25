require('dotenv').config()

const PORT = process.env.PORT

const DB_CREDENTIALS = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}

const SALT_ROUNDS = 10

const JWT_SERCET = process.env.SECRET

module.exports = {
  PORT,
  DB_CREDENTIALS,
  SALT_ROUNDS,
  JWT_SERCET
}
