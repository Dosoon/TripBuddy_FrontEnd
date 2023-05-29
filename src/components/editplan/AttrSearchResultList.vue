<template>
  <div
    v-if="type == 'search'"
    id="attr-search-result-list-container"
    class="attr-search-result-list-container w-100 p-3 h-100 d-flex flex-column"
    @scroll="onScroll"
  >
    <div>
      <attr-search-result-item
        v-for="result in resultList"
        :key="result.contentId"
        :attr-prop="result"
        :type="'search'"
        @set-marker="setMarker"
      />
    </div>
  </div>
  <div
    v-else
    id="attr-search-result-list-container"
    class="attr-search-result-list-container w-100 h-100 d-flex flex-column"
  >
    <div v-if="loaded">
      <b-card no-body>
        <b-tabs v-model="tabIndex" card ref="tabmenu">
          <b-tab
            v-for="(dayCourse, index) in curCourse"
            :title="index + 1 + '일차'"
            :key="index"
            :title-link-class="linkClass(index)"
            @click="onChangeTabIndex"
          >
            <draggable :animation="500" @change="onChange" v-model="curCourse[index]">
              <transition-group>
                <attr-search-result-item
                  v-for="attr in dayCourse"
                  :key="attr.order"
                  :attr-prop="attr"
                  :type="'plan'"
                  @on-delete="onDelete"
                  @set-marker="setMarker"
                />
              </transition-group>
            </draggable>
          </b-tab>
          <template #tabs-end>
            <b-nav-item @click.prevent="onAddDay">+</b-nav-item>
          </template>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import AttrSearchResultItem from "./AttrSearchResultItem.vue";
import { getPlanInfo, modifyPlan } from "@/api/plan";
export default {
  components: { AttrSearchResultItem, draggable },
  name: "AttrSearchResultList",
  props: {
    type: {
      type: String,
      default: "plan",
    },
    courses: {
      type: Array,
    },
    maxDay: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      tabIndex: 0,
      curCourse: [],
      loaded: false,
      resultList: [],
    };
  },
  methods: {
    resetList() {
      this.resultList = [];
    },
    onChangeTabIndex(e) {
      let dayIdx = e.target.innerHTML.match(/\d+/)[0] - 1;
      this.onUpdatePath(dayIdx, false);

      // 채팅창에 탭 변경 요청
      this.$emit("chat-req-change-tab", dayIdx);
    },
    onScroll(e) {
      if (e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight <= 1) {
        this.$emit("req-scroll-search");
      }
    },
    onDelete(orderAndDay) {
      this.curCourse[orderAndDay.day - 1].splice(orderAndDay.order - 1, 1);
      this.resetOrders();
      this.$forceUpdate();
      this.onUpdatePath(this.tabIndex);
    },

    fetchPath(course) {
      this.curCourse = course.course;
      this.tabIndex = course.idx;
      this.resetOrders();
      this.$forceUpdate();
    },

    addPath(info) {
      let newObj = {
        contentId: info.contentId,
        planId: this.$route.params.planid,
        order: 99999,
        day: this.tabIndex + 1,
        attractionDto: info,
      };
      this.curCourse[this.tabIndex] = this.curCourse[this.tabIndex].concat(newObj);
      this.resetOrders();
      this.$forceUpdate();
      this.onUpdatePath(this.tabIndex);
    },
    onNewResult(result) {
      this.resultList = result;
    },
    onAddResult(result) {
      this.resultList = this.resultList.concat(result);
    },
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ["bg-primary-standard", "text-light"];
      } else {
        return ["bg-light", "text-info"];
      }
    },
    onChange() {
      this.resetOrders();
      this.onUpdatePath(this.tabIndex);
    },
    resetOrders() {
      for (let i = 0; i < this.curCourse.length; i++) {
        for (let j = 0; j < this.curCourse[i].length; j++) {
          this.curCourse[i][j].order = j + 1;
        }
      }
    },
    saveCourse(title, start, end) {
      let planid = this.$route.params.planid;
      let params = {
        title: title,
        startDate: start,
        endDate: end,
        planId: Number(planid),
        courses: this.getCourseObject(),
      };

      modifyPlan(
        params,
        () => {
          alert("저장했습니다.");
        },
        () => {}
      );
      this.onUpdatePath(this.tabIndex);
    },
    getCourseObject() {
      let courses = [];
      for (let i = 0; i < this.curCourse.length; i++) {
        for (let j = 0; j < this.curCourse[i].length; j++) {
          let obj = {
            contentId: this.curCourse[i][j].contentId,
            order: j + 1,
            day: i + 1,
          };
          courses.push(obj);
        }
      }
      return courses;
    },
    onAddDay() {
      this.curCourse.push([]);
    },
    setMarker(LatLngAndInfo) {
      this.$emit("set-marker", LatLngAndInfo);
    },
    onUpdatePath(idx = 0, send = true) {
      this.tabIndex = Number(idx);

      let params = {
        course: this.curCourse,
        send: send,
        idx: Number(idx),
      };
      this.$emit("on-update-path", params);
    },
  },
  created() {
    let planid = this.$route.params.planid;
    if (planid != undefined) {
      getPlanInfo(
        planid,
        (res) => {
          let plan = res.data;

          let initMapLatLngList = [];
          for (let i = 0; i < plan.courses.length; i++) {
            let order = plan.courses[i].order - 1;
            let day = plan.courses[i].day - 1;
            if (this.curCourse[day] == undefined) this.curCourse[day] = new Array();
            this.curCourse[day][order] = plan.courses[i];
            if (day == 0) {
              initMapLatLngList.push({
                lat: plan.courses[i].attractionDto.latitude,
                lng: plan.courses[i].attractionDto.longitude,
              });
            }
          }
          if (plan.courses.length == 0) this.onAddDay();
          this.loaded = true;
          this.onUpdatePath(this.tabIndex, false);

          this.$emit("set-init-map", initMapLatLngList);
        },
        () => {}
      );
    }
  },
  computed: {
    editCourses: {
      get() {
        return this.courses;
      },
      set(v) {
        this.$emit("on-update-courses", v);
      },
    },
  },
};
</script>

<style scoped lang="scss">
#attr-search-result-list-container {
  overflow-y: scroll;
  overflow-x: hidden;
}
#plan-list-container {
  overflow-y: scroll;
  overflow-x: hidden;
}

::v-deep {
  .card {
    border: none;
    background-color: transparent;
  }
  .card-header {
    background-color: rgba(0, 0, 0, 0) !important;
  }

  .card-header .nav-link {
    border: 1px #00000034 solid;
    margin-right: 4px;
  }
}
.sortable-ghost {
  opacity: 0.4;
  background-color: rgba(3, 149, 165, 0.6) !important;
  color: white;
  transition: all 0.1s ease-in;
}
</style>
