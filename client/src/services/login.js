import axios from 'axios'
import tokenService from './token'

const baseUrl = '/api/login'

const login = async loginCredentials => {
  const response = await axios.post(baseUrl, loginCredentials)
  return response.data
}

const checkValidity = async () => {
  const config = {
    headers: { Authorization: tokenService.getToken() }
  }

  await axios.get(baseUrl, config)
}

export default {
  login,
  checkValidity
}
