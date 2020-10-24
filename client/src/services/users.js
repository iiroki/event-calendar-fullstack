import axios from 'axios'
import tokenService from './token'

const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const updateInformation = async (id, userObject) => {
  const config = {
    headers: { Authorization: tokenService.getToken() }
  }

  const url = `${baseUrl}/${id}`
  // Set passwordChange value
  const body = { ...userObject, passwordChange: 0 }
  const response = await axios.post(url, body, config)
  return response.data
}

const updatePassword = async (id, userObject) => {
  const config = {
    headers: { Authorization: tokenService.getToken() }
  }

  const url = `${baseUrl}/${id}`
  // Set passwordChange value
  const body = { ...userObject, passwordChange: 1 }
  await axios.post(url, body, config)
}

export default {
  getAll,
  updateInformation,
  updatePassword
}
