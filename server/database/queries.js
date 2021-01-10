// MySQL queries

const getAllEvents = 'SELECT event.id, title, location, start, end, multi, description, organizerId, bgColor, fgColor FROM event INNER JOIN user ON event.organizerId = user.id;'

const getEventById = 'SELECT event.id, title, location, start, end, multi, description, organizerId, bgColor, fgColor FROM event INNER JOIN user ON event.organizerId = user.id WHERE event.id = ?;'

const addNewEvent = 'INSERT INTO event (title, location, start, end, multi, description, organizerId) VALUES (?, ?, ?, ?, ?, ?, ?);'

const deleteEventById = 'DELETE FROM event WHERE id = ?;'

const getAllUsers = 'SELECT id, name, link FROM user;'

const getUserById = 'SELECT id, username, name, link, bgColor, fgColor FROM user WHERE id = ?;'

const getUserAllById = 'SELECT * FROM user WHERE id = ?;'

const getUserAllByUsername = 'SELECT * FROM user WHERE username = ?;'

const modifyUserById = 'UPDATE user SET username = ?, name = ?, link = ?, bgColor = ?, fgColor = ? WHERE id = ?;'

const modifyUserPasswordById = 'UPDATE user SET passwordHash = ? WHERE id = ?;'

const modifyEventById = 'UPDATE event SET title = ?, location = ?, start = ?, end = ?, multi = ?, description = ? WHERE id = ?'

module.exports = {
  getAllEvents,
  getEventById,
  addNewEvent,
  deleteEventById,
  getAllUsers,
  getUserById,
  getUserAllById,
  getUserAllByUsername,
  modifyUserById,
  modifyUserPasswordById,
  modifyEventById
}
