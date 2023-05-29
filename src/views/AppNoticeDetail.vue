<template>
  <div class="container">
    <left-heading
      class="mb-2"
      :titleProp="'공지사항'"
      :descProp="'원활한 사이트 이용을 위해 규칙을 확인해주세요.'"
      :emojiProp="'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Triangular%20Flag.png'"
    />
    <b-container>
      <div
        data-sal="fade"
        data-sal-duration="500"
        data-sal-delay="100"
        data-sal-easing="ease-in-out"
      >
        <div class="b-row">
          <hr />
          <div
            class="d-flex justify-content-start mb-3 align-items-center"
            @click="moveList"
            style="cursor: pointer"
          >
            <b-icon icon="chevron-left" font-scale="auto"></b-icon>
            목록 보기
          </div>

          <div class="m-1 d-flex justify-content-start subject">
            {{ notice.subject }}
          </div>

          <div class="text-muted m-1 d-flex justify-content-start" style="font-size: medium">
            관리자 | {{ notice.registerTime }}
          </div>
        </div>
        <hr />
        <div class="b-container text-left pt-4 pb-4 pl-2 pr-2" id="article-content">
          <!-- 내용 -->
          <div class="mb-3" v-html="htmlcontent"></div>
        </div>
        <hr />
        <div v-if="userInfo.admin === true">
          <b-row class="mb-1">
            <b-col class="text-right">
              <b-button
                class="m-1"
                style="font-size: small"
                size="sm"
                variant="outline-primary"
                @click="moveModifyArticle()"
              >
                <b-icon icon="pencil-fill"></b-icon>
              </b-button>
              <b-button
                style="font-size: small"
                size="sm"
                variant="outline-danger"
                @click="deleteArticle()"
              >
                <b-icon icon="trash-fill"></b-icon>
              </b-button>
            </b-col>
          </b-row>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import LeftHeading from "@/components/common/LeftHeading.vue";
import { viewNotice, deleteNotice } from "@/api/notice";
import sal from "sal.js";
import { mapGetters } from "vuex";

export default {
  name: "AppNoticeDetail",
  components: { LeftHeading },

  data() {
    return {
      page: -1,
      notice: {
        noticeId: -1,
        userId: 25,
        userName: "",
        subject: "",
        content: "",
        registerTime: "",
      },
    };
  },
  computed: {
    htmlcontent() {
      if (this.notice.content)
        return this.notice.content.split("\n").join("<br>").split(" ").join("&nbsp;");
      return "";
    },
    ...mapGetters([
      "userInfo", // index js 에 정의된 이름.
    ]),
  },
  created() {
    this.page = this.$route.params.page;

    let param = this.$route.params.noticeId;
    viewNotice(
      param,
      ({ data }) => {
        this.notice = data;
      },
      () => {}
    );
  },
  methods: {
    moveModifyArticle() {
      this.$router.replace({
        name: "appnoticemodify",
        params: { noticeId: this.notice.noticeId, page: this.$route.params.page },
      });
    },
    deleteArticle() {
      if (confirm("정말로 삭제하겠습니까?")) {
        deleteNotice(
          this.notice.noticeId,
          () => {
            alert("삭제가 완료되었습니다.");
          },
          () => {}
        );
        this.$router.replace({
          name: "notices",
          params: { page: this.$route.params.page },
        });
      }
    },
    moveList() {
      this.$router.push({
        name: "notices",
        query: {
          page: this.$route.query.page,
          keyword: this.$route.query.keyword,
          sort: this.$route.query.sort,
        },
      });
    },
  },
  mounted() {
    sal();
  },
};
</script>

<style scoped>
.subject {
  font-family: "NanumSquareNeo-ExtraBold";
  font-size: 22pt;
}
</style>
