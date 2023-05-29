import { apiInstance } from "./index.js";
import store from "../store/index.js";

const api = apiInstance();

async function checkToken(userid, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  await api.get(`/users/auth/${userid}`).then(success).catch(fail);
}

async function regenToken(user, success, fail) {
  api.defaults.headers["refresh-token"] = store.getters["refreshToken"];
  await api.get(`/users/auth/regen/${user}`).then(success).catch(fail);
}

// 회원 가입
function signup(params, success, fail) {
  api.post(`/users`, JSON.stringify(params)).then(success).catch(fail);
}

// 유저 정보 수정
function modifyUser(params, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.put(`/users`, JSON.stringify(params)).then(success).catch(fail);
}

// 회원 삭제
function deleteUser(success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.delete(`/users`).then(success).catch(fail);
}

// 유저 정보
function getUserInfo(userStringId, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/users/${userStringId}`).then(success).catch(fail);
}

// 유저별 리뷰 반환
function listReviewByUser(userId, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/users/${userId}/reviews`).then(success).catch(fail);
}

// 유저 비밀번호 초기화
function sendEmail(params, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.post(`/users/email`, JSON.stringify(params)).then(success).catch(fail);
}

// 로그인
async function login(params, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  await api.post(`/users/login`, JSON.stringify(params)).then(success).catch(fail);
}

// 로그아웃
async function logout(success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  await api.get(`/users/logout`).then(success).catch(fail);
}

async function checkId(id, success, fail) {
  await api.get(`/users/check/${id}`).then(success).catch(fail);
}

// function listReviewByUser()

export {
  signup,
  modifyUser,
  deleteUser,
  getUserInfo,
  listReviewByUser,
  sendEmail,
  login,
  logout,
  checkToken,
  regenToken,
  checkId,
};
