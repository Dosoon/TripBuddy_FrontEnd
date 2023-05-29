<template>
  <b-container class="bv-example-row mt-3 text-center">
    <left-heading
      class="mb-2"
      :titleProp="'여행 후기 수정'"
      :descProp="'여행 후기를 수정해주세요 '"
      :emojiProp="'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Pen.png'"
    />
    <review-input-item type="modify" />
  </b-container>
</template>

<script>
import ReviewInputItem from "@/components/review/ReviewInputItem.vue";
import LeftHeading from "@/components/common/LeftHeading.vue";
import sal from "sal.js";

export default {
  name: "AppReviewModify",
  components: { LeftHeading, ReviewInputItem },

  created() {},
  mounted() {
    sal();
  },
};
</script>

<style scoped></style>
