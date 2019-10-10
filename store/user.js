import User from './model/user'
import { initApiClient } from '../plugins/apiClient'

export const state = () => ({
  user: {},
  watchVideo: '',
  idToken: ''
})

export const mutations = {
  SET_USER (state, { displayName, email, photoURL }) {
    const user = new User({ displayName, email, photoURL })
    state.user = user
  },
  UNSET_USER (state) {
    state.user = {}
    state.idToken = ''
  },
  SET_WATCH_VIDEO (state, { watchVideo }) {
    state.watchVideo = watchVideo
  },
  SET_ID_TOKEN (state, { idToken }) {
    state.idToken = idToken
  }
}

export const actions = {
  async login ({ commit }, { authState, idToken }) {
    const displayName = authState.user.displayName
    const email = authState.user.email
    const photoURL = authState.user.photoURL
    commit('SET_ID_TOKEN', { idToken })
    commit('SET_USER', { displayName, email, photoURL })
    await this.$apiClient.post('/api/users/login')
  },
  logout ({ commit }) {
    commit('UNSET_USER')
  },
  watch ({ commit }, { video }) {
    commit('SET_WATCH_VIDEO', { watchVideo: video })
  }
}

export const getters = {
  name (state) {
    return state.user.displayName
  },
  email (state) {
    if (state.user.email) return state.user.email 
    if (JSON.parse(localStorage.getItem('vuex')).user.user.email) return JSON.parse(localStorage.getItem('vuex')).user.user.email 
    return ''
  },
  photoURL (state) {
    return state.user.photoURL
  },
  watchVideo (state) {
    return state.watchVideo
  },
  idToken (state) {
    if (state.idToken) return state.idToken
    if (JSON.parse(localStorage.getItem('vuex'))) return JSON.parse(localStorage.getItem('vuex')).user.idToken
    return ''
  }
}
