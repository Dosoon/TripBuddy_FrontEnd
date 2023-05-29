import { apiInstance } from "./index.js";
import store from "../store/index.js";

const api = apiInstance();

// GET
// 관광지 정보
function attractionInfo(contentId, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/attrs/${contentId}`).then(success).catch(fail);
}

// GET
// 시도리스트
function getSiDoAreaCodes(success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/attrs/areacodes`).then(success).catch(fail);
}

// GET
// 구군 리스트
function getGugunAreaCodes(sido, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/attrs/areacodes/${sido}`).then(success).catch(fail);
}

// GET
// 관광지 검색
function search(params, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/attrs/search`, { params: params }).then(success).catch(fail);
}

export { attractionInfo, getGugunAreaCodes, getSiDoAreaCodes, search };
