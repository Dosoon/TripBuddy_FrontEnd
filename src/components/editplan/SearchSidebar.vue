<template>
  <div
    data-sal="slide-up"
    data-sal-duration="300"
    data-sal-delay="50"
    data-sal-easing="ease-in-out"
    id="search-sidebar-container"
    class="map-btn d-none d-lg-flex"
    style="position: absolute; z-index: 99999"
  >
    <b-button
      v-b-tooltip.hover.v-light.right
      title="관광지 검색"
      v-b-toggle.sidebar-1
      class="btn-outline-secondary m-4"
      style="background-color: white; border-radius: 100%; aspect-ratio: 1/1"
      id="btn-search-sidebar"
    >
      <b-icon-search />
    </b-button>
    <b-sidebar id="sidebar-1" width="25%" no-header shadow>
      <div class="px-3 py-3 h-100 d-flex flex-column">
        <h2 class="side-header">
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Compass.png"
            alt="Compass"
            width="50"
            height="50"
          />
          관광지 검색
        </h2>
        <hr style="width: 100%; margin-bottom: 0" />
        <!-- body 시작 -->
        <attr-search-form
          @on-new-result="onNewResult"
          @on-add-result="onAddResult"
          @reset-list="resetList"
          ref="searchForm"
        />
        <!-- list 시작 -->
        <attr-search-result-list
          :type="'search'"
          ref="resultList"
          @set-marker="setMarker"
          @req-scroll-search="reqScrollSearch"
        ></attr-search-result-list>
        <!-- body 끝 -->
      </div>
      <template #footer="{ hide }">
        <hr class="m-0" />
        <div class="d-flex bg-light text-light align-items-center px-4 py-3 mb-2">
          <div class="d-flex w-100 justify-content-end">
            <b-button size="md" @click="hide">닫기</b-button>
          </div>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import AttrSearchForm from "./AttrSearchForm.vue";
import AttrSearchResultList from "./AttrSearchResultList.vue";
export default {
  components: {
    AttrSearchForm,
    AttrSearchResultList,
  },
  created() {},
  methods: {
    reqScrollSearch() {
      this.$refs.searchForm.scrollSearch();
    },
    onNewResult(result) {
      this.$refs.resultList.onNewResult(result);
    },
    onAddResult(result) {
      this.$refs.resultList.onAddResult(result);
    },
    resetList() {
      this.$refs.resultList.resetList();
    },
    reqSearch(latlng) {
      this.$refs.searchForm.reqSearch(latlng);
    },
    setMarker(LatLngAndInfo) {
      this.$emit("set-marker", LatLngAndInfo);
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
}
</style>
