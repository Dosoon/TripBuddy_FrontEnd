<template>
  <div v-if="type == 'min'" align="right" style="margin-top: 15%">
    <span
      style="
        color: #aaaaaa;
        font-family: 'NanumSquareNeo-Thin';
        font-size: 8pt;
        vertical-align: middle;
      "
      @click="onCopyUrl"
    >
      tripbuddy.io/triplog/{{ $route.params.id }}
      <span style="font-size: 12pt; vertical-align: middle"><b-icon-link45deg /></span>
    </span>
    <div class="w-100 h-25" id="profile-container">
      <div class="row justify-content-center">
        <b-img
          v-if="loaded"
          class="w-25"
          style="margin-top: -15%"
          :src="userinfo.profileImg || defaultProfileImg"
          rounded="circle"
        ></b-img>
      </div>
      <div class="row justify-content-center mt-3 mb-1">
        <h2 class="d-inline-block primary-standard mb-0">
          {{ username }}
        </h2>
        <b-icon-pencil
          class="mt-auto mb-2 ml-2"
          @click="moveToMyPage"
          v-if="$store.getters['id'] == $route.params.id"
        />
      </div>
      <div class="row justify-content-center">
        <user-follow-info v-if="loaded" :userId="userinfo.userId" />
      </div>
    </div>
  </div>
  <div v-else class="w-70 h-25" id="profile-container">
    <div class="row">
      <div class="col-5 col-sm-4 col-md-4">
        <div class="d-lg-block d-xl-none d-xxl-none d-md-block d-sm-block d-block">
          <b-img
            class="w-75"
            :src="userinfo.profileImg || defaultProfileImg"
            rounded="circle"
          ></b-img>
        </div>
        <div class="d-none d-xl-block">
          <b-img
            class="w-100"
            :src="$store.getters['profileImg'] || defaultProfileImg"
            rounded="circle"
          ></b-img>
        </div>
      </div>
      <div class="col-7 col-sm-8 col-md-8" align="left">
        <div id="profile-title" align="left">
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Smiling%20Face%20with%20Smiling%20Eyes.png"
            alt="Smiling Face with Smiling Eyes"
            width="48"
            height="48"
            style="margin: 0 4px 8px 0"
          />
          <h2 class="d-inline-block primary-standard">{{ $store.getters["name"] }}</h2>
          <h4
            class="d-none d-sm-none d-md-none d-lg-inline-block d-xl-inline-block d-xxl-inline-block thin-title"
            style="display: inline-block"
          >
            님, 다시 만나 기뻐요 :)
          </h4>
        </div>
        <hr style="margin: 0 0 10px 0" />
        <user-follow-info />
        <button
          class="d-none d-lg-inline-block btn btn-secondary"
          id="btn-edit-profile"
          @click="moveToMyPage"
        >
          프로필 편집
        </button>
        <main-recent-notifys class="d-none d-lg-inline-block" />
      </div>
    </div>
  </div>
</template>

<script>
import UserFollowInfo from "@/components/common/UserFollowInfo.vue";
import MainRecentNotifys from "@/components/main/MainRecentNotifys.vue";
import { getUserInfo } from "@/api/user";

export default {
  name: "UserProfile",
  props: ["imgSrcProp", "type"],
  components: {
    UserFollowInfo,
    MainRecentNotifys,
  },
  data() {
    return {
      defaultProfileImg: require("../../assets/no_profile.png"),
      userinfo: null,
      username: null,
      loaded: false,
      imgSrc: "https://i.pinimg.com/236x/cb/24/f1/cb24f1478772b27702ff45e5490b6b6f.jpg",
    };
  },
  created() {
    if (this.$route.params.id != null && this.$route.params.id != this.$store.getters["id"]) {
      getUserInfo(
        this.$route.params.id,
        (res) => {
          this.userinfo = res.data;
          this.username = res.data.name;
          this.loaded = true;
        },
        () => {}
      );
    } else {
      this.username = this.$store.getters["name"];
      this.userinfo = {};
      this.userinfo["profileImg"] = this.$store.getters["profileImg"];
      this.loaded = true;
    }
    if (this.imgSrcProp) this.imgSrc = this.imgSrcProp;
  },
  methods: {
    moveToMyPage() {
      this.$router.push("/mypage");
    },
    onCopyUrl() {
      this.$copyText(`tripbuddy.io/triplog/${this.$route.params.id}`).then(() => {
        alert("트립로그 URL을 복사했습니다.\n친구에게 공유해보세요!");
      });
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: "NanumSquareNeo-ExtraBold";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2")
    format("woff2");
  font-weight: 800;
  font-style: normal;
}

@font-face {
  font-family: "NanumSquareNeo-Normal";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2")
    format("woff2");
  font-weight: 550;
  font-style: normal;
}

#profile-container {
  font-family: "NanumSquareNeo-ExtraBold";
  border: 1px rgba(0, 0, 0, 0.13) solid;
  border-radius: 20px;
  padding: 25px;
  letter-spacing: -1px;
}

#profile-title {
  color: rgba(33, 33, 53, 0.6);
}

.thin-title {
  font-family: "NanumSquareNeo-Normal";
}

#btn-edit-profile {
  font-family: "NanumSquareNeo-Thin";
  border-radius: 13px;
  padding: 10px;
  margin-left: 10px;
  background-color: rgba(33, 33, 53, 0.4);
  border: 1px solid rgba(33, 33, 53, 0.05);
}

.w-70 {
  width: 70% !important;
}
</style>
