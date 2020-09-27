// MySQL queries

const getAllEvents = 'SELECT event.id, title, location, start, end, multi, description, organizer_id, bgColor, fgColor FROM event INNER JOIN user ON event.organizer_id = user.id;'

const getEventById = 'SELECT event.id, title, location, start, end, multi, description, organizer_id, bgColor, fgColor FROM event INNER JOIN user ON event.organizer_id = user.id WHERE event.id = ?;'

const addNewEvent = 'INSERT INTO event (title, location, start, end, multi, description, organizer_id) VALUES (?, ?, ?, ?, ?, ?, ?);'

const deleteEventById = 'DELETE FROM event WHERE id = ?;'

const addNewUser = 'INSERT INTO user (username, name, link, passwordHash) VALUES (?, ?, ?, ?);'

const getAllUsers = 'SELECT id, name, link FROM user;'

const getUserById = 'SELECT id, username, name, link, bgColor, fgColor FROM user WHERE id = ?;'

const getUserAllById = 'SELECT * FROM user WHERE id = ?;'

const getUserAllByUsername = 'SELECT * FROM user WHERE username = ?;'

const modifyUserById = 'UPDATE user SET username = ?, name = ?, link = ?, bgColor = ?, fgColor = ? WHERE id = ?;'

const modifyUserPasswordById = 'UPDATE user SET passwordHash = ? WHERE id = ?;'

module.exports = {
  getAllEvents,
  getEventById,
  addNewEvent,
  deleteEventById,
  addNewUser,
  getAllUsers,
  getUserById,
  getUserAllById,
  getUserAllByUsername,
  modifyUserById,
  modifyUserPasswordById
}
