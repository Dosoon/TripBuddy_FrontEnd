<template>
  <div class="container">
    <left-heading
      class="mb-2"
      :titleProp="'여행 후기'"
      :descProp="'여행지에 대한 이야기를 들려주세요!'"
      :emojiProp="'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Camera%20with%20Flash.png'"
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
            <b-icon icon="chevron-left" font-scale="auto"></b-icon> 목록 보기
          </div>

          <div class="m-1 d-flex justify-content-start subject">
            {{ this.reviewdata.review.subject }}
          </div>

          <span
            style="display: flex; align-items: center; margin-left: auto"
            class="h5 mt-3 text-muted"
          >
            <profile-img-with-name :size="'md'" :userName="this.reviewdata.review.userName" />
            <review-follow-toggle
              :followeeNameProp="this.reviewdata.review.userName"
              :followeeIdProp="this.reviewdata.review.userId"
            ></review-follow-toggle>
          </span>

          <div class="text-muted m-1 d-flex justify-content-start" style="font-size: medium">
            <span class="mr-2">{{ this.reviewdata.review.registTime }} </span>
            <span class="mr-2">|</span>
            <span class="mr-2">별점</span>
            <span class="mr-2">{{ this.reviewdata.review.rating }}</span>
            <app-rating :rating="this.reviewdata.review.rating"></app-rating>
            <div class="float-end" style="display: inline-block; margin-left: auto">
              <div v-if="userInfo.userId === this.reviewdata.review.userId">
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
          </div>
        </div>
        <hr />
        <div class="b-container text-left pt-4 pb-4 pl-2 pr-2" id="article-content">
          <!-- 내용 -->
          <div class="mb-3" v-html="htmlcontent"></div>
        </div>
        <hr />
        <div class="container text-muted" id="review-star" style="margin-bottom: -8px">
          <span
            style="display: flex; align-items: center"
            v-if="reviewdata.review.userId != $store.getters['userId']"
          >
            <span v-if="this.reviewdata.myRate === 0" style="display: flex; align-items: center">
              <span class="h5 mr-3">리뷰 평가</span>
              <div @click="rateReviewImpl()">
                <b-form-rating
                  inline
                  v-model="reviewRating"
                  no-border
                  size="sm"
                  variant="warning"
                  class="mb-2"
                ></b-form-rating>
              </div>
            </span>
            <span v-else style="display: flex; align-items: center">
              <span class="h5 mr-3">리뷰 평가 완료</span>
              <b-form-rating
                inline
                v-model="this.reviewdata.myRate"
                no-border
                size="sm"
                variant="warning"
                class="mb-2"
                readonly
              ></b-form-rating>
            </span>

            <span class="float-end" style="display: inline-block; margin-left: auto">
              <b-button
                variant="outline-primary"
                class="b-rad-sm"
                style="margin-top: -8px"
                @click="scrapPlanImpl()"
              >
                플랜 스크랩
              </b-button>
            </span>
          </span>
          <span style="display: flex; align-items: center" class="mb-4" v-else>
            내가 쓴 글에는 리뷰 평가를 할 수 없습니다.
          </span>
        </div>
        <hr />

        <the-comment-vue
          :commentsProp="this.computedComments"
          @update-comment-list="updateCommentList"
        ></the-comment-vue>
      </div>
    </b-container>
  </div>
</template>

<script>
import LeftHeading from "@/components/common/LeftHeading.vue";
import AppRating from "@/components/common/AppRating.vue";
import TheCommentVue from "@/components/common/TheCommentVue.vue";
import ProfileImgWithName from "@/components/common/ProfileImgWithName.vue";
import ReviewFollowToggle from "@/components/review/ReviewFollowToggle.vue";
import sal from "sal.js";
import { mapGetters } from "vuex";
import { getReview, deleteReview, rateReview, listComment } from "@/api/reviews";
import { scrapPlan } from "@/api/plan";

export default {
  components: {
    ReviewFollowToggle,
    ProfileImgWithName,
    TheCommentVue,
    AppRating,
    LeftHeading,
  },
  mounted() {
    sal();
  },
  data() {
    return {
      reviewRating: 0,
      reviewdata: {
        comments: [],
        review: {},
        myRate: 0,
      },
    };
  },

  created() {
    let param = this.$route.params.reviewId;

    getReview(
      param,
      ({ data }) => {
        this.reviewdata = data;
      },
      () => {}
    );
  },

  computed: {
    htmlcontent() {
      if (this.reviewdata.review.content)
        return this.reviewdata.review.content.split("\n").join("<br>").split(" ").join("&nbsp;");
      return "";
    },
    ...mapGetters([
      "userInfo", // index js 에 정의된 이름.
    ]),
    computedComments() {
      return this.reviewdata.comments;
    },

    computedReviewdata() {
      return this.reviewdata;
    },
  },
  methods: {
    scrapPlanImpl() {
      if (confirm("정말로 스크랩하겠습니까?")) {
        scrapPlan(
          this.reviewdata.review.planId,
          () => {
            alert("스크랩에 성공했습니다!");
            this.$router.push({
              path: "/myplan",
            });
          },
          () => {}
        );
      }
    },
    updateCommentList() {
      listComment(
        this.$route.params.reviewId,
        (res) => {
          this.reviewdata.comments = res.data;
        },
        () => {}
      );
    },

    rateReviewImpl() {
      if (this.reviewRating == 0) return;
      let params = {
        reviewId: this.reviewdata.review.reviewId,
        rating: this.reviewRating,
      };
      rateReview(
        params,
        (res) => {
          alert("평가 완료!");
          this.reviewdata.myRate = this.reviewRating;
          this.reviewdata.review.rating = res.data;
        },
        () => {}
      );
    },

    moveModifyArticle() {
      this.$router.push({
        name: "appreviewmodify",
        query: { reviewId: this.reviewdata.review.reviewId },
      });
    },
    deleteArticle() {
      if (confirm("정말로 삭제하겠습니까?")) {
        deleteReview(
          this.reviewdata.review.reviewId,
          () => {
            alert("삭제가 완료되었습니다.");
          },
          () => {}
        );
        this.$router.push({
          name: "review",
        });
      }
    },
    moveList() {
      if (this.$route.params.fromApp === "hotplace") {
        this.$router.push({
          name: "hotplace",
        });
      } else {
        this.$router.push({
          name: "review",
          query: this.$route.query,
        });
      }
    },
  },
};
</script>

<style scoped>
.subject {
  font-family: "NanumSquareNeo-ExtraBold";
  font-size: 22pt;
}
</style>
