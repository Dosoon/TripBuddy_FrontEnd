<template>
  <div>
    <b-container>
      <div class="d-flex" style="max-height: 296px !important; min-height: 296px">
        <user-profile
          data-sal="slide-left"
          data-sal-duration="600"
          data-sal-delay="50"
          data-sal-easing="ease-in-out"
          class="d-inline-block m-auto"
        />
        <main-recent-plan-list
          data-sal="slide-right"
          data-sal-duration="600"
          data-sal-delay="100"
          data-sal-easing="ease-in-out"
          class="d-none d-lg-inline-block m-auto"
        />
      </div>
      <section-title
        :titleProp="'Event'"
        class="mt-5"
        data-sal="flip-down"
        data-sal-duration="600"
        data-sal-delay="300"
        data-sal-easing="ease-in-out"
      />
      <main-carousel
        class="mt-5 mb-5"
        data-sal="slide-up"
        data-sal-duration="300"
        data-sal-delay="300"
        data-sal-easing="ease-in-out"
      />
      <hr />
      <left-heading
        :emojiProp="'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Airplane.png'"
        :titleProp="'실시간 인기 여행지'"
        :descProp="'현재 가장 인기있는 여행지로 떠나볼까요?'"
      />
      <hr />
    </b-container>
    <main-slide></main-slide>
  </div>
</template>

<script>
import SectionTitle from "@/components/common/SectionTitle.vue";
import LeftHeading from "@/components/common/LeftHeading.vue";
import MainCarousel from "@/components/main/MainCarousel.vue";
import MainSlide from "@/components/main/MainSlide.vue";
import UserProfile from "@/components/common/UserProfile.vue";
import MainRecentPlanList from "@/components/main/MainRecentPlanList.vue";
import sal from "sal.js";

export default {
  name: "AppMain",
  components: {
    LeftHeading,
    MainCarousel,
    MainSlide,
    SectionTitle,
    UserProfile,
    MainRecentPlanList,
  },
  mounted() {
    sal({
      threshold: 0.0,
    });
  },
  created() {},
};
</script>

<style scoped>
.h-25 {
  max-height: 25% !important;
}
</style>
