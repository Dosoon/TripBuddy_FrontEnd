<template>
  <div
    class="my-plan-item"
    data-sal="slide-up"
    data-sal-duration="300"
    data-sal-delay="50"
    data-sal-easing="ease-in-out"
  >
    <div class="row">
      <div class="col-12 col-lg-4 col-xl-4 col-xxl-4">
        <b-img
          class="img-responsive"
          v-if="plan.thumbnail"
          :src="plan.thumbnail"
          style="aspect-ratio: 1/1"
          rounded
        />
        <b-img
          class="img-responsive"
          v-else
          :src="'https://monchouchou-kr.com/img/no_img.jpg'"
          style="aspect-ratio: 1/1"
          rounded
        />
      </div>
      <div class="col-12 col-lg-8 col-xl-8 col-xxl-8 mt-1" align="left">
        <div class="d-flex justify-content-between">
          <h3
            style="
              display: inline-block;
              max-width: 80%;
              word-break: keep-all;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            "
          >
            <router-link :to="'/editplan/' + plan.planId">{{ plan.title }}</router-link>
          </h3>
          <span style="font-size: 14pt">
            <a href="#" class="p-3" style="margin-right: -10px">
              <b-icon-x @click="onExitPlan" />
            </a>
          </span>
        </div>
        <p v-if="plan.startDate != undefined && plan.endDate != undefined" class="mb-1 mt-1">
          {{ plan.startDate + " ~ " + plan.endDate }}
        </p>
        <p v-else-if="plan.startDate != undefined && plan.endDate == undefined" class="mb-1 mt-1">
          {{ "미정 시작일 ~ " + plan.endDate }}
        </p>
        <p v-else-if="plan.startDate == undefined && plan.endDate != undefined" class="mb-1 mt-1">
          {{ plan.startDate + " ~ 미정 종료일" }}
        </p>
        <p v-else class="mb-1 mt-1">일정이 정해지지 않은 플랜</p>
        <p v-if="plan.members.length > 1">
          <b-icon-people-fill />
          {{ plan.members[0].name + "님 외 " + (plan.members.length - 1) + "명" }}
        </p>
        <p v-else><b-icon-person-fill />혼자 가는 여행</p>
        <div align="right">
          <button
            v-b-toggle.sidebar-invite
            class="btn btn-outline-primary btn-rad"
            @click="openSidebar(plan)"
          >
            <b-icon-person-plus-fill />
            초대
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sal from "sal.js";
import { deletePlanMember } from "@/api/plan";
export default {
  name: "MyPlanItem",
  props: ["plan"],
  created() {},
  mounted() {
    sal();
  },
  methods: {
    openSidebar(plan) {
      this.$emit("on-open-invite-sidebar", plan);
    },
    onExitPlan() {
      if (confirm("이 플랜에서 나가시겠습니까?")) {
        deletePlanMember(
          this.plan.planId,
          () => {
            alert("플랜에서 나갔습니다.");
            this.$router.go(this.$router.currentRoute);
          },
          () => {
            alert("에러가 발생했습니다.");
          }
        );
      }
      return;
    },
  },
};
</script>

<style scoped lang="scss">
h3 {
  font-family: "NanumSquareNeo-Normal";
  margin: 0;
  margin-top: 10px;
}
p {
  margin: 0;
  color: rgba(0, 0, 0, 0.6);
}
a {
  color: rgba(0, 0, 0, 0.6);
}
.my-plan-item {
  display: inline-block;
  width: 45%;
  border: 1px rgba(0, 0, 0, 0.13) solid;
  border-radius: 15px;
  margin: 20px 10px;
  padding: 15px;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 8px;
}

.my-plan-item:hover {
  transform: scale(1.02);
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  background-color: rgba(0, 0, 0, 0.045);
}

img {
  width: 100%;
}

.btn-rad {
  border-radius: 20px;
}

::v-deep {
  a {
    color: rgba(0, 0, 0, 0.6);
    text-decoration: none;
  }

  a:hover {
    color: rgba(3, 149, 165, 1) !important;
    text-decoration: none;
  }
}
</style>
