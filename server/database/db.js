const mysql = require('mysql2/promise')
const { DB_CREDENTIALS } = require('../utils/config')

const db = mysql.createPool({
  ...DB_CREDENTIALS,
  timezone: 'Z'
})

const createTables = async () => {
  const connection = await db.getConnection()
  // user-table
  const userSql = 'CREATE TABLE IF NOT EXISTS user (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(20) UNIQUE NOT NULL CHECK (username!=\"\"), name VARCHAR(255) NOT NULL CHECK (name!=\"\"), passwordHash VARCHAR(255) NOT NULL, link VARCHAR(255), bgColor CHAR(6) DEFAULT \"ffffff\" CHECK (LENGTH(bgColor)=6), fgColor CHAR(6) DEFAULT \"000000\" CHECK (LENGTH(fgColor)=6));'
  // event-table
  const eventSql = 'CREATE TABLE IF NOT EXISTS event (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL CHECK (title!=\"\"), location VARCHAR(255) NOT NULL CHECK (location!=\"\"), start DATETIME NOT NULL, end DATETIME NOT NULL, multi BOOLEAN NOT NULL, description TEXT, organizer_id INT NOT NULL, FOREIGN KEY (organizer_id) REFERENCES user(id));'

  try {
    connection.query(userSql)
    connection.query(eventSql)
  } catch (error) {
    throw Error(error)
  }
}

module.exports = {
  db,
  createTables
}
