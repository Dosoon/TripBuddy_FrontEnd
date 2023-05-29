<template>
  <div
    class="my-plan-item"
    data-sal="slide-up"
    data-sal-duration="300"
    data-sal-delay="50"
    data-sal-easing="ease-in-out"
  >
    <div class="h-100 d-flex" @click="onCreatePlan">
      <h2 class="m-auto">
        새 여행 플랜 추가하기
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Backhand%20Index%20Pointing%20Left%20Light%20Skin%20Tone.png"
          alt="Backhand Index Pointing Left Light Skin Tone"
          width="50"
          height="50"
        />
      </h2>
    </div>
  </div>
</template>

<script>
import { postPlan } from "@/api/plan";
export default {
  name: "AddNewPlanItem",
  methods: {
    onCreatePlan() {
      postPlan(
        (res) => {
          this.$router.push("/editplan/" + res.data.planId);
        },
        () => alert("플랜 생성에 실패했습니다.\n다시 시도해주세요.")
      );
    },
  },
};
</script>

<style scoped>
h2 {
  font-family: "NanumSquareNeo-Thin";
  margin: 0;
  margin-top: 10px;
  text-align: center;
}
p {
  margin: 0;
  color: rgba(0, 0, 0, 0.6);
}
.my-plan-item {
  color: rgba(105, 105, 105, 0.7);
  display: inline-block;
  width: 45%;
  border: 1px rgba(0, 0, 0, 0.13) dashed;
  border-radius: 15px;
  margin: 20px 10px;
  padding: 15px;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 8px;
  background-color: rgba(0, 0, 0, 0.045);
}

.my-plan-item:hover {
  transform: scale(1.02);
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  background-color: rgba(0, 0, 0, 0.15);
}
</style>
