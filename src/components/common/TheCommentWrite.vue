<template>
  <b-row>
    <div class="col-11 mb-2">
      <b-form-textarea
        style="height: 5rem"
        v-model="text"
        id="write-comment-content"
        placeholder="댓글을 입력해주세요."
      ></b-form-textarea>
    </div>
    <div class="col-1">
      <b-button
        variant="outline-primary"
        style="width: 5rem; height: 5rem"
        @click="registComment()"
      >
        등록
      </b-button>
    </div>
  </b-row>
</template>

<script>
import { postComment } from "@/api/comment";
export default {
  name: "TheCommentWrite",
  components: {},
  props: {
    reviewIdProp: Number,
  },
  data() {
    return {
      text: null,
    };
  },
  created() {},
  methods: {
    registComment() {
      if (!this.text) {
        alert("댓글을 입력해주세요.");
        return;
      }
      let params = {
        reviewId: this.$route.params.reviewId,
        content: this.text,
      };
      postComment(
        params,
        () => {
          this.$emit("update-comment-list");
          alert("댓글을 등록했습니다.");
        },
        () => {}
      );
    },
  },
};
</script>

<style scoped></style>
