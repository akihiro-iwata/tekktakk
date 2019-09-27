<template>
  <v-layout justify-center align-center row>
    <!-- tabs -->
    <v-layout row justify-center align-center>
      <v-col cols="11">
        <v-tabs :grow="true">
          <v-tab @click="mode = 'recent'">最近のアップロード</v-tab>
          <v-tab @click="mode = 'programming'">プログラミング</v-tab>
          <v-tab>ガジェット</v-tab>
          <v-tab>マネジメント・開発手法</v-tab>
          <v-tab>エモ話</v-tab>
        </v-tabs>
      </v-col>
    </v-layout>

    <!-- 最近のアップロード -->
    <v-layout v-if="isRecentMode" justify-center align-center class="recent">
      <!-- ヒロイン -->
      <v-row no-gutters>
        <div class="heroine">
          <v-row no-gutters class="flex">
            <v-col cols="11" lg="4" xl="4">
              <v-card class="card">
                <v-card-title>Share your TechTalk!</v-card-title>
                <v-card-text>XXはあなたのテックトークを組織内で簡単にシェアするためのサービスです。めんどうな撮影準備と動画アップロードからあなたを解放し、シンプルなソリューションを提供します。</v-card-text>
                <v-card-actions>
                  <v-btn outlined color="primary">アップロード</v-btn>
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
              lg="3"
              xl="3"
            >
              <TalkCard />
            </v-col>
            <v-col 
              cols="12"
              lg="3"
              xl="3"
            >
              <TalkCard />
            </v-col>
            <v-col 
              cols="12"
              lg="3"
              xl="3"
            >
              <TalkCard />
            </v-col>
          </v-layout>
        </v-col>
      </v-layout>
    </v-layout>

    <!-- プログラミング -->
    <v-layout v-if="isProgrammingMode" row justify-center align-center>
      <div>programming</div>
    </v-layout>
  </v-layout>
</template>

<script>
import TalkCard from "~/components/index/TalkCard.vue"

export default {
  components: { TalkCard },
  data() {
    return {
      mode: "recent" ,
      talks: [
        {
          date: '',
          title: '',
          author: '',
          genre: '',
          views: 10,
          like: 5,
          slide: ''
        }
      ]
    };
  },
  computed: {
    isRecentMode() {
      return this.mode === "recent";
    },
    isProgrammingMode() {
      return this.mode === "programming";
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
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.recent {
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
}
</style>
