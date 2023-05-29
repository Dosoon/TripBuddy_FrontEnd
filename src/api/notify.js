import { apiInstance } from "./index.js";
import store from "../store/index.js";

const api = apiInstance();

// GET
// 알림 정보
function getNotifys(params, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/notifys`, { params: params }).then(success).catch(fail);
}

// GET
// 알림 정보
function getRecentNotifys(success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/notifys/recent`).then(success).catch(fail);
}

// GET
// 알림 정보
function getNotreadNotifys(success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/notifys/notread`).then(success).catch(fail);
}

// PUT
// 알림 내 버튼 삭제
function disableNotify(params, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.put(`/notifys`, JSON.stringify(params)).then(success).catch(fail);
}

// PUT
// 초대 알림 수락 처리
function acceptNotify(params, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.put(`/notifys/accept`, JSON.stringify(params)).then(success).catch(fail);
}

// POST
// 초대 알림 전송
function postInviteNotify(params, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.post(`/notifys/invite`, JSON.stringify(params)).then(success).catch(fail);
}

export {
  disableNotify,
  getNotifys,
  postInviteNotify,
  acceptNotify,
  getRecentNotifys,
  getNotreadNotifys,
};
