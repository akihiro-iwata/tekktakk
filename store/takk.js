import Takk from './model/takk'
import { storage } from '~/plugins/firebase'

export const state = () => ({
  thumbnail: undefined,
  archives: [],
  takkList: [],
  myTakkList: [],
  watchVideoUrl: ''
})

export const mutations = {
  SET_VIDEO (state, { videoObject }) {
    state.video = videoObject
  },
  SET_THUMBNAIL (state, { thumbnail }) {
    state.thumbnail = thumbnail
  },
  SET_TAKK_LIST (state, { takkList }) {
    state.takkList = takkList
  },
  SET_MY_TAKK_LIST (state, { takkList }) {
    state.myTakkList = takkList
  },
  SET_WATCH_VIDEO_URL(state, { url }) {
    state.watchVideoUrl = url
  }
}

const __fileName = () => {
  const now = new Date()
  return `${now.getFullYear()}-${(now.getMonth() + 1)}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}-${now.getMilliseconds()}`
}

export const actions = {
  save ({ commit }, { videoObject }) {
    commit('SET_VIDEO', { videoObject })
  },
  saveThumbnail ({ commit }, { thumbnail }) {
    commit('SET_THUMBNAIL', { thumbnail })
  },
  async view ({ commit }, { id }) {
    const { takk } = await this.$apiClient.post('/api/takks/view', { id })
    commit('SET_WATCH_VIDEO_URL', { url: takk.videoUrl })
  },
  async upload ({ state }, { title, slideUrl }) {
    const movieFileName = `${__fileName()}.mp4`
    const movieFileNameRef = storage.ref('movies').child(movieFileName)
    await movieFileNameRef.put(state.video)
    const movieDownloadUrl = await movieFileNameRef.getDownloadURL()

    const thumbnailFileName = `${__fileName()}.png`
    const thumbnailFileNameRef = storage.ref('movies').child(thumbnailFileName)
    await thumbnailFileNameRef.put(state.thumbnail)
    const thumbnailDownloadUrl = await thumbnailFileNameRef.getDownloadURL()

    await this.$apiClient.post('/api/takks/create', {
      video: movieDownloadUrl,
      slide: slideUrl,
      thumbnail: thumbnailDownloadUrl,
      title,
      movieFileName
    })
  },
  async getAllTakk ({ commit }) {
    const data = await this.$apiClient.post('/api/takks/index', { mode: 'company' })
    if (data.takks) {
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
    } else {
      commit('SET_TAKK_LIST', { takkList: [] })  
    }
  },
  async getUserTakk ({ commit }) {
    const data = await this.$apiClient.post('/api/takks/index', { mode: 'user' })
    if (data.takks) {
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
      commit('SET_MY_TAKK_LIST', { takkList })
    } else {
      commit('SET_MY_TAKK_LIST', { takkList: [] })
    }
  },
  async deleteUserTakk (_, { id }) {
    await this.$apiClient.post('/api/takks/delete', { id })
  }
}

export const getters = {
  allTakks (state) {
    return state.takkList
  },
  myTakks (state) {
    return state.myTakkList
  },
  watchVideoUrl (state) {
    return state.watchVideoUrl
  }
}
