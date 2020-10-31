import axios from 'axios'
import tokenService from './token'

const baseUrl = '/api/events'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addNew = async eventObject => {
  const config = {
    headers: { Authorization: tokenService.getToken() }
  }

  const response = await axios.post(baseUrl, eventObject, config)
  return response.data
}

const editExisting = async eventObject => {
  const config = {
    headers: { Authorization: tokenService.getToken() }
  }

  const url = `${baseUrl}/${eventObject.id}`
  const response = await axios.post(url, eventObject, config)
  console.log(response.data)
  return response.data
}

const deleteExisting = async id => {
  const config = {
    headers: { Authorization: tokenService.getToken() }
  }

  const url = `${baseUrl}/${id}`
  const response = await axios.delete(url, config)
  return response.data
}

export default {
  getAll,
  addNew,
  editExisting,
  deleteExisting
}
