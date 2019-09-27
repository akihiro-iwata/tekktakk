import Takk from './model/takk'
import { storage } from '~/plugins/firebase'

// TODO: takk/create apiを叩く
export const state = () => ({
    latest: undefined,
    archives: []
})

export const mutations = {
    SET_LATEST (state, { videoObject }) {
        state.latest = videoObject
    },
}

export const actions = {
    save ({ commit }, { title, slide }) {
        commit('SET_LATEST', videoObject)
    },
    async upload({ state, commit }) {
        const ref = storage.ref().child(`${fileName}.webm`)
        await ref.put(state.latest)
        const downloadUrl = await ref.getDownloadURL()
        // call api
        // const res = await this.$axios.post('/api/takks/create', { uid, displayName, email, photoURL })
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