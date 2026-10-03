export default {
  namespaced: true,
  state: () => ({
    ids: []
  }),
  mutations: {
    TOGGLE(state, id) {
      const idx = state.ids.indexOf(id)
      if (idx === -1) {
        state.ids.push(id)
      } else {
        state.ids.splice(idx, 1)
      }
    }
  },
  actions: {
    toggleFavorito({ commit }, id) {
      commit('TOGGLE', id)
    }
  },
  getters: {
    esFavorito: (state) => (id) => state.ids.includes(id),
    cantidad: (state) => state.ids.length
  }
}
