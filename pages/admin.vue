<template>
  <div>
    {{ isAdmin }}
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  async mounted () {
    try {
      await this.adminCheck()
      if (!this.isAdmin) {
        // TODO: 権限が足りないモーダル
        window.href.location = '/'
      }
      await this.getAllStaff()
    } catch (e) {
      console.error(e)
    }
  },
  computed: {
    ...mapGetters('user', ['isAdmin'])
  },
  methods: {
    ...mapActions('user', ['adminCheck', 'getAllStaff'])
  }
}
</script>
