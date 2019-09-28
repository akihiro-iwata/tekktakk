<template>
  <v-layout justify-center align-center row>
    <v-layout justify-center align-center>
      <!-- ヒロイン -->
      <v-row no-gutters>
        <div class="heroine">
          <v-row no-gutters class="flex">
            <v-col cols="11" lg="4" xl="4">
              <v-card class="card">
                <v-card-title>Share your Knowledge!</v-card-title>
                <v-card-text>TekkTakkはあなたのテックトークを組織内で簡単にシェアするためのサービスです。めんどうな撮影準備と動画アップロードからあなたを解放し、シンプルなソリューションを提供します。</v-card-text>
                <v-card-actions>
                  <v-btn outlined color="primary" @click="toRecord">アップロード</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="0" lg="7" xl="7"></v-col>
          </v-row>
        </div>
      </v-row>

      <!-- 最近のアップロード一覧 -->
      <div style="width: 100%; height: 3vh"></div>
      <v-row no-gutters>
        <v-col cols="1"></v-col>
        <v-col cols="11" lg="4" xl="4">
          <h2>最近のアップロード</h2>
        </v-col>
      </v-row>
      <v-layout row justify-center align-center>
        <v-col 
          cols="12"
          lg="9"
          xl="9">
          <v-layout row justify-start align-center>
            <v-col
              cols="12"
              md="6"
              lg="3"
              xl="3"
              v-for="takk in allTakks"
              :key="takk.index"
              @click="toWatch(takk.video)"
            >
              <TalkCard :thumbnail="takk.thumbnail" :publishDate="takk.publishDate" :title="takk.title" :handleName="takk.handleName"/>
            </v-col>
          </v-layout>
        </v-col>
      </v-layout>
    </v-layout>

  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TalkCard from "~/components/index/TalkCard.vue"

export default {
  components: { TalkCard },
  async mounted () {
    this.activate()
    try {
      await this.getAllTakk()
      console.log('this.allTakks', this.allTakks)
      this.deactivate()
    } catch (e) {
      console.error(e)
      this.deactivate()
      this.showError({ message: 'エラーが発生しました。すみませんが、時間をおいて再度実行してください。' })
    }
  },
  computed: {
    ...mapGetters('takk', ['allTakks']),
  },
  methods: {
    ...mapActions('loading', ['activate', 'deactivate']),
    ...mapActions('takk', ['getAllTakk']),
    ...mapActions('error', ['showError']),
    ...mapActions('user', ['watch']),
    toRecord () {
      this.$router.push('/record')
    },
    toWatch (video) {
      this.watch({ video })
      this.$router.push('/watch')
    }
  }
};
</script>

<style scoped lang="scss">
h2 {
  max-width: 70vw;
}

.layout {
  flex-wrap: wrap;
}

.row {
  width: 100vw;
  margin: 0;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.heroine {
  width: 100%;
  height: 40vh;
  background-image: url("~assets/img/books.jpg");
  display: flex;
  justify-content: center;
  align-items: center;

  .card {
    min-height: 80%;

    .v-card__actions {
      padding-left: 20px;
    }
  }
}

.talk-card-list {
  max-width: 85vw;
  display: flex;
  justify-content: flex-start;
}
</style>
