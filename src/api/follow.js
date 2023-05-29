import { apiInstance } from "./index.js";
import store from "../store/index.js";

const api = apiInstance();

function followUser(params, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.post(`/follow`, JSON.stringify(params)).then(success).catch(fail);
}

function unfollowUser(followingId, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.delete(`/follow/${followingId}`).then(success).catch(fail);
}

function listFollowing(followerId, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/follow/followees/${followerId}`).then(success).catch(fail);
}

function listFollower(followeeId, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/follow/followers/${followeeId}`).then(success).catch(fail);
}

function followInfo(userId, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/follow/${userId}`).then(success).catch(fail);
}

function isFollowing(followeeId, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/follow/state/followees/${followeeId}`).then(success).catch(fail);
}

function isReviewFollowing(reveiwId, success, fail) {
  api.defaults.headers["access-token"] = store.getters["accessToken"];
  api.get(`/follow/state/reviews/${reveiwId}`).then(success).catch(fail);
}

export {
  isReviewFollowing,
  isFollowing,
  followInfo,
  followUser,
  listFollower,
  listFollowing,
  unfollowUser,
};
