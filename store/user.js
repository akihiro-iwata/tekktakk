import User from './model/user'

export const state = () => ({
  user: {},
  watchVideo: '',
})

export const mutations = {
  SET_USER (state, { uid, displayName, email, photoURL }) {
    const user = new User({ uid, displayName, email, photoURL })
    state.user = user
  },
  UNSET_USER (state) {
    state.user = {}
  },
  SET_WATCH_VIDEO (state, { watchVideo }) {
    state.watchVideo = watchVideo
  },
}

export const actions = {
  async login ({ commit }, payload) {
    const uid = payload.user.uid
    const displayName = payload.user.displayName
    const email = payload.user.email
    const photoURL = payload.user.photoURL
    await this.$axios.post('/api/users/login', { uid, displayName, email, photoURL })
    commit('SET_USER', { uid, displayName, email, photoURL })
  },
  logout ({ commit }) {
    commit('UNSET_USER')
  },
  watch ({ commit }, { video }) {
    commit('SET_WATCH_VIDEO', { watchVideo: video })
  }
}

export const getters = {
  uid (state) {
    return (state.user.uid) ? state.user.uid : JSON.parse(sessionStorage.getItem('vuex')).user.user.uid
  },
  name (state) {
    return state.user.displayName
  },
  email (state) {
    return state.user.email
  },
  photoURL (state) {
    return state.user.photoURL
  },
  watchVideo (state) {
    return state.watchVideo
  },
}
