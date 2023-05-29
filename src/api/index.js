import axios from "axios";

// local vue api axios instance
function apiInstance() {
  const instance = axios.create({
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    withCredentials: true,
  });
  return instance;
}

// api관련(ex : 카카오 맵) instance 추가하여 사용 가능.

export { apiInstance };
