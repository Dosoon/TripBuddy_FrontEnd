<template>
  <b-container class="bv-example-row mt-3 text-center">
    <left-heading
      class="mb-2"
      :titleProp="'공지사항 수정'"
      :descProp="'공지사항을 수정해주세요 '"
      :emojiProp="'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Pen.png'"
    />
    <notice-input-item type="modify" />
  </b-container>
</template>

<script>
import NoticeInputItem from "@/components/notice/NoticeInputItem.vue";
import LeftHeading from "@/components/common/LeftHeading.vue";
import sal from "sal.js";

export default {
  name: "AppNoticeModify",
  components: { LeftHeading, NoticeInputItem },

  created() {},
  mounted() {
    sal();
  },
};
</script>

<style scoped></style>
