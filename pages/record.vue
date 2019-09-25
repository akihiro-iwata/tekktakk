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
            <v-btn v-if="videoChunks.length === 0" color="primary" @click="startCapture">
              <v-icon>mdi-play-circle-outline</v-icon>録画開始
            </v-btn>
            <v-btn v-if="videoChunks.length !== 0" color="error" @click="stopCapture">
              <v-icon>mdi-pause-circle-outline</v-icon>録画停止
            </v-btn>
          </v-col>
          <v-col
            cols="9">
            <video controls :src="videoObject"></video>
          </v-col>
        </v-layout>
    </v-col>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      videoChunks: [],
      videoObject: undefined,
      mediaRecorder: undefined,
    }
  },
  methods: {
    async startCapture () {
      const result = await navigator.permissions.query({name:'microphone'})        
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
        const combinedStream = new MediaStream([...videoStream.getTracks(), ...audioStream.getTracks()])
        this.mediaRecorder = new MediaRecorder(combinedStream)
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
      try {
        this.mediaRecorder.stop()
        this.mediaRecorder = undefined;
        this.videoObject = window.URL.createObjectURL(new Blob(this.videoChunks, {type: 'video/webm'}))
      } catch(err) {
        console.error("Error: " + err)
      }
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
