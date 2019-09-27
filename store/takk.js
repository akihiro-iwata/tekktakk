import Takk from './model/takk'
import { storage } from '~/plugins/firebase'

export const state = () => ({
    latest: undefined,
    archives: []
})

export const mutations = {
    SET_LATEST (state, { videoObject }) {
        state.latest = videoObject
    },
}

const __fileName = () => {
    const now = new Date()
    return `${now.getFullYear()}-${(now.getMonth() + 1)}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}-${now.getMilliseconds()}`
}

export const actions = {
    save ({ commit }, { videoObject }) {
        commit('SET_LATEST', { videoObject })
    },
    async upload({ state, commit, rootState }, { title, slideUrl }) {
        const fileName = `${__fileName()}.webm`
        const ref = storage.ref('movies').child(fileName)
        await ref.put(state.latest)
        const downloadUrl = await ref.getDownloadURL()
        const res = await this.$axios.post('/api/takks/create', { 
            uid: rootState.user.user.uid, 
            video: downloadUrl,
            slide: slideUrl,
            title,
            fileName,
        })
    },
}

export const getters = {
}