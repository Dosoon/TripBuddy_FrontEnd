import { apiInstance } from "./index.js";
import store from "../store/index.js";

const api = apiInstance();

// POST
// 메모 작성
function postMemo(params, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.post(`/memos`, JSON.stringify(params)).then(success).catch(fail);
}

// DELETE
// 메모 삭제하기
function deleteMemo(memoId, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.delete(`/memos/${memoId}`).then(success).catch(fail);
}

// GET
// 메모 리스트 가져오기

function getMemos(planId, contentId, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/memos/${planId}/${contentId}`).then(success).catch(fail);
}

export { deleteMemo, getMemos, postMemo };
