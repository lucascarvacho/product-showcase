export default {
  namespaced: true,
  state: () => ({
    categoriaSeleccionada: ''
  }),
  mutations: {
    SET_CATEGORIA(state, categoria) {
      state.categoriaSeleccionada = categoria
    }
  },
  actions: {
    cambiarCategoria({ commit }, categoria) {
      commit('SET_CATEGORIA', categoria)
    }
  }
}
