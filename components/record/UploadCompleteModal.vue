<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">シェアありがとうございます！</span>
        </v-card-title>
        <v-card-text>アップロードが無事に完了しました。</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1" />
          <v-btn color="primary" @click="close">
            ホームへ戻る
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      dialog: true
    }
  },
  methods: {
    close () {
      this.dialog = false
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
</style>
