<template>
  <v-card class="mx-auto" max-width="400">
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
  }
}
</script>

<style scoped lang="scss">
img {
  width: 100%;
  height: auto;
}
</style>