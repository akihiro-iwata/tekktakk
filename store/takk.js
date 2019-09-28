import Takk from './model/takk'
import { storage } from '~/plugins/firebase'

export const state = () => ({
    video: undefined,
    thumbnail: undefined,
    archives: []
})

export const mutations = {
    SET_video (state, { videoObject }) {
        state.video = videoObject
    },
    SET_THUMBNAIL (state, { thumbnail }) {
        state.thumbnail = thumbnail
    }
}

const __fileName = () => {
    const now = new Date()
    return `${now.getFullYear()}-${(now.getMonth() + 1)}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}-${now.getMilliseconds()}`
}

export const actions = {
    save ({ commit }, { videoObject }) {
        commit('SET_video', { videoObject })
    },
    saveThumbnail ({ commit }, { thumbnail }) {
        commit('SET_THUMBNAIL', { thumbnail })
    },
    async upload({ state, commit, rootState }, { title, slideUrl }) {
        const movieFileName = `${__fileName()}.webm`
        const movieFileNameRef = storage.ref('movies').child(movieFileName)
        await movieFileNameRef.put(state.video)
        const movieDownloadUrl = await movieFileNameRef.getDownloadURL()

        const thumbnailFileName = `${__fileName()}.png`
        const thumbnailFileNameRef = storage.ref('movies').child(thumbnailFileName)
        await thumbnailFileNameRef.put(state.thumbnail)
        const thumbnailDownloadUrl = await thumbnailFileNameRef.getDownloadURL()

        const res = await this.$axios.post('/api/takks/create', { 
            uid: rootState.user.user.uid, 
            video: movieDownloadUrl,
            slide: slideUrl,
            thumbnail: thumbnailDownloadUrl,
            title,
            movieFileName,
        })
    },
}

export const getters = {
}