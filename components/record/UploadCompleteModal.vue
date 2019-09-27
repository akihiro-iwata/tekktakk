<template>
  <v-row justify="center">
    <v-dialog persistent max-width="400px" v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="headline">シェアありがとうございます！</span>
        </v-card-title>
        <v-card-text>アップロードが無事に完了しました。</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" @click="close">ホームへ戻る</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  methods: {
    close () {
      this.dialog = false
      this.$emit('close')
    },
  },
  data () {
    return {
      dialog: true
    }
  }
}
</script>

<style scoped lang="scss">
</style>