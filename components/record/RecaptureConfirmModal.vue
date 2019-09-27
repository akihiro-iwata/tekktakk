<template>
    <v-dialog
      v-model="status"
      max-width="400"
    >
      <v-card>
        <v-card-title class="headline">再録画を開始しますか？</v-card-title>

        <v-card-text>
          再録画を開始すると今の動画データが消失します。
          消失を避ける場合は、先にアップロードを完了させてから再録画を開始してください。
          再録画を開始しますか？
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn
            color="green darken-1"
            text
            @click="ok"
          >
            OK
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="ng"
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
        ok () {
            this.$emit('ok')
        },
        ng () {
            this.$emit('ng')
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