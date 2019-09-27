import User from './model/user'

export const state = () => ({
    user: {}
})

export const mutations = {
    SET_USER (state, { uid, displayName, email, photoURL }) {
        const user = new User({ uid, displayName, email, photoURL })
        state.user = user
    },
    UNSET_USER(state) {
        state.user = {}
    },
}

export const actions = {
    async login({ commit }, payload) {
        const uid = payload.user.uid
        const displayName = payload.user.displayName
        const email = payload.user.email
        const photoURL = payload.user.photoURL
        const res = await this.$axios.post('/api/users/login', { uid, displayName, email, photoURL })
        commit('SET_USER', { uid, displayName, email, photoURL })
    },
    logout({ commit }) {
        commit('UNSET_USER')
    },
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
}