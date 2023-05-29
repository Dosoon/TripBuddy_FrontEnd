<template>
  <b-container class="shadow bg-light fixed-top" fluid ref="AppHeader" id="AppHeader">
    <b-navbar
      toggleable="lg"
      type="light"
      variant="light"
      class="ps-5 pe-5 container justify-content-between"
    >
      <b-navbar-toggle target="nav-collapse" ref="NavbarNav" @click="onCollapse"></b-navbar-toggle>
      <b-navbar-brand id="logo" :to="'/main'" href="#" class="me-5 primary-standard"
        >TripBuddy</b-navbar-brand
      >
      <b-navbar-toggle target="" class="nav-collapse me-5" style="border: none">
        <b-nav-item-dropdown right id="navbar-icon" class="d-inline-block">
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <b-img
              class="navbar-icon"
              :src="$store.getters['profileImg'] || defaultProfileImg"
              rounded="circle"
            ></b-img>
          </template>
          <b-dropdown-item v-b-modal.notify-modal class="bold-icon mt-2 mb-2">
            <span class="small"><b-icon-bell type="light"></b-icon-bell></span>&nbsp;알림
            <b-icon-circle-fill v-if="notread" class="text-danger small-badge" />
          </b-dropdown-item>
          <b-dropdown-item :to="'/mypage'" class="mt-2 mb-2">마이 페이지</b-dropdown-item>
          <b-dropdown-item class="mt-2 mb-2" @click="onLogout">로그아웃</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav class="justify-content-between">
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'notices', query: { page: 1 } }" class="ms-5 me-2 bold"
            >공지사항</b-nav-item
          >
          <b-nav-item :to="'/myplan'" class="ms-2 me-2 bold"> 마이 플랜 </b-nav-item>
          <b-nav-item :to="'/hotplace'" class="ms-2 me-2 bold">추천 코스</b-nav-item>
          <b-nav-item class="ms-2 me-2 bold" @click="onCreatePlan">플랜 생성</b-nav-item>
          <b-nav-item
            :to="{ name: 'review', query: { page: 1, sort: 'new' } }"
            class="ms-2 me-2 bold"
            >여행 후기</b-nav-item
          >
          <b-nav-item :to="'/triplog/' + $store.getters['id']" class="ms-2 me-2 bold"
            >TripLog</b-nav-item
          >
        </b-navbar-nav>
        <b-navbar-nav ref="navicon">
          <b-nav-item-dropdown right id="navbar-icon" class="d-inline-block">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <b-img
                class="navbar-icon"
                :src="$store.getters['profileImg'] || defaultProfileImg"
                rounded="circle"
              ></b-img>
              &nbsp;<strong>{{ $store.getters["name"] }}</strong> 님
              <b-icon-circle-fill v-if="notread" class="text-danger small-badge" />
            </template>
            <b-dropdown-item v-b-modal.notify-modal class="bold-icon">
              <span class="small"><b-icon-bell type="light"></b-icon-bell></span>&nbsp;알림
              <b-icon-circle-fill v-if="notread" class="text-danger small-badge" />
            </b-dropdown-item>
            <b-dropdown-item :to="'/mypage'">마이 페이지</b-dropdown-item>
            <b-dropdown-item @click="onLogout">로그아웃</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <app-notify-modal />
  </b-container>
</template>

<script>
import { logout } from "@/api/user";
import { postPlan } from "@/api/plan";
import AppNotifyModal from "./AppNotifyModal.vue";
import { getNotreadNotifys } from "@/api/notify";

export default {
  name: "AppHeader",
  components: {
    AppNotifyModal,
  },
  created() {
    window.addEventListener("scroll", this.onScroll);
    getNotreadNotifys(
      (res) => {
        if (res.data > 0) {
          this.notread = true;
        }
      },
      () => {}
    );
  },
  data() {
    return {
      notread: false,
      defaultProfileImg: require("../../assets/no_profile.png"),
      prevScrollpos: 0,
      currentScrollPos: 0,
    };
  },
  methods: {
    onCreatePlan() {
      postPlan(
        (res) => {
          this.$router.push("/editplan/" + res.data.planId);
        },
        () => alert("플랜 생성에 실패했습니다.\n다시 시도해주세요.")
      );
    },
    onScroll() {
      this.currentScrollPos = window.pageYOffset;
      if (this.prevScrollpos > this.currentScrollPos) {
        if (this.$refs.AppHeader) this.$refs.AppHeader.style.top = "0";
        else document.querySelector("#AppHeader").style.top = "0";
      } else {
        if (this.$refs.AppHeader) this.$refs.AppHeader.style.top = "-80px";
        else document.querySelector("#AppHeader").style.top = "-80px";
      }
      this.prevScrollpos = this.currentScrollPos;
    },
    onCollapse() {
      if (this.$refs.navicon.style.display == "none") this.$refs.navicon.style.display = "block";
      else this.$refs.navicon.style.display = "none";
    },
    onRouting(e) {
      this.$emit("on-routing", e.target.target);
    },
    onLogout() {
      logout(
        () => {
          this.$store.commit("resetState");
          this.$router.push("/");
        },
        () => {
          alert("에러가 발생했습니다.");
        }
      );
    },
  },
};
</script>

<style scoped>
.small-badge {
  width: 5px;
  height: 5px;
  margin-bottom: 15px !important;
  margin-left: -2.5px;
}

.container-fluid {
  transition: top 0.3s ease-in-out;
}

@font-face {
  font-family: "Tenada";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-2@1.0/Tenada.woff2")
    format("woff2");
  font-weight: normal;
  font-style: normal;
}
/* Color Theme Swatches in RGBA */
.primary-dark {
  color: rgba(2, 87, 140, 1) !important;
}
.primary-standard {
  color: rgba(3, 149, 165, 1) !important;
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

li {
  text-align: left;
}

#logo {
  font-family: "Tenada";
  font-size: x-large;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: auto;
  letter-spacing: -0.8px;
}

.bold-icon {
  stroke: #2c3e50;
  stroke-width: 0.3px;
}

.navbar-icon {
  width: 40px;
}

.dropdown-item:hover {
  color: rgba(3, 191, 172, 1) !important;
}

:focus {
  border: none !important;
}

button > li {
  transition: all 0.2s ease-in-out;
}
</style>
