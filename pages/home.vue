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
                  <v-btn color="primary" @click="toRecord">
                    録画開始
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="0" lg="7" xl="7" />
          </v-row>
        </div>
      </v-row>

      <!-- ユーザーのアップロード一覧 -->
      <div style="width: 100%; height: 3vh" />
      <v-row no-gutters>
        <v-col cols="11" lg="4" xl="4">
          <h2 style="margin-left: 4vw">
            あなたのアップロード
          </h2>
        </v-col>
      </v-row>
      <v-layout row justify-center align-center>
        <v-col
          cols="12"
        >
          <v-layout row justify-start align-center>
            <v-col
              v-for="takk in myTakks"
              :key="takk.index"
              cols="12"
              md="4"
              lg="3"
              xl="2"              
            >
              <TalkCard 
                :show-delete-btn="true" 
                :thumbnail="takk.thumbnail" 
                :publish-date="takk.publishDate" 
                :title="takk.title" 
                :handle-name="takk.handleName"
                :deleteMode=true
                @toVideo="toVideo(takk)"
                @tapDelete="deleteVideo(takk)"              
                 />
            </v-col>
          </v-layout>
        </v-col>
      </v-layout>
    </v-layout>

    <!-- 最近のアップロード一覧 -->
    <div style="width: 100%; height: 3vh" />
    <v-row no-gutters>
      <v-col cols="11" lg="4" xl="4">
        <h2 style="margin-left: 4vw">
          最近のアップロード
        </h2>
      </v-col>
    </v-row>
    <v-layout row justify-center align-center>
      <v-col cols="12">
        <v-layout row justify-start align-center>
          <v-col
            v-for="takk in allTakks"
            :key="takk.index"
            cols="12"
            md="4"
            lg="3"
            xl="2"
            @click="toVideo(takk)"
          >
            <TalkCard 
              :thumbnail="takk.thumbnail" 
              :publish-date="takk.publishDate" 
              :title="takk.title" 
              :handle-name="takk.handleName"
              :deleteMode=false
              @toVideo="toVideo(takk.video)"
            />
          </v-col>
        </v-layout>
      </v-col>
    </v-layout>
    <DeleteVideoConfirmModal 
      :id="deleteVideoId"
      :img="deleteVideoThumbnail" 
      :status="showDeleteVideoModal" 
      @ok="doDeleteVideo"
      @ng="showDeleteVideoModal = false"
      />
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TalkCard from '~/components/index/TalkCard.vue'
import DeleteVideoConfirmModal from '~/components/home/DeleteVideoConfirmModal.vue'

export default {
  components: { TalkCard, DeleteVideoConfirmModal },
  async mounted () {
    this.activate()
    try {
      await this.getUserTakk()
      await this.getAllTakk()
      this.deactivate()
    } catch (e) {
      console.error(e)
      this.deactivate()
      this.showError({ message: 'エラーが発生しました。すみませんが、時間をおいて再度実行してください。' })
    }
  },
  computed: {
    ...mapGetters('takk', ['allTakks', 'myTakks'])
  },
  data () {
    return {
      deleteVideoThumbnail: '',
      deleteVideoId: 0,
      showDeleteVideoModal: false,
    }
  },
  methods: {
    ...mapActions('loading', ['activate', 'deactivate']),
    ...mapActions('takk', ['getAllTakk', 'getUserTakk', 'deleteUserTakk']),
    ...mapActions('error', ['showError']),
    ...mapActions('user', ['watch']),
    toRecord () {
      this.$router.push('/record')
    },
    toVideo (takk) {
      this.$router.push(`/watch/${takk.id}`)
    },
    deleteVideo (payload) {
      this.deleteVideoThumbnail = payload.thumbnail
      this.deleteVideoId = payload.id
      this.showDeleteVideoModal = true      
    },
    async doDeleteVideo ({ id }) {
      this.showDeleteVideoModal = false      
      try {
        this.activate()
        await this.deleteUserTakk({ id })
        await this.getUserTakk()
        await this.getAllTakk()
        this.deactivate()
      } catch (e) {
        console.error(e)
        this.deactivate()
      }
    }
  }
}
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
  background-repeat: repeat;
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
