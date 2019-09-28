<template>
  <v-layout
    row
    justify-center
    align-center
  >
    <v-col
      cols="11">
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">録画する</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2">サムネイルを決める</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">アップロードする</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-row justify="center">
              <v-col cols="11">
                <v-card>
                  <v-card-title>
                    <span class="headline">スピーチを始める</span>
                  </v-card-title>
                  <v-card-text>録画を開始し、スピーチを始めましょう。</v-card-text>
                </v-card>
              </v-col>

              <v-btn v-if="videoChunks.length === 0" color="primary" @click="startCapture" :disabled="!isMicrophonePermitted">
                  <v-icon>mdi-play-circle-outline</v-icon>録画開始
              </v-btn>
              <v-btn v-if="videoChunks.length !== 0 && isRecording" color="error" @click="stopCapture">
                <v-icon>mdi-pause-circle-outline</v-icon>録画停止
              </v-btn>
            </v-row>
            <div style="width: 100%; height: 12px"></div>
            <v-row justify="center">
              <video v-show="isRecording" autoplay :srcObject.prop="combinedStream"></video>
            </v-row>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-col cols="11">
              <v-card>
                <v-card-title>
                  <span class="headline">お疲れ様でした！</span>
                </v-card-title>
                <v-card-text>あなたのトークが魅力的に見えるサムネイルを選択してください。</v-card-text>
              </v-card>
            </v-col>
            <v-row justify="center">
              <v-col col="11">
                <div class="image-list">
                  <div v-for="thumbnail in thumbnails" :key="thumbnail.index" @click="clickThumbnail(thumbnail)">
                    <img :src="thumbnail"/>
                  </div>
                </div>
              </v-col>
            </v-row>
            <div style="width: 100%; height: 12px"></div>
            <v-row justify="center">
              <video v-show="isRecording" autoplay :srcObject.prop="combinedStream"></video>
            </v-row>
          </v-stepper-content>

           <v-stepper-content step="3">
            <v-col cols="11">
              <v-card>
                <v-card-title>
                  <span class="headline">これで最後です！</span>
                </v-card-title>
                <v-card-text>タイトルとスライドのURLを入力してください。</v-card-text>
              </v-card>
            </v-col>

            <v-card>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="title" label="タイトル*" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="slideUrl" label="スライドURL"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*入力必須</small>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="primary" @click="uploadVideo"><v-icon>mdi-cloud-upload</v-icon>アップロード</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

        </v-stepper-items>
      </v-stepper>
    </v-col>
    <MicrophonePermissionModal v-if="showMicrophoneModal"  @close="modalClose"/>
    <UploadCompleteModal v-if="showUploadCompleteModal" @close="toHome"/>
    <ThumbnailConfirmModal :status="showThumnailModal" :img="selectedThumbnail" @ok="toUploadVideo" @ng="showThumnailModal = false" />
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
import MicrophonePermissionModal from '~/components/record/MicrophonePermissionModal'
import TakkUploadModal from '~/components/record/TakkUploadModal'
import UploadCompleteModal from '~/components/record/UploadCompleteModal'
import ThumbnailConfirmModal from '~/components/record/ThumbnailConfirmModal'

export default {
  components: { MicrophonePermissionModal, UploadCompleteModal, ThumbnailConfirmModal },
  async mounted () {
    const result = await navigator.permissions.query({ name: 'microphone' })
    if (result.state !== 'granted') {
      this.showMicrophoneModal = true
      this.isMicrophonePermitted = false
    } else {
      this.isMicrophonePermitted = true
    }
  },
  data () {
    return {
      e1: 1,
      videoChunks: [],
      videoObject: undefined,
      videoUrlObject: undefined,
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
      slideUrl: '',
    }
  },
  methods: {
    ...mapActions('loading', ['activate', 'deactivate']),
    ...mapActions('takk', ['upload', 'save', 'saveThumbnail']),
    ...mapActions('error', ['showError']),
    async startCapture () {
      this.isRecording = true
      try {
        this.videoChunks = []
        const videoStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: false
        })
        const audioStream = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: true
        })
        this.combinedStream = new MediaStream([...videoStream.getTracks(), ...audioStream.getTracks()])
        this.mediaRecorder = new MediaRecorder(this.combinedStream, {mimeType: 'video/webm'})
        this.mediaRecorder.addEventListener('dataavailable', event => {
            if (event.data && event.data.size > 0) {
              this.videoChunks.push(event.data);
            }
        })
        this.mediaRecorder.start(10)
      } catch(err) {
        console.error("Error: " + err)
        this.showError({ message: 'エラーが発生しました。すみませんが、時間をおいて再度実行してください。' })
      }
    },
    async stopCapture () {
      this.isRecording = false
      try {
        const tracks = this.combinedStream.getTracks()
        tracks.forEach((track) => {
          track.stop()
        })
        this.mediaRecorder.stop()
        this.mediaRecorder = undefined
        this.videoObject = new Blob(this.videoChunks, {type: 'video/webm'})
        this.videoUrlObject = window.URL.createObjectURL(this.videoObject)
        this.save({ videoObject: this.videoObject })
        this.e1 = 2
        this.shootCapture()
      } catch(err) {
        console.error("Error: ", err)
        this.showError({ message: 'エラーが発生しました。すみませんが、時間をおいて再度実行してください。' })
      }
    },
    shootCapture () {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      const video = document.createElement('video')

      video.onloadeddata = () => {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        video.currentTime = 0
      }

      video.onseeked = () => {
        if(video.currentTime < video.duration ){
          context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
          this.thumbnails.push(canvas.toDataURL('image/jpeg'))
          video.currentTime += 30 
        } else {
          context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
          this.thumbnails.push(canvas.toDataURL('image/jpeg'))
        }
      }
      video.src = this.videoUrlObject
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
    toBlob(base64) {
      const bin = atob(base64.replace(/^.*,/, ''));
      const buffer = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) {
          buffer[i] = bin.charCodeAt(i);
      }
      const blob = new Blob([buffer.buffer], {
          type: 'image/png'
      });
      return blob;
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

.image-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  img {
    height: 200px;
    width: 400px;
    margin: 12px;
  }
}

</style>
