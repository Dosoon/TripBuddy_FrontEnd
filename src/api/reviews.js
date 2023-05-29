import { apiInstance } from "./index.js";
import store from "../store/index.js";

const api = apiInstance();

// GET
// /reviews
// 리뷰 리스트
function getReviews(params, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/reviews`, { params: params }).then(success).catch(fail);
}

// POST
// /reviews
// 리뷰 작성
function postReview(params, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.post(`/reviews`, JSON.stringify(params)).then(success).catch(fail);
}

// PUT
// /reviews
// 리뷰 수정
function modifyReview(params, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.put(`/reviews`, JSON.stringify(params)).then(success).catch(fail);
}

// GET
// /reviews/{reviewId}
// 리뷰 게시글 가져오기
function getReview(reviewId, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/reviews/${reviewId}`).then(success).catch(fail);
}

// DELETE
// /reviews/{reviewId}
// 리뷰 삭제하기
function deleteReview(reviewId, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.delete(`/reviews/${reviewId}`).then(success).catch(fail);
}

// GET
// /reviews/{reviewId}/comments
// 리뷰의 댓글 리스트
function listComment(reviewId, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/reviews/${reviewId}/comments`).then(success).catch(fail);
}

// GET
// /reviews/hot
// 인기 리뷰리스트 가져오기
function listHotReview(success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/reviews/hot`).then(success).catch(fail);
}

// POST
// /reviews/rating
// 리뷰 평점
function rateReview(params, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.post(`/reviews/rating`, JSON.stringify(params)).then(success).catch(fail);
}

function totalReviews(keyword, success, fail) {
  if (keyword == null) api.get(`/reviews/total`).then(success).catch(fail);
  else api.get(`/reviews/total?keyword=${keyword}`).then(success).catch(fail);
}

function getReviewsById(id, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/reviews/ids/${id}`).then(success).catch(fail);
}

export {
  deleteReview,
  getReview,
  listComment,
  listHotReview,
  modifyReview,
  postReview,
  rateReview,
  totalReviews,
  getReviews,
  getReviewsById,
};
