<template>
  <b-container>
    <div data-sal="fade" data-sal-duration="500" data-sal-delay="100" data-sal-easing="ease-in-out">
      <div class="b-row">
        <hr />
        <div class="d-flex justify-content-start mb-3 align-items-center" @click="moveList">
          <b-icon icon="chevron-left" font-scale="auto"></b-icon> 목록 보기
        </div>

        <div class="m-1 d-flex justify-content-start subject">
          {{ article.subject }}
        </div>

        <!-- 슬롯 header -->
        <slot
          name="header"
          :article="article"
          :moveModifyArticle="moveModifyArticle"
          :deleteArticle="deleteArticle"
        ></slot>
      </div>
      <hr />
      <div class="b-container text-left pt-4 pb-4 pl-2 pr-2" id="article-content">
        <!-- 내용 -->
        <div class="mb-3" v-html="content"></div>
      </div>
      <hr />
      <!-- 슬롯 footer -->
      <slot
        name="footer"
        :article="article"
        :moveModifyArticle="moveModifyArticle"
        :deleteArticle="deleteArticle"
      ></slot>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "ArticleDetail",
  components: {},
  data() {
    return {
      article: {},
    };
  },
  computed: {
    content() {
      if (this.article._content)
        return this.article._content.split("\n").join("<br>").split(" ").join("&nbsp;");
      return "";
    },
  },
  created() {},
  methods: {
    moveModifyArticle() {
      this.$router.push({
        name: "noticemodify",
        params: { noticeid: this.article.articleId },
      });
    },
    deleteArticle() {
      if (confirm("정말로 삭제하시겠습니까?")) {
        this.$router.push({ name: "notices", page: 1 });
      }
    },
    moveList() {},
  },
};
</script>

<style scoped>
.subject {
  font-family: "NanumSquareNeo-ExtraBold";
  font-size: 22pt;
}
</style>
