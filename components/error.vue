<template>
  <v-dialog
    v-model="status"
    max-width="400"
  >
    <v-card>
      <v-card-title class="headline">
        エラーが発生しました
      </v-card-title>

      <v-card-text>
        {{ message }}
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
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('error', ['status', 'message'])
  },
  methods: {
    ...mapActions('error', ['deactivate']),
    close () {
      this.deactivate()
    }
  }
}
</script>

<style scoped lang="scss">
</style>
