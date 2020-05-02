<template>
  <v-app>
    <v-navigation-drawer
      v-if="$route.name !== 'index'"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="false"
      app
    >
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="doLogout">
          <v-list-item-action>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="'ログアウト'" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar v-if="$route.name !== 'index'" fixed app>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <div class="flex-grow-1" />
      <div style="height: 100%; width: 2vw" />
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <loading />
    <error />
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import loading from "~/components/loading";
import error from "~/components/error";

export default {
  components: { loading, error },
  computed: {
    ...mapGetters("user", ["name", "photoURL"])
  },
  data() {
    return {
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-home",
          title: "ホーム",
          to: "/home"
        },
        {
          icon: "mdi-movie",
          title: "録画",
          to: "/record"
        },
        {
          icon: "mdi-cloud-upload",
          title: "アップロード",
          to: "/upload"
        },
        {
          icon: "mdi-cloud-upload",
          title: "◯◯動風",
          to: "/niconico"
        }
      ],
      miniVariant: false,
      title: "TekkTakk"
    };
  },
  methods: {
    ...mapActions("user", ["logout"]),
    toHome() {
      this.$router.push("/home");
    },
    doLogout() {
      this.logout();
      window.location.href = "/";
    }
  }
};
</script>

<style scoped lang="scss">
.icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
}
</style>
