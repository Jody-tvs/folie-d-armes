import axios from 'axios'

const API_URL = 'https://folie-d-armes.onrender.com/api'

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password })
  return response.data
}

export default {
  login,
}