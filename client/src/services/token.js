let authToken = null

// Token for request verification
const setToken = newToken => {
  authToken = `BEARER ${newToken}`
}

const clearToken = () => {
  authToken = null
}

const getToken = () => authToken

export default {
  setToken,
  clearToken,
  getToken
}
