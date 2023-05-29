<template>
  <b-container style="margin-top: 50px">
    <div class="b-row mb-5" id="logo">
      <b-icon icon="pencil-square" font-scale="auto"></b-icon> 후기 등록
    </div>

    <article-input-item type="register" />
  </b-container>
</template>

<script>
import ArticleInputItem from "@/components/common/ArticleInputItem.vue";
export default {
  name: "NoticeRegister",
  components: { ArticleInputItem },
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
