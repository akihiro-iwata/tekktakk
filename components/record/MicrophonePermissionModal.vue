<template>
  <v-dialog
    v-model="status"
    max-width="400"
  >
    <v-card>
      <v-card-title class="headline">
        マイクへのアクセスが許可されていません
      </v-card-title>

      <v-card-text>
        Google Chromeからマイクへのアクセスが許可されていません。
        アドレスバーの鍵アイコンをクリックし、[サイトの設定]->[マイク]から、このサイトのマイク利用を許可してください。
      </v-card-text>

      <v-card-actions>
        <div class="flex-grow-1" />

        <v-btn
          color="green darken-1"
          text
          @click="close"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      status: true
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
</style>
