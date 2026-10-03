import productosService from '@/services/productos'

export default {
  namespaced: true,
  state: () => ({
    lista: [],
    cargando: false,
    error: false
  }),
  mutations: {
    SET_LISTA(state, productos) {
      state.lista = productos
    },
    SET_CARGANDO(state, valor) {
      state.cargando = valor
    },
    SET_ERROR(state, valor) {
      state.error = valor
    },
    AGREGAR_PRODUCTO(state, producto) {
      state.lista.push(producto)
    },
    ACTUALIZAR_PRODUCTO(state, productoActualizado) {
      const idx = state.lista.findIndex((p) => p.id === productoActualizado.id)
      if (idx !== -1) state.lista.splice(idx, 1, productoActualizado)
    },
    ELIMINAR_PRODUCTO(state, id) {
      state.lista = state.lista.filter((p) => p.id !== id)
    }
  },
  actions: {
    async fetchProductos({ commit }) {
      commit('SET_CARGANDO', true)
      commit('SET_ERROR', false)
      try {
        const respuesta = await productosService.getAll()
        commit('SET_LISTA', respuesta.data)
      } catch (err) {
        console.error('Error al cargar productos:', err)
        commit('SET_ERROR', true)
      } finally {
        commit('SET_CARGANDO', false)
      }
    },
    async crearProducto({ commit }, producto) {
      const respuesta = await productosService.create(producto)
      commit('AGREGAR_PRODUCTO', respuesta.data)
      return respuesta.data
    },
    async editarProducto({ commit }, { id, producto }) {
      const respuesta = await productosService.update(id, producto)
      commit('ACTUALIZAR_PRODUCTO', respuesta.data)
      return respuesta.data
    },
    async eliminarProducto({ commit }, id) {
      await productosService.remove(id)
      commit('ELIMINAR_PRODUCTO', id)
    }
  },
  getters: {
    categoriasDisponibles(state) {
      return [...new Set(state.lista.map((p) => p.categoria))]
    },
    productosFiltrados(state, getters, rootState) {
      const categoria = rootState.filtros.categoriaSeleccionada
      if (!categoria) return state.lista
      return state.lista.filter((p) => p.categoria === categoria)
    },
    obtenerPorId: (state) => (id) => {
      return state.lista.find((p) => String(p.id) === String(id))
    }
  }
}
