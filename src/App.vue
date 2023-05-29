<template>
  <div
    id="app"
    style="height: 100%; overflow-y: hidden"
    v-if="this.$router.currentRoute.path.startsWith('/editplan')"
  >
    <app-header />
    <blank-div />
    <router-view />
  </div>
  <div id="app" style="height: 100%" v-else-if="this.$router.currentRoute.path == '/'">
    <router-view />
  </div>
  <div id="app" v-else>
    <app-header />
    <blank-div />
    <router-view />
    <blank-div />
    <app-footer />
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import BlankDiv from "@/components/include/BlankDiv.vue";
import AppHeader from "./components/include/AppHeader.vue";
import AppFooter from "./components/include/AppFooter.vue";

export default {
  components: {
    BlankDiv,
    AppHeader,
    RouterView,
    AppFooter,
  },
  created() {},
  methods: {},
};
</script>

<style>
.primary-dark {
  color: rgba(2, 87, 140, 1) !important;
}
.primary-standard {
  color: rgba(3, 149, 165, 1) !important;
}
.bg-primary-standard {
  background-color: rgba(3, 149, 165, 1) !important;
}
.primary-light {
  color: rgba(3, 191, 172, 1) !important;
}
.sub-light {
  color: rgba(242, 137, 99, 1) !important;
}
.sub-standard {
  color: rgba(242, 92, 92, 1) !important;
}

@font-face {
  font-family: "Tenada";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-2@1.0/Tenada.woff2")
    format("woff2");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "Pretendard-Regular";
  src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
    format("woff");
  font-weight: 400;
  font-style: normal;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: auto;
}

#app {
  font-family: "Pretendard-Regular";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  letter-spacing: -0.4px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
