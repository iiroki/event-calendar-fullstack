import userService from '../services/users'

const initialUsers = []

const userReducer = (state = initialUsers, action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data

    default:
      return state
  }
}

export const initUsers = () => (
  async thunk => {
    const users = await userService.getAll()

    thunk({
      type: 'INIT_USERS',
      data: users
    })
  }
)

export default userReducer
