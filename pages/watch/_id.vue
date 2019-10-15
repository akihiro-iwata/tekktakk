<template>
  <v-row justify="center">
    <v-col cols="10" class="video-container">
      <video
          class="video-js "
          ref="videoPlayer"
        >
      </video>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

export default {
  async mounted () {
    try {
      if (this.$route.params.id === 'undefined') { // なぜかブラウザバックでidがundefined
        this.$router.push('/home')
        return 
      }
      this.activate()
      await this.view({ id: this.$route.params.id })
      this.player = videojs(this.$refs.videoPlayer, this.playerOptions, function onPlayerReady() {
            console.log('onPlayerReady', this);
      })
      this.deactivate()
    } catch (e) {
      console.error(e)
      this.showError({ message: 'エラーが発生しました。すみませんが、時間をおいて再度実行してください。' })
      this.deactivate()
    }
  },
  computed: {
    ...mapGetters('takk', ['watchVideoUrl']),
    playerOptions() {
      return {
        aspectRatio: '16:9',
        height: '480',
        autoplay: true,
        muted: true,
        controls: true,
        liveui: false,
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
            type: "video/mp4",
            src: this.watchVideoUrl
          }],
      }
    }
  },
  data () {
    return {
      player: null
    }
  },
  methods: {
    ...mapActions('loading', ['activate', 'deactivate']),
    ...mapActions('takk', ['view'])
  }
}
</script>