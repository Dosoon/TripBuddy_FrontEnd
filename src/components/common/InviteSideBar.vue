<template>
  <b-sidebar
    id="sidebar-invite"
    width="25%"
    backdrop
    no-header
    right
    shadow
    @on-invite-click="onInviteClick"
  >
    <div class="px-3 py-3 h-100">
      <h2 class="side-header">
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Love%20Letter.png"
          alt="Love Letter"
          width="50"
          height="50"
        />
        친구 초대
      </h2>
      <hr style="margin-bottom: 0" />
      <div
        v-if="friendsList.length == 0"
        class="d-flex w-100 h-100 justify-content-center align-items-center"
      >
        <span class="">초대할 수 있는 친구가 없어요.</span>
      </div>
      <freinds-list v-else :friends-list="friendsList" />
    </div>
    <template #footer="{ hide }">
      <hr class="m-0" />
      <div class="d-flex bg-light text-light align-items-center px-4 py-3 mb-2">
        <div class="d-flex w-100 justify-content-between">
          <b-button size="md" @click="hide" id="inviteCloseBtn">닫기</b-button>
          <b-button size="md" id="btn-invite" class="btn btn-outline-primary bg-light">
            초대
          </b-button>
        </div>
      </div>
    </template>
  </b-sidebar>
</template>

<script>
import FreindsList from "./FreindsList.vue";

export default {
  props: {
    friendsList: {
      type: Array,
    },
  },
  components: {
    FreindsList,
  },
  mounted() {
    document.querySelector("#btn-invite").addEventListener("click", this.onInviteClick);
  },
  methods: {
    onInviteClick() {
      this.$emit("on-invite-click");
    },
  },
};
</script>

<style scoped lang="scss">
.side-header {
  font-family: "NanumSquareNeo-ExtraBold";
  letter-spacing: -2.5px;
  text-align: left;
}

::v-deep {
  .b-sidebar-body {
    overflow-y: hidden !important;
    overflow-x: hidden;
  }
}
</style>
