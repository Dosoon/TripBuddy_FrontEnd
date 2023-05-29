<template>
  <b-container class="text-muted text-left">
    <div class="h5">댓글 ({{ computedComments.length }})</div>
    <the-comment-write @update-comment-list="updateCommentList"></the-comment-write>
    <hr class="mt-2 mb-1" />

    <the-comment-list
      :commentsProp="this.computedComments"
      @update-comment-list="updateCommentList"
    >
    </the-comment-list>
  </b-container>
</template>

<script>
import TheCommentList from "./TheCommentList.vue";
import TheCommentWrite from "./TheCommentWrite.vue";
export default {
  name: "TheCommentVue",
  components: {
    TheCommentList,
    TheCommentWrite,
  },
  data() {
    return {};
  },
  props: {
    commentsProp: Array,
  },
  created() {},
  methods: {
    updateCommentList() {
      this.$emit("update-comment-list");
    },
  },
  computed: {
    computedComments() {
      return this.commentsProp;
    },
  },
};
</script>

<style scoped></style>
