import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import sal from "sal.js";
import PrettyCheckbox from "pretty-checkbox-vue";
require("sal.js/dist/sal.css");
require("pretty-checkbox/src/pretty-checkbox.scss");
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiAccount } from "@mdi/js";
import { BootstrapVueIcons } from "bootstrap-vue";
import "@mdi/font/css/materialdesignicons.css";
import Moveable from "vue-moveable";
import draggable from "vuedraggable";

import VueClipboard from "vue-clipboard2";

VueClipboard.config.autoSetContainer = true;
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(sal);
Vue.use(PrettyCheckbox);
Vue.use(SvgIcon);
Vue.use(mdiAccount);
Vue.use(BootstrapVueIcons);
Vue.use(Moveable);
Vue.use(draggable);
Vue.use(VueClipboard);

import "@/assets/scss/theme_colors.scss";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
