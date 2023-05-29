<template>
  <div class="container">
    <hot-place-carousel></hot-place-carousel>
    <left-heading
      class="mt-4 mb-4"
      :descProp="'현재 가장 인기가 많은 리뷰 TOP 6 입니다.'"
      :emojiProp="'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Camera%20with%20Flash.png'"
      :titleProp="'인기 리뷰'"
    />
    <hr />
    <div
      class="container d-flex flex-row flex-wrap justify-content-around mt-4"
      data-sal="slide-up"
      data-sal-duration="500"
      data-sal-delay="100"
      data-sal-easing="ease-in-out"
      id="card-list"
    >
      <app-card
        v-for="review in reviews"
        :key="review.reviewId"
        v-bind="review"
        fromApp="hotplace"
      ></app-card>
    </div>
  </div>
</template>

<script>
import HotPlaceCarousel from "@/components/hotplace/item/HotPlaceCarousel.vue";
import AppCard from "@/components/common/AppCard.vue";
import LeftHeading from "@/components/common/LeftHeading.vue";
import { listHotReview } from "@/api/reviews";
import sal from "sal.js";

export default {
  name: "AppHotPlace",
  components: { HotPlaceCarousel, AppCard, LeftHeading },
  data() {
    return {
      reviews: [],
    };
  },
  created() {
    listHotReview(
      ({ data }) => {
        this.reviews = data;
      },
      () => {}
    );
  },
  methods: {},
  mounted() {
    sal({
      threshold: 0.2,
    });
  },
};
</script>

<style scoped></style>
