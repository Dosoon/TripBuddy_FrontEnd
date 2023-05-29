<template>
  <div class="container" id="myplan-content">
    <left-heading
      :title-prop="'마이 플랜'"
      :desc-prop="'여행 계획을 생성하고 수정하세요.'"
      :emoji-prop="'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Spiral%20Calendar.png'"
    >
    </left-heading>
    <hr />
    <div class="d-flex flex-row flex-wrap justify-content-around" v-if="loaded">
      <my-plan-item
        v-for="plan in planlist"
        :key="plan.planId"
        :plan="plan"
        @on-open-invite-sidebar="onOpenInviteSidebar(plan)"
      />
      <invite-side-bar
        id="sidebar-invite"
        ref="sidebarInvite"
        @on-invite-click="onInviteClick"
        :friends-list="invitableList"
      />
    </div>
    <add-new-plan-item />
  </div>
</template>

<script>
import sal from "sal.js";
import MyPlanItem from "@/components/myplan/MyPlanItem.vue";
import LeftHeading from "@/components/common/LeftHeading.vue";
import AddNewPlanItem from "@/components/myplan/AddNewPlanItem.vue";
import InviteSideBar from "@/components/common/InviteSideBar.vue";
import { listPlanByUserWithThumbnail } from "@/api/plan";
import { listFollowing } from "@/api/follow";
import { postInviteNotify } from "@/api/notify";

export default {
  name: "AppMyPlan",
  components: {
    MyPlanItem,
    LeftHeading,
    AddNewPlanItem,
    InviteSideBar,
  },
  methods: {
    onInviteClick() {
      let arr = document.querySelectorAll(".invitefriends");
      let invited = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked) {
          invited.push(Number(arr[i].value));
        }
      }

      let params = {
        planId: this.targetPlan.planId,
        invitedUsers: invited,
      };

      postInviteNotify(
        params,
        () => {
          alert("초대를 보냈습니다!");
          document.querySelector("#inviteCloseBtn").click();
        },
        () => {}
      );
    },
    onOpenInviteSidebar(plan) {
      this.targetPlan = plan;
      this.invitableList = [];
      for (let i = 0; i < this.friendsList.length; i++) {
        let flag = true;
        for (let m = 0; m < plan.members.length; m++) {
          if (plan.members[m].userId == this.friendsList[i].followeeId) flag = false;
          if (!flag) break;
        }
        if (flag) this.invitableList.push(this.friendsList[i]);
      }
    },
  },
  data() {
    return {
      planlist: [],
      friendsList: [],
      invitableList: [],
      loaded: false,
      targetPlan: null,
    };
  },
  created() {
    listPlanByUserWithThumbnail(
      (data) => {
        this.planlist = data.data;
        this.loaded = true;
      },
      () => {
        alert("플랜 로드 중 에러가 발생했습니다.");
      }
    );

    listFollowing(
      this.$store.getters["userId"],
      (res) => {
        this.friendsList = res.data;
      },
      () => {
        alert("친구 리스트 로드 중 에러가 발생했습니다.");
      }
    );
  },
  mounted() {
    sal({
      threshold: 1,
    });
  },
};

LeftHeading;
</script>

<style></style>
