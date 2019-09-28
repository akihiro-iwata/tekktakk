import Takk from './model/takk'
import { storage } from '~/plugins/firebase'

export const state = () => ({
    video: undefined,
    thumbnail: undefined,
    archives: [],
    takkList: []
})

export const mutations = {
    SET_video (state, { videoObject }) {
        state.video = videoObject
    },
    SET_THUMBNAIL (state, { thumbnail }) {
        state.thumbnail = thumbnail
    },
    SET_TAKK_LIST (state, { takkList }) {
        state.takkList = takkList
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
    async getAllTakk ({ commit }) {
        const { data } = await this.$axios.get('/api/takks/')
        console.log('data', data)
        const takkList = data.takks.map(v => new Takk({
            id: v.id,
            title: v.title,
            slide: v.slide,
            video: v.video,
            name: v.name,
            handleName: v.handleName,
            thumbnail: v.thumbnail,
            publishDate: v.publishDate
        }))
        commit('SET_TAKK_LIST', { takkList })
    }
}

export const getters = {
    allTakks (state) {
        return state.takkList
    }
}