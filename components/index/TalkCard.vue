<template>
  <v-card class="mx-auto card" max-width="300">
    <img
      @click="toVideo"
      class="white--text"
      :src="thumbnail"
    >
    <v-card-text @click="toVideo">
      <span>{{ publishDate }}</span>
      <br>
      <span class="text--primary">
        <span>{{ title }}</span>
      </span>
      <br>
      <div class="text--primary">
        <span>{{ handleName }}</span>
      </div>
    </v-card-text>
     <v-card-actions v-if="deleteMode">
        <v-btn icon @click="tapDelete">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    thumbnail: String,
    publishDate: String,
    title: String,
    handleName: String,
    showDeleteBtn: Boolean,
    deleteMode: Boolean
  },
  methods: {
    del () {
      this.$emit('del')
    },
    toVideo () {
      this.$emit('toVideo')
    },
    tapDelete () {
      this.$emit('tapDelete')
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  padding-top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  cursor: pointer;
}

img {
  width: auto;
  height: 15vh;
}
</style>
