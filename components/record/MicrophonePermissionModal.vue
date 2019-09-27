<template>
    <v-dialog
      v-model="status"
      max-width="400"
    >
      <v-card>
        <v-card-title class="headline">マイクへのアクセスが許可されていません</v-card-title>

        <v-card-text>
          Google Chromeからマイクへのアクセスが許可されていません。
          アドレスバーの鍵アイコンをクリックし、[サイトの設定]->[マイク]から、このサイトのマイク利用を許可し、リロードしてください。
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

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
    methods: {
        close () {
            this.$emit('close')
        }
    },
    data () {
      return {
        status: true
      }
    }
}
</script>

<style scoped lang="scss">
</style>