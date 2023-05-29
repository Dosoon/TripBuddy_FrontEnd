<template>
  <b-container class="bv-example-row mt-3 text-center">
    <left-heading
      class="mb-2"
      :titleProp="'공지사항 등록'"
      :descProp="'공지사항을 작성해주세요 '"
      :emojiProp="'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Pen.png'"
    />
    <notice-input-item type="register" />
  </b-container>
</template>

<script>
import NoticeInputItem from "@/components/notice/NoticeInputItem.vue";
import LeftHeading from "@/components/common/LeftHeading.vue";
import sal from "sal.js";

export default {
  name: "AppNoticeRegister",
  components: { LeftHeading, NoticeInputItem },
  created() {},
  mounted() {
    sal();
  },
};
</script>

<style scoped></style>
