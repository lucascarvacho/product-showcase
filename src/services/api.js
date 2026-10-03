import axios from 'axios'

// vue.config.js redirige /api hacia http://localhost:3001 (json-server)
const api = axios.create({
  baseURL: '/api'
})

export default api
