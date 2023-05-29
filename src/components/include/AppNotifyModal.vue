<template>
  <b-modal id="notify-modal" centered v-model="show">
    <template #modal-title>
      <b-icon-bell class="primary" /> <span class="header"> 알림</span>
    </template>

    <!-- Notify Body Start -->

    <div
      class="d-inline-block w-100"
      style="max-height: 400px; overflow-y: scroll"
      ref="notifyList"
      @scroll="onScroll"
    >
      <b-list-group flush>
        <recent-notify-item
          :full="true"
          v-for="notify in notifys"
          :key="notify.notifyId"
          :notify="notify"
          @reset-list="resetList"
        />
      </b-list-group>
    </div>

    <!-- Notify Body End-->

    <template #modal-footer>
      <div class="w-100">
        <b-button
          variant="primary"
          size="sm"
          id="notifyModalBtn"
          class="float-right"
          @click="show = false"
        >
          확인
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import RecentNotifyItem from "../common/RecentNotifyItem.vue";
import { getNotifys } from "@/api/notify";

export default {
  components: { RecentNotifyItem },
  data() {
    return {
      show: false,
      notifys: [],
      page: 1,
      loaded: false,
    };
  },
  methods: {
    resetList() {
      this.page = 1;
      let params = {
        page: this.page,
      };
      getNotifys(
        params,
        (res) => {
          this.notifys = res.data;
        },
        () => {}
      );
      this.page++;
    },
    onScroll(e) {
      if (e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight <= 0) {
        let params = {
          page: this.page,
        };
        getNotifys(
          params,
          (res) => {
            this.notifys = this.notifys.concat(res.data);
          },
          () => {}
        );
        this.page++;
      }
    },
  },
  watch: {
    show() {
      if (this.show) {
        let params = {
          page: this.page,
        };
        getNotifys(
          params,
          (res) => {
            this.notifys = this.notifys.concat(res.data);
          },
          () => {}
        );
        this.page++;
      } else {
        this.page = 1;
        this.notifys = [];
      }
    },
  },
};
</script>

<style scoped>
.header {
  font-family: "NanumSquareNeo-ExtraBold" !important;
}
</style>
