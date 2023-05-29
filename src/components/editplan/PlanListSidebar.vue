<template>
  <div
    data-sal="slide-up"
    data-sal-duration="300"
    data-sal-delay="50"
    data-sal-easing="ease-in-out"
    id="plan-list-sidebar-container"
    class="map-btn d-none d-lg-flex"
    style="position: absolute; right: 0; z-index: 99999"
  >
    <b-button
      v-b-tooltip.hover.v-light.right
      title="현재 코스 리스트"
      v-b-toggle.sidebar-plan
      class="btn-outline-secondary m-4"
      style="background-color: white; border-radius: 100%; aspect-ratio: 1/1"
    >
      <b-icon-list />
    </b-button>
    <b-sidebar id="sidebar-plan" width="25%" right no-header shadow>
      <div class="px-3 py-3 h-100 d-flex flex-column">
        <h2 class="side-header">
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Auto%20Rickshaw.png"
            alt="Auto Rickshaw"
            width="50"
            height="50"
          />
          현재 코스 리스트
        </h2>
        <hr style="margin-bottom: 0; width: 100%" />
        <!-- body 시작 -->
        <plan-save-form
          :title="title"
          :start-date="startDate"
          :end-date="endDate"
          @on-update-start-date="onUpdateStartDate"
          @on-update-end-date="onUpdateEndDate"
          @on-update-title="onUpdateTitle"
        />
        <attr-search-result-list
          :type="'plan'"
          :courses="courses"
          ref="planlist"
          @set-marker="setMarker"
          @on-update-path="reqUpdatePath"
          @set-init-map="reqSetInitMap"
          @chat-req-change-tab="reqChatChangeTab"
        />
        <!-- body 끝 -->
      </div>
      <template #footer="{ hide }">
        <hr class="m-0" />
        <div class="d-flex bg-light text-light align-items-center px-4 py-3 mb-2">
          <div class="d-flex w-100 justify-content-between">
            <b-button size="md" @click="hide">닫기</b-button>
            <b-button
              size="md"
              id="btn-save"
              class="btn btn-outline-primary bg-light"
              @click="saveCourse"
            >
              저장
            </b-button>
          </div>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import PlanSaveForm from "./PlanSaveForm.vue";
import AttrSearchResultList from "./AttrSearchResultList.vue";
export default {
  props: {
    title: {
      type: String,
      default: null,
    },
    startDate: {
      type: String,
      default: null,
    },
    endDate: {
      type: String,
      default: null,
    },
    courses: {
      type: Array,
    },
  },
  components: {
    PlanSaveForm,
    AttrSearchResultList,
  },
  methods: {
    reqFetchCourse(course) {
      this.$refs.planlist.fetchPath(course);
    },
    onChatReqChangeTab(params) {
      this.$refs.planlist.onUpdatePath(params.idx, params.send);
    },

    reqChatChangeTab(idx) {
      this.$emit("chat-req-change-tab", idx);
    },
    reqSetInitMap(list) {
      this.$emit("set-init-map", list);
    },
    onUpdateEndDate(v) {
      this.$emit("on-update-end-date", v);
    },
    onUpdateStartDate(v) {
      this.$emit("on-update-start-date", v);
    },
    onUpdateTitle(v) {
      this.$emit("on-update-title", v);
    },
    saveCourse() {
      this.$refs.planlist.saveCourse(this.title, this.startDate, this.endDate);
    },
    setMarker(LatLngAndInfo) {
      this.$emit("set-marker", LatLngAndInfo);
    },
    addPath(info) {
      this.$refs.planlist.addPath(info);
    },
    reqUpdatePath(courseAndSend) {
      this.$emit("req-update-path", courseAndSend);
    },
  },
};
</script>

<style scoped lang="scss">
.map-btn:hover,
.map-btn button:hover,
.map-btn button svg:hover {
  color: rgba(0, 0, 0, 0.7);
}
.map-btn:focus,
.map-btn button:focus,
.map-btn button svg:focus {
  color: rgba(0, 0, 0, 0.7);
}
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

  .nav-tabs {
    flex-wrap: nowrap;
    overflow-x: scroll;
  }

  ul.nav-tabs li a.nav-link {
    white-space: nowrap;
  }
}
</style>
