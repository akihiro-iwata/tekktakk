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
            <v-btn color="primary" @click="startCapture">録画開始</v-btn>
          </v-col>
          <v-col
            cols="9">
            <video autoplay :srcObject.prop="stream"></video>
          </v-col>
        </v-layout>

        <div style="width: 100vw; height; 3vh"></div>
        <!-- step2 -->
        <v-layout
          row
          justify-center
          align-center
        >
          <v-col
            cols="2">
            <v-btn color="primary" @click="stopCapture">録画停止 {{this.chunks.length}}</v-btn>
            <a id="download" :url="micRecording">Download</a>
          </v-col>
          <v-col
            cols="9">
            <!-- <video autoplay :src="recording"></video> -->
            <audio id="player" controls :src="micRecording"></audio>
          </v-col>
        </v-layout>
    </v-col>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      stream: undefined,
      recorder: undefined,
      chunks: [],
      recording: undefined,
      micStream: undefined,
      recordChunk: [],
      micRecorder: undefined,
      micRecording: undefined
    }
  },
  methods: {
    async startCapture () {
      try {
        // 映像
        this.chunks = []
        this.stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: false
        })
        this.recorder = new MediaRecorder(this.stream, {mimeType: 'video/webm'})
        this.recorder.addEventListener('dataavailable', event => {
          if (event.data && event.data.size > 0) {
            this.chunks.push(event.data);
          }
        })
        this.recorder.start(10)

        // マイク
        const result = await navigator.permissions.query({name:'microphone'})
        
        const options = {mimeType: 'video/webm;codecs=vp9'}
        this.micStream = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: true
        })
        this.micRecorder = new MediaRecorder(this.micStream, options)
        this.micRecorder.addEventListener('dataavailable', e => {
          if (e.data && e.data.size > 0) {
            this.recordChunk.push(e.data);
          }
        })
        this.micRecorder.start()


        // this.context = new AudioContext()
        // const input = this.context.createMediaStreamSource(this.micStream)
        // const processor = this.context.createScriptProcessor(1024,1,1)
        // processor.connect(this.context.destination)
        // processor.onaudioprocess = function(e){
        //  // Do something with the data, i.e Convert this to WAV
        //  console.log(e.inputBuffer)
        // }

      } catch(err) {
        console.error("Error: " + err)
      }
    },
    async stopCapture () {
      try {
        this.recorder.stop()
        this.recorder = undefined;
        this.stream.getTracks().forEach(track => track.stop())
        this.stream = undefined;
        this.recording = window.URL.createObjectURL(new Blob(this.chunks, {type: 'video/webm'}))

        this.micRecorder.stop()
        this.micRecording = window.URL.createObjectURL(this.recordChunk)
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
