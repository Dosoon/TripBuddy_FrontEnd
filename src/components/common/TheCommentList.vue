<template>
  <ul class="list-group list-group-flush" id="review-comment-list">
    <li class="list-group-item p-2" v-for="comment in computedComments" :key="comment.commentId">
      <div class="row justify-content-between">
        <div class="col-6" style="display: inline-block; vertical-align: middle">
          <profile-img-with-name :size="'sm'" :userName="comment.userName" />
          <span style="align-items: center" class="c-gray-imp">
            |&nbsp;&nbsp;&nbsp;{{ comment.registerTime }}
          </span>
        </div>

        <b-button
          v-if="userInfo.userId === comment.userId"
          style="font-size: small"
          size="sm"
          variant="outline-danger"
          @click="deleteComment(comment.commentId)"
        >
          <b-icon icon="trash-fill"></b-icon>
        </b-button>
      </div>
      <div class="p-2">{{ comment.content }}</div>
    </li>
  </ul>
</template>

<script>
import ProfileImgWithName from "./ProfileImgWithName.vue";
import { mapGetters } from "vuex";
import { deleteComment } from "@/api/comment";
export default {
  name: "TheCommentList",
  components: { ProfileImgWithName },
  data() {
    return {};
  },
  props: {
    commentsProp: Array,
  },
  created() {},
  methods: {
    deleteComment(commentId) {
      if (confirm("댓글을 삭제하시겠습니까?")) {
        deleteComment(
          commentId,
          () => {
            alert("삭제되었습니다.");
            this.$emit("update-comment-list");
          },
          () => {}
        );
      }
    },
  },
  computed: {
    computedComments() {
      return this.commentsProp;
    },
    ...mapGetters([
      "userInfo", // index js 에 정의된 이름.
    ]),
  },
};
</script>

<style scoped></style>
