<template>
  <div id="attr-memo-item-container" class="d-flex flex-row flex-wrap mb-2">
    <div class="row w-100 justify-content-between align-items-center p-0 m-0 mb-1">
      <profile-img-with-name
        :user-name="memo.userName"
        :img-src="memo.userProfileImg"
        :size="'2rem'"
      >
      </profile-img-with-name>
      <span class="pr-1" style="font-size: 10pt; color: rgba(0, 0, 0, 0.45)"
        ><b-icon-x-lg v-if="memo.mine" @click="onDelete"
      /></span>
    </div>
    <div id="content-container" class="w-100 text-left p-2" v-text="memo.content"></div>
  </div>
</template>

<script>
import ProfileImgWithName from "@/components/common/ProfileImgWithName.vue";
import { deleteMemo } from "@/api/memo";
export default {
  props: ["memo"],
  components: { ProfileImgWithName },
  methods: {
    onDelete() {
      deleteMemo(
        this.memo.memoId,
        () => {
          alert("삭제되었습니다.");
          this.$emit("update-memo-list");
        },
        () => {}
      );
    },
  },
};
</script>

<style>
#content-container {
  border: 1px solid rgba(33, 33, 53, 0.05);
}
</style>
