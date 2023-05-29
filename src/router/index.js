import Vue from "vue";
import VueRouter from "vue-router";
import AppMain from "../views/AppMain.vue";
import AppMyPlan from "../views/AppMyPlan.vue";
import AppEditPlan from "../views/AppEditPlan.vue";
import AppTripLog from "../views/AppTripLog.vue";
import AppIndex from "../views/AppIndex.vue";
import AppNotice from "../views/AppNotice.vue";
import AppNoticeDetail from "../views/AppNoticeDetail.vue";
import AppNoticeRegister from "../views/AppNoticeRegister.vue";
import AppNoticeModify from "../views/AppNoticeModify.vue";
import AppReview from "../views/AppReview.vue";
import AppReviewDetail from "../views/AppReviewDetail.vue";
import AppReviewRegister from "../views/AppReviewRegister.vue";
import AppReviewModify from "../views/AppReviewModify.vue";
import AppHotPlace from "../views/AppHotPlace.vue";
import AppMyPage from "../views/AppMyPage.vue";
import jwtDecode from "jwt-decode";
import { checkToken, regenToken, logout } from "@/api/user";
import store from "../store/index.js";

Vue.use(VueRouter);

const tokenRegeneration = async () => {
  await regenToken(
    store.getters["userId"],
    (res) => {
      store.commit("setTokens", { accessToken: res.data["access-token"] });
      store.commit("SET_IS_VALID_TOKEN", true);
      return true;
    },
    async (err) => {
      if (err.response.status === 401) {
        await logout(
          () => {
            store.commit("SET_IS_VALID_TOKEN", false);
            store.commit("SET_IS_LOGIN", false);
            throw new Error(401);
          },
          () => {
            store.commit("SET_IS_VALID_TOKEN", false);
            store.commit("SET_IS_LOGIN", false);
            throw new Error(500);
          }
        );
      }
    }
  );
};

const onlyNotAuthUser = (to, from, next) => {
  if (store.getters["accessToken"] == null) next();
};

const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters["userId"];
  const token = store.getters["accessToken"];

  if (checkUserInfo != -1 && token) {
    let decodeToken = jwtDecode(token);
    await checkToken(
      decodeToken.userId,
      () => {
        next();
      },
      async () => {
        await tokenRegeneration()
          .then(() => {
            next();
          })
          .catch(() => {
            alert("토큰이 만료되었습니다.\n재로그인 후 이용해 주세요.");
            router.push("/");
          });
      }
    );
  }
  next("/");
};

const routes = [
  {
    path: "/main",
    component: AppMain,
    beforeEnter: onlyAuthUser,
  },
  {
    path: "/myplan",
    component: AppMyPlan,
    beforeEnter: onlyAuthUser,
  },
  {
    path: "/editplan/:planid",
    component: AppEditPlan,
    beforeEnter: onlyAuthUser,
  },
  {
    path: "/triplog/:id",
    component: AppTripLog,
    beforeEnter: onlyAuthUser,
  },
  {
    path: "/",
    component: AppIndex,
    beforeEnter: onlyNotAuthUser,
  },
  {
    path: "/notices",
    name: "notices",
    component: AppNotice,
    beforeEnter: onlyAuthUser,
  },
  {
    path: "/notices/:noticeId",
    name: "appnoticedetail",
    component: AppNoticeDetail,
    beforeEnter: onlyAuthUser,
  },
  {
    path: "/notice/register/:page",
    name: "appnoticeregister",
    component: AppNoticeRegister,
    beforeEnter: onlyAuthUser,
  },
  {
    path: "/notices/modify",
    name: "appnoticemodify",
    component: AppNoticeModify,
    beforeEnter: onlyAuthUser,
  },
  {
    path: "/reviews",
    name: "review",
    component: AppReview,
    beforeEnter: onlyAuthUser,
  },
  {
    path: "/reviews/:reviewId/:fromApp",
    name: "appreviewdetail",
    component: AppReviewDetail,
    beforeEnter: onlyAuthUser,
  },
  {
    path: "/reviews/register",
    name: "appreviewregister",
    component: AppReviewRegister,
    beforeEnter: onlyAuthUser,
  },
  {
    path: "/reviews/modify/:reviewId/:fromApp",
    name: "appreviewmodify",
    component: AppReviewModify,
    beforeEnter: onlyAuthUser,
  },
  {
    path: "/hotplace",
    name: "hotplace",
    component: AppHotPlace,
    beforeEnter: onlyAuthUser,
  },
  {
    path: "/mypage",
    component: AppMyPage,
    beforeEnter: onlyAuthUser,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
