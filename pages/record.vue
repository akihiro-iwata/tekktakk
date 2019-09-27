<template>
  <v-layout
    row
    justify-center
    align-center
  >
    <v-col
      cols="11">
        <!-- step1 -->
        <v-layout
          row
          justify-center
          align-center
        >
          <v-col
            cols="2">
            <div class="step-1">
              <v-btn v-if="videoChunks.length === 0" color="primary" @click="startCapture" :disabled="!isMicrophonePermitted">
                <v-icon>mdi-play-circle-outline</v-icon>録画開始
              </v-btn>
              <v-btn v-if="videoChunks.length !== 0 && isRecording" color="error" @click="stopCapture">
                <v-icon>mdi-pause-circle-outline</v-icon>録画停止
              </v-btn>
              <div style="width: 100%; height: 2vh"></div>
              <v-btn v-if="videoChunks.length !== 0 && !isRecording" @click="showUploadModal = true" color="primary">
                <v-icon>mdi-cloud-upload</v-icon>アップロード
              </v-btn>
              <div style="width: 100%; height: 2vh"></div>
              <v-btn v-if="videoChunks.length !== 0 && !isRecording" @click="reStartCapture" color="primary">
                <v-icon>mdi-play-circle-outline</v-icon>再録画
              </v-btn>
            </div>
          </v-col>
          <v-col
            cols="9">
            <video v-show="!isRecording" controls :src="videoUrlObject"></video>
            <video v-show="isRecording" autoplay :srcObject.prop="combinedStream"></video>
          </v-col>
        </v-layout>
    </v-col>
    <MicrophonePermissionModal v-if="showMicrophoneModal"  @close="modalClose"/>
    <TakkUploadModal v-if="showUploadModal" @close="showUploadModal = false" @upload="uploadVideo" />
    <UploadCompleteModal v-if="showUploadCompleteModal" @close="toHome"/>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
import MicrophonePermissionModal from '~/components/record/MicrophonePermissionModal'
import TakkUploadModal from '~/components/record/TakkUploadModal'
import UploadCompleteModal from '~/components/record/UploadCompleteModal'

export default {
  components: { MicrophonePermissionModal, TakkUploadModal, UploadCompleteModal },
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
      videoChunks: [],
      videoObject: undefined,
      videoUrlObject: undefined,
      mediaRecorder: undefined,
      isMicrophonePermitted: false,
      combinedStream: undefined,
      isRecording: false,
      showMicrophoneModal: false,
      showUploadModal: false,
      showUploadCompleteModal: false,
    }
  },
  methods: {
    ...mapActions('loading', ['activate', 'deactivate']),
    ...mapActions('takk', ['upload', 'save']),
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
      } catch(err) {
        console.error("Error: ", err)
      }
    },
    async reStartCapture () {


    },
    async uploadVideo ({ title, slideUrl }) {
      console.log('title', title)
      this.activate()
      try {
        await this.upload({ title, slideUrl })
        this.deactivate()
        this.showUploadCompleteModal = true
      } catch (e) {
        console.error(e)
        this.deactivate()
      }
    },
    modalClose () {
      this.showMicrophoneModal = false
    },
    toHome () {
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
video {
  width: 100%;
  height: 100%;
}

</style>
