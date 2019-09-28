<template>
  <video controls :src="watchVideo" />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('user', ['watchVideo'])
  }
}

</script>

<style scoped lang="scss">
video {
  width: 100vw;
  height: 90vh;
}
</style>
