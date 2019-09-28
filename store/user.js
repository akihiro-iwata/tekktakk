import User from './model/user'

export const state = () => ({
  user: {},
  watchVideo: '',
  role: '',
  companyId: '',
  isAdmin: false
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
  SET_PROFILE (state, { profile }) {
    state.role = profile.role
    state.companyId = profile.company_id
  },
  SET_ADMIN (state, { isAdmin }) {
    state.isAdmin = isAdmin
  }
}

export const actions = {
  async login ({ commit }, payload) {
    const uid = payload.user.uid
    const displayName = payload.user.displayName
    const email = payload.user.email
    const photoURL = payload.user.photoURL
    const { data } = await this.$axios.post('/api/users/login', { uid, displayName, email, photoURL })
    const { profile } = data
    commit('SET_PROFILE', profile)
    commit('SET_USER', { uid, displayName, email, photoURL })
  },
  async adminCheck ({ commit, state }) {
    const { data } = await this.$axios.post('/api/users/admin-check', { uid: state.user.uid })
    const { isAdmin } = data
    commit('SET_ADMIN', { isAdmin })
  },
  async getAllStaff ({ commit, state }) {
    const { data } = await this.$axios.post('/api/users/index/all', { uid: state.user.uid, companyId: state.user.companyId })
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
    return state.user.uid
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
  isAdmin (state) {
    return state.isAdmin
  },
  companyId (state) {
    return state.companyId
  }
}
