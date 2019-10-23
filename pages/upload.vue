<template>
  <v-layout
    row
    justify-center
    align-center
  >
    <v-col
      cols="11"
    >
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">
            動画を選択する
          </v-stepper-step>

          <v-divider />

          <v-stepper-step :complete="e1 > 2" step="2">
            サムネイルを決める
          </v-stepper-step>

          <v-divider />

          <v-stepper-step step="3">
            アップロードする
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-row justify="center">
              <v-col cols="12">
                <v-card>
                  <v-card-title>
                    <span class="headline">動画を選択</span>
                  </v-card-title>
                  <v-card-text>アップロードする動画を選択してください。</v-card-text>
                </v-card>
                <div style="width: 100%; height: 12px" />
                <v-file-input v-model="videoObject" accept=".mp4,.webm" label="mp4, webm"></v-file-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1">
                <v-btn color="primary" @click="toSelectThumbnail">
                    次へ
                </v-btn>
              </v-col>
            </v-row>

          </v-stepper-content>

          <v-stepper-content step="2">
            <v-col cols="11">
              <v-card>
                <v-card-title>
                  <span class="headline">サムネイルを選ぶ</span>
                </v-card-title>
                <v-card-text>あなたの動画が魅力的に見えるサムネイルを選択してください。</v-card-text>
              </v-card>
            </v-col>
            <v-row justify="center">
              <v-col col="11">
                <div class="image-list">
                  <div v-for="thumbnail in thumbnails" :key="thumbnail.index" style="cursor: pointer;" @click="clickThumbnail(thumbnail)">
                    <img :src="thumbnail">
                  </div>
                </div>
              </v-col>
            </v-row>
            <div style="width: 100%; height: 12px" />
            <v-row justify="center">
              <video v-show="isRecording" autoplay :srcObject.prop="combinedStream" />
            </v-row>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-col cols="11">
              <v-card>
                <v-card-title>
                  <span class="headline">これで最後です！</span>
                </v-card-title>
                <v-card-text>タイトルを入力してください。</v-card-text>
              </v-card>
            </v-col>

            <v-card>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="title" label="タイトル*" required />
                      <div v-show="!titleEntered" class="v-messages__message">
                        タイトルは必須です
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*入力必須</small>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1" />
                <v-btn color="primary" @click="uploadVideo">
                  <v-icon>mdi-cloud-upload</v-icon>アップロード
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-col>
    <MicrophonePermissionModal v-if="showMicrophoneModal" @close="modalClose" />
    <UploadCompleteModal v-if="showUploadCompleteModal" @close="toHome" />
    <ThumbnailConfirmModal :status="showThumnailModal" :img="selectedThumbnail" @ok="toUploadVideo" @ng="showThumnailModal = false" />
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
import MicrophonePermissionModal from '~/components/record/MicrophonePermissionModal'
import UploadCompleteModal from '~/components/record/UploadCompleteModal'
import ThumbnailConfirmModal from '~/components/record/ThumbnailConfirmModal'

export default {
  components: { MicrophonePermissionModal, UploadCompleteModal, ThumbnailConfirmModal },
  data () {
    return {
      e1: 1,
      videoChunks: [],
      videoObject: undefined,
      mediaRecorder: undefined,
      isMicrophonePermitted: false,
      combinedStream: undefined,
      isRecording: false,
      ctx: undefined,
      thumbnails: [],
      selectedThumbnail: undefined,
      showMicrophoneModal: false,
      showUploadModal: false,
      showUploadCompleteModal: false,
      showThumnailModal: false,
      title: '',
      slideUrl: ''
    }
  },
  computed: {
    titleEntered () {
      return this.title.length !== 0
    }
  },
  async mounted () {
    this.thumbnails = []
  },
  methods: {
    ...mapActions('loading', ['activate', 'deactivate']),
    ...mapActions('takk', ['upload', 'save', 'saveThumbnail']),
    ...mapActions('error', ['showError']),
    toSelectThumbnail () {
      this.activate()
      const reader = new FileReader()
      reader.onload = (evt) => {
        this.src = evt.target.result
        this.shootCapture(this.src)
      }
      reader.readAsDataURL(this.videoObject)
      this.save({ videoObject: this.videoObject })
      this.deactivate()
      this.e1 = 2
    },
    shootCapture (src) {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      const video = document.createElement('video')

      video.onloadeddata = () => {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        video.currentTime = 0
      }

      video.onseeked = () => {
        if (video.currentTime < video.duration) {
          context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
          this.thumbnails.push(canvas.toDataURL('image/jpeg'))
          video.currentTime += 5
        } else {
          context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
          this.thumbnails.push(canvas.toDataURL('image/jpeg'))
        }
      }
      video.src = src
      video.load()
    },
    clickThumbnail (thumbnail) {
      this.selectedThumbnail = thumbnail
      this.showThumnailModal = true
    },
    toUploadVideo () {
      try {
        const blobImage = this.toBlob(this.selectedThumbnail)
        this.saveThumbnail({ thumbnail: blobImage })
        this.e1 = 3
        this.showThumnailModal = false
      } catch (e) {
        console.error(e)
        this.showError({ message: 'エラーが発生しました。すみませんが、時間をおいて再度実行してください。' })
      }
    },
    async uploadVideo () {
      if (this.title.length === 0) { return }
      this.activate()
      try {
        await this.upload({ title: this.title, slideUrl: this.slideUrl })
        this.deactivate()
        this.showUploadCompleteModal = true
      } catch (e) {
        console.error(e)
        this.deactivate()
        this.showError({ message: 'エラーが発生しました。すみませんが、時間をおいて再度実行してください。' })
      }
    },
    toBlob (base64) {
      const bin = atob(base64.replace(/^.*,/, ''))
      const buffer = new Uint8Array(bin.length)
      for (let i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i)
      }
      const blob = new Blob([buffer.buffer], {
        type: 'image/png'
      })
      return blob
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    modalClose () {
      this.showThumnailModal = true
      this.showMicrophoneModal = false
    },
    toHome () {
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped lang="scss">
video {
  width: 100%;
  height: 100%;
}

.canvas {
  display: none;
}

.v-messages__message {
  color: #E53935;
}

.image-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  img {
    height: 200px;
    width: auto;
    margin: 12px;
  }
}

</style>
