<template>
  <v-card class="mx-auto card" max-width="300">
    <img
      class="white--text"
      :src="thumbnail"
    />
    <v-card-text>
      <span>{{publishDate}}</span>
      <br />
      <span class="text--primary">
        <span>{{title}}</span>
      </span>
      <br />
      <div class="text--primary">
        <span>{{handleName}}</span>
      </div>
    </v-card-text>

  </v-card>
</template>

<script>
export default {
  props: {
    thumbnail: String,
    publishDate: String,
    title: String,
    handleName: String,
    showDeleteBtn: Boolean
  },
  methods: {
    del () {
      this.$emit('del')
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