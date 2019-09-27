<template>
  <v-row justify="center">
    <v-dialog persistent max-width="600px" v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="headline">お疲れ様でした！</span>
        </v-card-title>
        <v-card-text>早速今のスピーチの動画をアップロードしましょう！</v-card-text>
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
          <v-btn color="primary" @click="upload"><v-icon>mdi-cloud-upload</v-icon>アップロード</v-btn>
          <v-btn @click="close">キャンセル</v-btn>
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
    upload () {
      this.dialog = false
      this.$emit('upload', { title: this.title, slideUrl: this.slideUrl })
    }
  },
  data () {
    return {
      title: '',
      slideUrl: '',
      dialog: true
    }
  }
}
</script>

<style scoped lang="scss">
</style>