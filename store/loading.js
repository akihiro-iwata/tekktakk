export const state = () => ({
  active: false
})

export const mutations = {
  SET_STATUS (state, payload) {
    state.active = !!payload
  }
}

export const actions = {
  activate ({ commit }) {
    commit('SET_STATUS', true)
  },
  deactivate ({ commit }) {
    commit('SET_STATUS', false)
  }
}

export const getters = {
  status (state) {
    return !!state.active
  }
}
