<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="false"
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" @click="toHome" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      app
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <img v-if="photoURL" class="icon" :src="photoURL"/>
      </v-btn>
      <div style="height: 100%; width: 2vw"></div>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; akihiro-iwata@m3</span>
    </v-footer>
    <loading/>
    <error/>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import loading from '~/components/loading'
import error from "~/components/error"

export default {
  components: { loading, error },
  computed: {
    ...mapGetters('user', ['name', 'photoURL'])
  },
  data () {
    return {
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'ホーム',
          to: '/home'
        },
        {
          icon: 'mdi-movie',
          title: '録画',
          to: '/record'
        },
        {
          icon: 'mdi-account-circle',
          title: 'マイページ',
          to: '/home'
        }
      ],
      miniVariant: false,
      title: 'TekkTakk'
    }
  },
  methods: {
    toHome () {
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped lang="scss">
.icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
}
</style>