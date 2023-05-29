<template>
  <div id="memo-container">
    <attr-memo-form class="mt-2 mb-2" @on-save-memo="saveMemo" ref="memoForm" />
    <attr-memo-item
      v-for="memo in memolist"
      :key="memo.memoId"
      :memo="memo"
      @update-memo-list="getMemolist"
    />
  </div>
</template>

<script>
import AttrMemoForm from "./AttrMemoForm.vue";
import AttrMemoItem from "./AttrMemoItem.vue";
import { getMemos, postMemo } from "@/api/memo";
export default {
  props: ["course"],
  components: { AttrMemoItem, AttrMemoForm },
  data() {
    return {
      memolist: [],
    };
  },
  created() {
    this.getMemolist();
  },
  methods: {
    getMemolist() {
      getMemos(
        this.course.planId,
        this.course.contentId,
        (res) => {
          this.memolist = res.data;
        },
        () => {}
      );
    },
    saveMemo(memo) {
      let params = {
        planId: Number(this.course.planId),
        contentId: this.course.contentId,
        content: memo,
      };
      postMemo(
        params,
        () => {
          alert("등록되었습니다.");
          this.getMemolist();
          this.$refs.memoForm.resetMemo();
        },
        () => {}
      );
    },
  },
};
</script>

<style>
#memo-container {
  /* border: 1px rgba(0, 0, 0, 0.2039215686) solid; */
}
</style>
