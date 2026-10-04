import api from './api'

export default {
  getAll(params = {}) {
    // json-server soporta filtros por query string, ej: ?categoria=Audio
    return api.get('/productos', { params })
  },
  getById(id) {
    return api.get(`/productos/${id}`)
  },
  create(producto) {
    return api.post('/productos', producto)
  },
  update(id, producto) {
    return api.put(`/productos/${id}`, producto)
  },
  remove(id) {
    return api.delete(`/productos/${id}`)
  }
}
