<template>
    <v-dialog
      v-model="status"
      max-width="900"
    >
      <v-card>
        <v-card-title class="headline">この画像をサムネイルにしますか？</v-card-title>

        <v-row justify="center">
          <img :src="img">
        </v-row>

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
            キャンセル
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: {
    img: String,
    status: Boolean
  },
  methods: {
      ok () {
          this.$emit('ok')
      },
      ng () {
          this.$emit('ng')
      }
  },
}
</script>

<style scoped lang="scss">
img {
  width: 60vw;
  height: auto;
}
</style>