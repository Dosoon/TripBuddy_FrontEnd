<template>
  <div>
    <b-container>
      <!-- <left-heading
        :title-prop="'TripLog'"
        :desc-prop="'나의 여행 기록을 세계와 공유하다'"
        :emoji-prop="'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Camera%20with%20Flash.png'"
      /> -->
      <div style="height: 1px"></div>
      <user-profile
        :type="'min'"
        data-sal="slide-up"
        data-sal-duration="400"
        data-sal-delay="100"
        data-sal-easing="ease-in-out"
      />
      <recent-review :reviewProp="this.reviews[0]" class="mt-3" v-if="this.reviews.length" />
      <recent-review :reviewProp="this.reviews[0]" class="mt-3" v-else :type="'none'" />

      <section-title
        :title-prop="'Trip Log'"
        style="margin-top: 2%; margin-bottom: 2%"
      ></section-title>
      <div
        data-sal="slide-up"
        data-sal-duration="300"
        data-sal-delay="100"
        data-sal-easing="ease-in-out"
      >
        <main-review
          v-for="r in reviews"
          :key="r.reviewId"
          :size="'lg'"
          :title-prop="r.subject"
          :desc-prop="r.content"
          :img-src-prop="r.thumbnail"
          :review-id="r.reviewId"
        />
      </div>
    </b-container>
  </div>
</template>

<script>
import UserProfile from "@/components/common/UserProfile.vue";
import MainReview from "@/components/main/MainReview.vue";
import SectionTitle from "@/components/common/SectionTitle.vue";
import RecentReview from "@/components/triplog/RecentReview.vue";
import sal from "sal.js";
import { getReviewsById } from "@/api/reviews";

export default {
  components: { UserProfile, MainReview, SectionTitle, RecentReview },
  name: "AppTripLog",
  data() {
    return {
      reviews: [],
      id: "",
    };
  },
  created() {
    this.id = this.$route.params.id;
    getReviewsById(
      this.id,
      ({ data }) => {
        this.reviews = data;
      },
      () => {}
    );
  },
  mounted() {
    sal();
  },
};
</script>

<style></style>
