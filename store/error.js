export const state = () => ({
  active: false,
  message: ''
})

export const mutations = {
  SET_ERROR (state, payload) {
    state.active = true
    state.message = payload
  },
  UNSET_ERROR (state) {
    state.active = false
    state.message = ''
  }
}

export const actions = {
  showError ({ commit }, { message }) {
    commit('SET_ERROR', message)
  },
  deactivate ({ commit }) {
    commit('UNSET_ERROR')
  }
}

export const getters = {
  status (state) {
    return !!state.active
  },
  message (state) {
    return state.message
  }
}
