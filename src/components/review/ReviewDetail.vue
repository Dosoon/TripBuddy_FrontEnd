<template>
  <div>
    <article-detail>
      <span slot="header" slot-scope="slotProps">
        <span
          style="display: flex; align-items: center; margin-left: auto"
          class="h5 mt-3 text-muted"
        >
          <profile-img-with-name :size="'md'" />

          <span v-if="true">
            <b-button
              v-if="true"
              variant="outline-primary"
              class="p-1 b-rad"
              style="font-size: small"
              @click="toggleFollowUser()"
              id="review-btn-follow"
              value="false"
              >팔로우 <b-icon icon="person-plus-fill"></b-icon
            ></b-button>

            <b-button
              v-if="false"
              variant="outline-danger"
              class="p-1 b-rad"
              style="font-size: small"
              @click="toggleFollowUser()"
              id="review-btn-follow"
              value="true"
              >언팔로우 <b-icon icon="person-dash-fill"></b-icon
            ></b-button>
          </span>
        </span>

        <div class="text-muted m-1 d-flex justify-content-start" style="font-size: medium">
          <span class="mr-2">{{ slotProps.article.registerTime }} </span>
          <span class="mr-2">|</span>
          <span class="mr-2">별점</span>
          <span class="mr-2">{{ slotProps.article.rating }}</span>
          <app-rating></app-rating>
          <div class="float-end" style="display: inline-block; margin-left: auto">
            <div v-if="true">
              <b-row class="mb-1">
                <b-col class="text-right">
                  <b-button
                    class="m-1"
                    style="font-size: small"
                    size="sm"
                    variant="outline-primary"
                    @click="slotProps.moveModifyArticle()"
                  >
                    <b-icon icon="pencil-fill"></b-icon>
                  </b-button>
                  <b-button
                    style="font-size: small"
                    size="sm"
                    variant="outline-danger"
                    @click="slotProps.deleteArticle()"
                  >
                    <b-icon icon="trash-fill"></b-icon>
                  </b-button>
                </b-col>
              </b-row>
            </div>
          </div>
        </div>
      </span>

      <span class="float-end" style="display: inline-block; margin-left: auto">
        <button class="btn btn-outline-primary b-rad-sm" style="margin-top: -8px">
          플랜 스크랩
        </button>
      </span>

      <span slot="footer">
        <div class="container text-muted" id="review-star" style="margin-bottom: -8px">
          <span style="display: flex; align-items: center">
            <span v-if="false" style="display: flex; align-items: center">
              <span class="h5 mr-3">리뷰 평가</span>
              <b-form-rating
                inline
                v-model="value"
                no-border
                size="sm"
                variant="warning"
                class="mb-2"
              ></b-form-rating>
            </span>
            <span v-if="true" style="display: flex; align-items: center">
              <span class="h5 mr-3">리뷰 평가 완료</span>
              <b-form-rating
                inline
                v-model="value"
                no-border
                size="sm"
                variant="warning"
                class="mb-2"
                readonly
              ></b-form-rating>
            </span>

            <span v-if="true" class="float-end" style="display: inline-block; margin-left: auto">
              <b-button variant="outline-primary" class="b-rad-sm" style="margin-top: -8px">
                플랜 스크랩
              </b-button>
            </span>
          </span>
        </div>
        <hr />

        <the-comment-vue></the-comment-vue>
      </span>
    </article-detail>
  </div>
</template>

<script>
import ArticleDetail from "@/components/common/ArticleDetail.vue";
import AppRating from "@/components/common/AppRating.vue";
import TheCommentVue from "@/components/common/TheCommentVue.vue";
import ProfileImgWithName from "@/components/common/ProfileImgWithName.vue";

export default {
  name: "TheReview",
  components: { ArticleDetail, AppRating, TheCommentVue, ProfileImgWithName },
  data() {
    return {
      value: 3,
    };
  },
  created() {},
  methods: {
    toggleFollowUser() {},
  },
};
</script>

<style scoped>
.b-rad {
  border-radius: 20px;
}
</style>
