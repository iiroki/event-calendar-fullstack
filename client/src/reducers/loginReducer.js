import loginService from '../services/login'
import tokenService from '../services/token'

const initialLogin = null

const loginReducer = (state = initialLogin, action) => {
  switch(action.type) {
    case 'SET_LOGIN':
      return action.data
    
    case 'LOG_OUT':
      return null

    default:
      return state
  }
}

export const checkLogin = () => (
  async thunk => {
    const loggedUserString = window.localStorage.getItem('loggedUser')

    if (loggedUserString) {
      const loggedUser = JSON.parse(loggedUserString)
      tokenService.setToken(loggedUser.token)

      try {
        await loginService.checkValidity()

        thunk({
          type: 'SET_LOGIN',
          data: loggedUser
        })
      } catch {
        // Removing login if token wasn't valid
        window.localStorage.removeItem('loggedUser')
        thunk({ type: 'LOG_OUT' })
      }
    }
  }
)

export const setLogin = loginObject => (
  async thunk => {
    const loggedUser = await loginService.login(loginObject)

    window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
    tokenService.setToken(loggedUser.token)

    thunk({
      type: 'SET_LOGIN',
      data: loggedUser
    })
  }
)

export const logOut = () => {
  window.localStorage.removeItem('loggedUser')
  tokenService.clearToken()
  return ({ type: 'LOG_OUT' })
}

export const updateLogin = userObject => (
  async thunk => {
    const loggedUserString = window.localStorage.getItem('loggedUser')
    const loggedUser = JSON.parse(loggedUserString)

    const newLoggedUser = {
      ...loggedUser,
      username: userObject.username,
      name: userObject.name,
      link: userObject.link
    }

    window.localStorage.setItem('loggedUser', JSON.stringify(newLoggedUser))

    thunk({
      type: 'SET_LOGIN',
      data: newLoggedUser
    })
  }
)

export default loginReducer
