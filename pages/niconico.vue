<template>
  <div class="index-container">
    <transition-group name="comment-list" tag="p">
      <div class="comment" :class="v.class" v-for="(v, k) in comments" :key="k">
        {{ v.text }}
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { auth, authProvider, db } from '@/plugins/firebase'

export default {
  data () {
    return {
      doc: undefined,
      observer: undefined,
      comments: {}
    }
  },
  async mounted () {
    this.doc = db.collection('comments').doc('StPlSU6wmUMOIt4aBMoM')
    await this.doc.set({}) // データクリア(ワークアラウンド)

    this.observer = this.doc.onSnapshot(docSnapshot => {
      let data = docSnapshot.data()
      if (!data || !data[0]) return
      data = data[0]
      
      const snapShotKeys = Object.keys(data)
      const displayedCommentKeys = Object.keys(this.comments)
      
      // 差分あれば流す
      snapShotKeys.forEach(k => {
        if (!displayedCommentKeys.includes(k)) {
          this.$set(this.comments, k, {
            text: data[k],
            class: this.commentHightClass()
          })
        }
      })
    })
    const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
    for (let i = 0; i < 10; i++) {
      // set firebase 
      const key = Math.random()
      const data = {}
      data[key] = Math.random()
      this.doc.update(data)
      await _sleep(1000)
    }
  },
  methods: {
    commentHightClass() {
      const num = Math.round(Math.random() * 10)
      return `top-${num}`
    }
  }
}
</script>

<style scoped lang="scss">
.index-container {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  .comment {
    font-size: 32px;
    width: 100vw;
    color: red;
    position: absolute;
    top: -50vh;
    display: none;
  }

  .top-1 {
    top: 5vh;
  }
 
  .top-2 {
    top: 10vh;
  }
 
  .top-3 {
    top: 20vh;
  }
 
  .top-4 {
    top: 30vh;
  }
 
  .top-5 {
    top: 40vh;
  }
 
  .top-6 {
    top: 50vh;
  }
 
  .top-7 {
    top: 60vh;
  }
 
  .top-8 {
    top: 70vh;
  }
 
  .top-9 {
    top: 80vh;
  }
 
  .top-10 {
    top: 85vh;
  } 
 
  .comment-list-enter-active, .comment-list-leave-activee {
    display: inline !important;
    animation: left-to-right 30s;
  }

  .comment-list-enter, .comment-list-leave-to {
    opacity: 1;
    transform: translateX(-100vw);
  }

  @keyframes left-to-right {
    0% {
      position: absolute;
      left: -100vw;
    }

    100% {
      position: absolute;
      left: 200vw;
    }
  }
}
</style>
