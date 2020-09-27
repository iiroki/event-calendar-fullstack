// MySQL queries

const getAllEvents = 'SELECT event.id, title, location, start, end, multi, description, organizer_id, bg_color, fg_color FROM event INNER JOIN user ON event.organizer_id = user.id;'

const getEventById = 'SELECT * FROM event WHERE id = ?;'

const addNewEvent = 'INSERT INTO event (title, location, start, end, multi, description, organizer_id) VALUES (?, ?, ?, ?, ?, ?, ?);'

const deleteEventById = 'DELETE FROM event WHERE id = ?;'

const addNewUser = 'INSERT INTO user (username, name, link, password_hash) VALUES (?, ?, ?, ?);'

const getAllUsers = 'SELECT id, name, link FROM user;'

const getUserById = 'SELECT id, username, name, link, bg_color, fg_color FROM user WHERE id = ?;'

const getUserAllById = 'SELECT * FROM user WHERE id = ?;'

const getUserAllByUsername = 'SELECT * FROM user WHERE username = ?;'

const modifyUserById = 'UPDATE user SET username = ?, name = ?, link = ?, bg_color = ?, fg_color = ? WHERE id = ?;'

const modifyUserPasswordById = 'UPDATE user SET password_hash = ? WHERE id = ?;'

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
