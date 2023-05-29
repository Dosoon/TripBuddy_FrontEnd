<template>
  <div id="notifys-header" class="mt-2 w-100">
    <b-icon-bell-fill id="notify-icon" />
    최근 알림
    <div id="notifys-body" class="w-85" v-if="notifys.length > 0">
      <recent-notify-item
        v-for="notify in notifys"
        :key="notify.notifyId"
        :notify="notify"
      ></recent-notify-item>
    </div>
    <div v-else id="notifys-body" class="w-85"><div class="d-flex">최근 알림이 없습니다.</div></div>
  </div>
</template>

<script>
import RecentNotifyItem from "../common/RecentNotifyItem.vue";
import { getRecentNotifys } from "@/api/notify";

export default {
  components: {
    RecentNotifyItem,
  },
  data() {
    return {
      notifys: [],
    };
  },
  created() {
    getRecentNotifys(
      (res) => {
        this.notifys = res.data;
      },
      () => {}
    );
  },
};
</script>

<style scoped>
#notifys-body {
  font-family: "NanumSquareNeo-Thin";
  border: 1px rgba(0, 0, 0, 0.13) solid;
  margin-top: 10px;
  border-radius: 7px;
  padding: 10px;
}

#notify-icon {
  color: rgba(3, 149, 165, 1) !important;
}

.w-85 {
  max-width: 85%;
}
</style>
