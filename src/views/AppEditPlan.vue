<template>
  <div
    class="w-100 h-100 row"
    style="margin-top: -40px; margin-right: 0; margin-left: 0; overflow-y: hidden"
  >
    <kakao-map
      @search-latlng="onSearchLatLng"
      ref="kakaomap"
      @add-path="addPath"
      @req-change-tab="reqChangeTab"
      @req-fetch-course="reqFetchCourse"
    />
    <search-sidebar ref="searchSidebar" @set-marker="setMarker" />
    <plan-list-sidebar
      :title="title"
      :start-date="startDate"
      :end-date="endDate"
      :courses="courses"
      @on-update-start-date="onUpdateStartDate"
      @on-update-end-date="onUpdateEndDate"
      @on-update-title="onUpdateTitle"
      @set-marker="setMarker"
      @req-update-path="updatePath"
      @set-init-map="reqSetInitMap"
      @chat-req-change-tab="reqChatChangeTab"
      ref="planlistSidebar"
    />
  </div>
</template>

<script>
import SearchSidebar from "@/components/editplan/SearchSidebar.vue";
import KakaoMap from "@/components/editplan/KakaoMap.vue";
import PlanListSidebar from "@/components/editplan/PlanListSidebar.vue";
import sal from "sal.js";
import { getPlanInfo } from "@/api/plan";

export default {
  name: "AppEditPlan",
  components: { SearchSidebar, KakaoMap, PlanListSidebar },
  data() {
    return {
      planId: -1,
      title: null,
      startDate: null,
      endDate: null,
      lastModified: null,
      courses: [],
      loaded: false,
    };
  },
  created() {
    if (this.$route.params.planid == undefined) {
      alert("플랜 생성에 실패했습니다.\n다시 시도해주세요.");
    } else {
      this.planId = this.$route.params.planid;
      getPlanInfo(
        this.planId,
        (res) => {
          let plan = res.data;
          this.title = plan.title;
          this.startDate = plan.startDate;
          this.endDate = plan.endDate;
          this.lastModified = plan.lastModified;
        },
        () => {}
      );
    }
  },
  mounted() {
    sal({
      threshold: 0,
      once: true,
      exitEventName: "onSalExit",
    });
  },
  methods: {
    reqFetchCourse(course) {
      this.$refs.planlistSidebar.reqFetchCourse(course);
    },
    reqChangeTab(params) {
      this.$refs.planlistSidebar.onChatReqChangeTab(params);
    },
    reqChatChangeTab(idx) {
      this.$refs.kakaomap.sendChangeTab(idx);
    },
    reqSetInitMap(list) {
      this.$refs.kakaomap.setInitMap(list);
    },
    onUpdateStartDate(v) {
      this.startDate = v;
    },
    onUpdateEndDate(v) {
      this.endDate = v;
    },
    onUpdateTitle(v) {
      this.title = v;
    },
    onSearchLatLng(latlng) {
      this.$refs.searchSidebar.reqSearch(latlng);
    },
    setMarker(LatLngAndInfo) {
      this.$refs.kakaomap.setMarker(LatLngAndInfo);
    },
    addPath(info) {
      this.$refs.planlistSidebar.addPath(info);
    },
    updatePath(courseAndSend) {
      this.$refs.kakaomap.resetMarkers();
      if (courseAndSend.course) this.$refs.kakaomap.setMarkers(courseAndSend);

      let send = null;
      if (courseAndSend.send != null || courseAndSend.send != undefined) send = courseAndSend.send;
      else send = true;

      if (send) this.$refs.kakaomap.sendNewPath(courseAndSend);
    },
  },
};
</script>

<style scoped>
.h-90 {
  height: 90%;
}
</style>
