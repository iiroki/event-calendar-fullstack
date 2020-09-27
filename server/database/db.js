const mysql = require('mysql2/promise')
const { DB_CREDENTIALS } = require('../utils/config')

const db = mysql.createPool({
  ...DB_CREDENTIALS,
  timezone: 'Z'
})

const createTables = async () => {
  const connection = await db.getConnection()
  // user-table
  const userSql = 'CREATE TABLE IF NOT EXISTS user (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(20) UNIQUE NOT NULL CHECK (username!=\"\"), name VARCHAR(255) NOT NULL CHECK (name!=\"\"), password_hash VARCHAR(255) NOT NULL, link VARCHAR(255), bg_color CHAR(6) CHECK (LENGTH(bg_color)=6), fg_color CHAR(6) CHECK (LENGTH(fg_color)=6));'

  try {
    connection.query(userSql)
  } catch (error) {
    throw Error(error)
  }

  // event-table
  const eventSql = 'CREATE TABLE IF NOT EXISTS event (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL CHECK (title!=\"\"), location VARCHAR(255) NOT NULL CHECK (location!=\"\"), start DATETIME NOT NULL, end DATETIME NOT NULL, multi BOOLEAN NOT NULL, description TEXT, organizer_id INT NOT NULL, FOREIGN KEY (organizer_id) REFERENCES user(id));'

  try {
    connection.query(eventSql)
  } catch (error) {
    throw Error(error)
  }
}

module.exports = {
  db,
  createTables
}
