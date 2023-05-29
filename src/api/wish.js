import { apiInstance } from "./index.js";
import store from "../store/index.js";

const api = apiInstance();

// GET
// 찜한 관광지 리스트
function getWishes(params, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/wishes`, { params: params }).then(success).catch(fail);
}

// GET
// 찜한 관광지인지 체크
function checkWish(contentId, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/wishes/${contentId}`).then(success).catch(fail);
}

// POST
// 관광지 찜하기
function postWish(params, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.post(`/wishes`, JSON.stringify(params)).then(success).catch(fail);
}

// DELETE
// 찜 삭제
function deleteWish(contentId, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.delete(`/wishes/${contentId}`).then(success).catch(fail);
}

export { deleteWish, getWishes, postWish, checkWish };
