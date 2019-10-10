<template>
  <v-row justify="center">
    <video controls :src="watchVideoUrl" />
  </v-row>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'

export default {
  async mounted () {
    try {
      if (this.$route.params.id === 'undefined') { // なぜかブラウザバックでidがundefined
        this.$router.push('/home')
        return 
      }
      this.activate()
      await this.view({ id: this.$route.params.id })
      this.deactivate()
    } catch (e) {
      console.error(e)
      this.showError({ message: 'エラーが発生しました。すみませんが、時間をおいて再度実行してください。' })
      this.deactivate()
    }
  },
  computed: {
    ...mapGetters('takk', ['watchVideoUrl'])
  },
  methods: {
    ...mapActions('loading', ['activate', 'deactivate']),
    ...mapActions('takk', ['view'])
  }
}
</script>

<style scoped lang="scss">
video {
  height: 85vh;
  width: auto;
}
</style>
