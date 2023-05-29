<template>
  <div
    id="recent-review-container"
    class="p-3 mt-5"
    data-sal="flip-down"
    data-sal-duration="400"
    data-sal-delay="100"
    data-sal-easing="ease-in-out"
    v-if="type != 'none'"
  >
    <h5 style="margin-top: -3.75%">
      &nbsp;&nbsp;&nbsp;&nbsp;
      <img
        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Camera%20with%20Flash.png"
        class="mr-2"
        alt="Camera with Flash"
        width="50"
        height="50"
      />Recent Trip Log
    </h5>
    <div class="row p-3 m-1">
      <b-img
        :src="reviewProp.thumbnail"
        style="width: 270px; aspect-ratio: 1"
        class="m-3"
        rounded
      />
      <div class="d-inline-block w-70 text-left">
        <h1 class="m-3 d-inline-block">{{ this.computedReviewProp.subject }}</h1>
        <div style="height: 200px">
          <p
            class="m-3"
            style="
              font-family: 'NanumSquareNeo-Thin';
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: normal;
              display: -webkit-box;
              -webkit-line-clamp: 8;
              -webkit-box-orient: vertical;
            "
            v-html="this.computedReviewProp.content"
          ></p>
        </div>
      </div>
    </div>
  </div>
  <div
    v-else
    id="recent-review-container"
    class="p-3 mt-5"
    data-sal="flip-down"
    data-sal-duration="400"
    data-sal-delay="100"
    data-sal-easing="ease-in-out"
  >
    <h5 style="margin-top: -3.75%">
      &nbsp;&nbsp;&nbsp;&nbsp;
      <img
        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Camera%20with%20Flash.png"
        class="mr-2"
        alt="Camera with Flash"
        width="50"
        height="50"
      />Recent Trip Log
    </h5>
    <div class="row p-3 m-1 align-items-center">
      <div class="d-inline-block w-100 text-left">
        <div class="row align-items-center justify-content-center" style="height: 200px">
          <div
            class="m-3 text-center d-flex item-aligns-cente justify-content-center"
            style="
              font-family: 'NanumSquareNeo-Thin';
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: normal;
              display: -webkit-box;
              -webkit-line-clamp: 8;
              -webkit-box-orient: vertical;
            "
          >
            <div
              class="d-flex align-items-center"
              style="font-family: 'NanumSquareNeo-Thin'; vetical-align: middle"
            >
              등록한 리뷰가 없습니다.<br />
              여행지에 대한 경험을 공유해주세요!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sal from "sal.js";
export default {
  name: "RecentReview",

  props: {
    reviewProp: Object,
    type: String,
  },

  computed: {
    computedReviewProp() {
      return this.reviewProp;
    },
  },

  created() {},
  mounted() {
    sal();
  },
};
</script>

<style scoped>
* {
  font-family: "NanumSquareNeo-ExtraBold";
}

#recent-review-container {
  margin-top: 30px;
  border-radius: 13px;
  border: 1px solid rgba(33, 33, 53, 0.125);
}

h5 {
  letter-spacing: -1px;
  text-align: left;
  background-color: white;
  width: 17ch;
}

.w-70 {
  width: 70%;
}
</style>
