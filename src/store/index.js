import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    accessToken: null,
    refreshToken: null,
    isValidToken: false,
    isLogin: false,
    email: "",
    id: "",
    lastAccess: "",
    name: "",
    profileImg: "",
    tel: "",
    userId: -1,
    plan: -1,
    invitable: [],
    admin: false,
    targetCourses: [],
  },
  getters: {
    isAuthenticated(state) {
      return state.lastAccess != "";
    },
    userInfo(state) {
      return {
        email: state.email,
        id: state.id,
        lastAccess: state.lastAccess,
        name: state.name,
        profileImg: state.profileImg,
        tel: state.tel,
        userId: state.userId,
        admin: state.admin,
      };
    },
    name(state) {
      return state.name;
    },
    profileImg(state) {
      return state.profileImg;
    },
    id(state) {
      return state.id;
    },
    userId(state) {
      return state.userId;
    },
    plan(state) {
      return state.plan;
    },
    invitable(state) {
      return state.invitable;
    },
    targetCourses(state) {
      return state.targetCourses;
    },
    email(state) {
      return state.email;
    },
    accessToken(state) {
      return state["accessToken"];
    },
    refreshToken(state) {
      return state["refreshToken"];
    },
    isValidToken(state) {
      return state.isValidToken;
    },
    isLogin(state) {
      return state.isLogin;
    },
  },
  mutations: {
    onLogin: function (state, payload) {
      state.email = payload.email;
      state.id = payload.id;
      state.lastAccess = payload.lastAccess;
      state.name = payload.name;
      state.profileImg = payload.profileImg;
      state.tel = payload.tel;
      state.userId = payload.userId;
      state.admin = payload.admin;
    },
    targetPlan: function (state, payload) {
      state.plan = payload.plan.planId;
    },
    setTargetCourses: function (state, payload) {
      state.targetCourses = payload;
    },
    setProfileImg: function (state, payload) {
      state.profileImg = payload;
    },
    setTokens: function (state, payload) {
      if (payload.accessToken) state.accessToken = payload.accessToken;
      if (payload.refreshToken) state.refreshToken = payload.refreshToken;
    },
    SET_IS_LOGIN: function (state, payload) {
      state.isLogin = payload;
    },
    SET_IS_VALID_TOKEN: function (state, payload) {
      state.isValidToken = payload;
    },
    resetState(state) {
      (state.accessToken = null),
        (state.refreshToken = null),
        (state.isValidToken = false),
        (state.isLogin = false),
        (state.email = ""),
        (state.id = ""),
        (state.lastAccess = ""),
        (state.name = ""),
        (state.profileImg = ""),
        (state.tel = ""),
        (state.userId = -1),
        (state.plan = -1),
        (state.invitable = []),
        (state.admin = false),
        (state.targetCourses = []);
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState({ storage: window.sessionStorage })],
});

export default store;
