<template>
  <div class="index-container">
    <div class="copy">
      <div class="wo">あなたの発信を拡張する</div>
      <div class="describe">TekkTakkはあなたの登壇スピーチとスライドを組織内へセキュアかつ簡単に共有するためのサービスです。</div>
    </div>
    <div class="login">
      <v-btn rounded color="primary button" @click="googleLogin">Googleでログイン</v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { auth, authProvider } from '@/plugins/firebase'

export default {
  async mounted () {
    try {
      this.activate()
      const authState = await auth.getRedirectResult()
      if (authState.user) {
        await this.login(authState)
        this.$router.push('/home')
      }
      this.deactivate()
    } catch (e) {
      this.deactivate()
      if (e.message === 'Request failed with status code 404') {
        this.showError({ message: 'このユーザーはまだ登録されていません。自社の管理者に連絡してください。' })
      } else {
        this.showError({ message: 'すみませんが、時間をおいて再度実行してください。' })
      }
    }
  },
  methods: {
    ...mapActions('loading', ['activate', 'deactivate']),
    ...mapActions('error', ['showError',]),
    ...mapActions('user', ['login']),
    async googleLogin () {
      try {
        this.activate()
        await auth.signInWithRedirect(authProvider)
      } catch (e) {
        console.error(e)
      }
    }
  }
};
</script>

<style scoped lang="scss">
.index-container {
  width: 100vw;
  height: 85vh;
  margin: 0;
  padding: 0;
  background-image: url("~assets/img/top.jpg");
  background-repeat: repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  .copy {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    max-height: 20vh;
    width: 100%;

    .wo {
      width: 100%;
      color: white;
      font-size: 52px;
      text-align: center;
    }

    .describe {
      width: 100%;
      padding: 0 24px 0 24px;
      color: white;
      font-size: 24px;
      text-align: center;
    }
  }

  .login {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    max-height: 20vh;
    width: 100%;

    .button {
      font-size: 1vw;
    }
  }
}
</style>
