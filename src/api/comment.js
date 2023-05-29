import { apiInstance } from "./index.js";
import store from "../store/index.js";

const api = apiInstance();

// POST
// /comments
// 리뷰 댓글 작성
function postComment(params, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.post(`/comments`, JSON.stringify(params)).then(success).catch(fail);
}

// PUT
// /comments
// 리뷰 댓글 수정
function modifyComment(params, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.put(`/comments`, JSON.stringify(params)).then(success).catch(fail);
}

// DELETE
// /comments/{commentId}
// 댓글 삭제하기
function deleteComment(commentId, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.delete(`/comments/${commentId}`).then(success).catch(fail);
}

export { deleteComment, modifyComment, postComment };
