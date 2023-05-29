<template>
  <div
    v-if="full"
    class="justify-content-center d-flex flex-wrap align-items-center mr-1 mb-2 mt-2"
  >
    <div
      v-if="full"
      class="d-inline-block w-95 item-border"
      style="vertical-align: middle; margin-left: 7px; font-size: 11pt"
    >
      <img
        v-if="notify.type == 'reply'"
        src="https://em-content.zobj.net/thumbs/120/apple/354/speech-balloon_1f4ac.png"
        width="25px"
      />
      <img
        v-else
        src="https://em-content.zobj.net/thumbs/120/apple/354/love-letter_1f48c.png"
        width="25px"
      />
      {{ notify.notifyMsg }}
      <div
        v-if="full && notify.type == 'invite'"
        class="d-inline-block ml-auto float-right text-right"
      >
        <button class="btn btn-outline-primary m-1 small btn-rad" @click="onAcceptInvite">
          수락
        </button>
        <button class="btn btn-outline-danger m-1 small btn-rad" @click="onRejectInvite">
          거절
        </button>
      </div>
      <div
        v-else-if="full && notify.type == 'disabled'"
        class="d-inline-block ml-auto float-right text-right"
      >
        <button class="btn btn-outline-secondary m-1 small btn-rad" disabled>
          이미 거절한 초대
        </button>
      </div>
      <div
        v-else-if="full && notify.type == 'accepted'"
        class="d-inline-block ml-auto float-right text-right"
      >
        <button class="btn btn-outline-secondary m-1 small btn-rad" disabled>
          이미 수락한 초대
        </button>
      </div>
    </div>
  </div>
  <div v-else class="w-100">
    <div
      v-if="!full"
      class="d-inline-block w-100"
      style="
        word-break: keep-all;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        vertical-align: middle;
        margin-left: 7px;
        font-size: 11pt;
      "
    >
      <img
        v-if="notify.type == 'reply'"
        src="https://em-content.zobj.net/thumbs/120/apple/354/speech-balloon_1f4ac.png"
        width="25px"
      />
      <img
        v-else
        src="https://em-content.zobj.net/thumbs/120/apple/354/love-letter_1f48c.png"
        width="25px"
      />
      {{ notify.notifyMsg }}
    </div>
  </div>
</template>

<script>
import { postPlanMember } from "@/api/plan";
import { disableNotify, acceptNotify } from "@/api/notify";

export default {
  name: "RecentNotifyItem",
  props: ["full", "notify"],
  methods: {
    onAcceptInvite() {
      let planId = this.notify.targetId;
      postPlanMember(
        planId,
        () => {
          this.$router.push("/myplan");
          document.querySelector("#notifyModalBtn").click();
          let params = {
            targetId: this.notify.targetId,
          };
          acceptNotify(
            params,
            () => {},
            () => {}
          );
        },
        () => {}
      );
    },
    onRejectInvite() {
      let params = {
        notifyId: this.notify.notifyId,
      };
      disableNotify(
        params,
        () => {
          this.$emit("reset-list");
        },
        () => {}
      );
    },
  },
};
</script>

<style scoped>
.item-border {
  border-radius: 10px;
  border: rgba(0, 0, 0, 0.13) 1px solid !important;
  padding: 10px;
}

.w-60 {
  max-width: 60%;
}
.w-85 {
  max-width: 85%;
}

.w-95 {
  max-width: 95%;
}

.small {
  font-size: small;
}

.btn-rad {
  border-radius: 15px;
}

* {
  font-family: "NanumSquareNeo-Thin";
}
</style>
