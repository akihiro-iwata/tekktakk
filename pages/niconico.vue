<template>
  <div class="index-container">
    <div class="pdf-upload" v-if="!pdfUrl">
      <v-row justify="center">
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <span class="headline">PDFをアップロード</span>
            </v-card-title>
            <v-card-text>スライドとして使用するPDFをアップロードして下さい。</v-card-text>
          </v-card>
          <div style="width: 100%; height: 12px" />
          <v-file-input v-model="pdf" accept=".pdf" label="pdf"></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1">
          <v-btn color="primary" @click="uploadPDF">アップロード</v-btn>
        </v-col>
      </v-row>
    </div>
    <object v-if="pdfUrl" class="pdf-viewer" :data="pdfUrl" type="application/pdf"></object>

    <transition-group v-if="pdfUrl" name="comment-list" tag="p">
      <div class="comment" :class="v.class" v-for="(v, k) in comments" :key="k">{{ v.text }}</div>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { db, storage } from "@/plugins/firebase";

export default {
  data() {
    return {
      pdf: undefined,
      pdfUrl: undefined,
      doc: undefined,
      observer: undefined,
      comments: {}
    };
  },
  async mounted() {
    this.deactivate();
    this.doc = db.collection("comments").doc(process.env.DOCUMENT_ID);
    await this.doc.set({}); // データクリア(ワークアラウンド)

    this.observer = this.doc.onSnapshot(docSnapshot => {
      let data = docSnapshot.data();
      if (!data) return;

      const snapShotKeys = Object.keys(data);
      const displayedCommentKeys = Object.keys(this.comments);

      snapShotKeys.forEach(k => {
        if (!displayedCommentKeys.includes(k)) {
          this.$set(this.comments, k, {
            text: data[k],
            class: this.commentHightClass()
          });
        }
      });
    });
  },
  methods: {
    ...mapActions("loading", ["activate", "deactivate"]),
    commentHightClass() {
      const num = Math.round(Math.random() * 10);
      return `top-${num}`;
    },
    async uploadPDF() {
      try {
        this.activate();
        const ref = `pdf/${Math.random()}.pdf`;
        const uploadTask = await storage.ref(ref).put(this.pdf);
        this.pdfUrl = await uploadTask.ref.getDownloadURL();
        this.deactivate();
      } catch (e) {
        this.deactivate();
        console.error(e);
      }
    }
  }
};
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

  .pdf-upload {
    width: 90vw;
    height: 100vh;
  }

  .pdf-viewer {
    width: 100vw;
    height: 100vh;
    z-index: 1;
  }

  .comment {
    font-size: 48px;
    width: 100vw;
    color: #e74c3c;
    position: absolute;
    top: -50vh;
    display: none;
    z-index: 999;
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

  .comment-list-enter-active,
  .comment-list-leave-activee {
    display: inline !important;
    animation: right-to-left 30s;
  }

  .comment-list-enter,
  .comment-list-leave-to {
    opacity: 1;
    transform: translateX(-100vw);
  }

  @keyframes left-to-right {
    0% {
      position: absolute;
      left: -50vw;
    }

    100% {
      position: absolute;
      left: 200vw;
    }
  }

  @keyframes right-to-left {
    0% {
      position: absolute;
      left: 200vw;
    }

    100% {
      position: absolute;
      left: -200vw;
    }
  }
}
</style>
