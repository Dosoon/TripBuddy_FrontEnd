import { apiInstance } from "./index.js";
import store from "../store/index.js";

const api = apiInstance();

// GET
// 플랜 리스트
function listPlanByUser(success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/plans`).then(success).catch(fail);
}

// POST
// 새 플랜 작성
function postPlan(success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.post(`/plans`).then(success).catch(fail);
}

// PUT
// 플랜 수정
function modifyPlan(params, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.put(`/plans`, JSON.stringify(params)).then(success).catch(fail);
}

// GET
// 플랜 가져오기
function getPlanInfo(planId, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/plans/${planId}`).then(success).catch(fail);
}

// POST
// 플랜 스크랩
function scrapPlan(planId, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.post(`/plans/${planId}`).then(success).catch(fail);
}

// POST
// 플랜 가입
function postPlanMember(planId, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.post(`/plans/${planId}/users`).then(success).catch(fail);
}

// DELETE
// 플랜 탈퇴
function deletePlanMember(planId, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.delete(`plans/${planId}/users`).then(success).catch(fail);
}

// GET
// 썸네일이 있는 플랜 리스트
function listPlanByUserWithThumbnail(success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/plans/thumbnails`).then(success).catch(fail);
}

// GET
// 모든 플랜 리스트
function getPlanList(success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/plans/list`).then(success).catch(fail);
}

export {
  deletePlanMember,
  getPlanInfo,
  listPlanByUser,
  listPlanByUserWithThumbnail,
  modifyPlan,
  postPlan,
  postPlanMember,
  scrapPlan,
  getPlanList,
};
