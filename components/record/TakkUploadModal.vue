<template>
  <v-row justify="center">
    <v-dialog persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">動画をアップロード</span>
        </v-card-title>
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
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  methods: {
    close () {
      this.$emit('close')
    },
    upload () {
      this.$emit('upload', { title: this.title, slideUrl: this.slideUrl })
    }
  },
  data () {
    return {
      title: '',
      slideUrl: '',
    }
  }
}
</script>

<style scoped lang="scss">
</style>