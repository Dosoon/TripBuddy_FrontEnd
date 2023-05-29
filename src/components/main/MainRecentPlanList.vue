<template>
  <b-card
    no-body
    header="최근 수정한 플랜"
    class="w-25 recent-header"
    style="
      max-width: 25%;
      min-width: 25%;
      min-height: 25%;
      max-height: 25%;
      overflow-y: hidden;
      border-radius: 15px;
    "
  >
    <b-list-group flush style="height: 220px; background-color: white">
      <main-recent-plan-item
        v-for="plan in recentPlanList"
        :key="plan.planId"
        :plan="plan"
      ></main-recent-plan-item>
      <div v-if="recentPlanList.length < 1">
        <b-list-group-item v-for="index in 1" :key="index" class="w-100 h-100">
          <div style="color: black; font-family: 'NanumSquareNeo-Thin'" class="text-center p-2">
            플랜이 없습니다.
          </div>
        </b-list-group-item>
      </div>
    </b-list-group>
  </b-card>
</template>

<script>
import MainRecentPlanItem from "./MainRecentPlanItem.vue";
import { listPlanByUserWithThumbnail } from "@/api/plan";

export default {
  components: {
    MainRecentPlanItem,
  },
  data() {
    return {
      recentPlanList: [],
    };
  },
  created() {
    listPlanByUserWithThumbnail(
      (res) => {
        this.recentPlanList = res.data;
      },
      () => {}
    );
  },
};
</script>

<style scoped>
@font-face {
  font-family: "NanumSquareNeo-Normal";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2")
    format("woff2");
  font-weight: 550;
  font-style: normal;
}

h4 {
  font-family: "NanumSquareNeo-Normal";
  color: color;
  letter-spacing: -1px;
  margin: 0;
  color: white;
}

#recent-plan-list-container {
  padding: 15px;
  border-radius: 15px;
  margin-bottom: 15px;
  border: 1px rgba(0, 0, 0, 0.13) solid;
}

.recent-header {
  font-family: "NanumSquareNeo-Normal";
  font-size: large;
  text-align: left;
  overflow: hidden;
  border: 1px rgb(207, 207, 207) solid !important;
  background-color: rgba(3, 149, 165, 1);
  color: white;
}

.list-group {
  max-height: 246px;
  overflow-y: scroll;
}

.list-group-item {
  padding: 0;
}
</style>
