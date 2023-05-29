import { apiInstance } from "./index.js";
import store from "../store/index.js";

const api = apiInstance();

function getNotices(params, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/notices`, { params: params }).then(success).catch(fail);
}

function postNotice(params, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.post(`/notices`, JSON.stringify(params)).then(success).catch(fail);
}

function modifyNotice(params, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.put(`/notices`, JSON.stringify(params)).then(success).catch(fail);
}

function viewNotice(noticeId, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/notices/${noticeId}`).then(success).catch(fail);
}

function deleteNotice(noticeId, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.delete(`/notices/${noticeId}`).then(success).catch(fail);
}

function totalNotices(keyword, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  if (keyword == null) api.get(`/notices/total`).then(success).catch(fail);
  else api.get(`/notices/total?keyword=${keyword}`).then(success).catch(fail);
}

export { getNotices, modifyNotice, postNotice, viewNotice, deleteNotice, totalNotices };
