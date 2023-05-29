<template>
  <div class="d-inline-block">
    <div id="follow-container" class="d-inline-block">
      <div class="d-inline-block inner-container-left"><strong>팔로잉</strong></div>
      <div class="d-inline-block inner-container-right">{{ following }}</div>
      <div class="d-none d-md-inline-block">|</div>
      <br class="d-none d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none" />
      <div class="d-inline-block inner-container-left">
        <strong>팔로워</strong>
      </div>
      <div class="d-inline-block inner-container-right">{{ follower }}</div>
    </div>
    <div
      class="text-center mt-2"
      v-if="$route.params.id != null && $route.params.id != $store.getters['id']"
    >
      <b-button
        v-if="this.followCheck"
        variant="outline-danger"
        class="p-1 b-rad"
        style="font-size: small"
        @click="unfollowUserImpl()"
        id="review-btn-follow"
        value="true"
        >언팔로우 <b-icon icon="person-dash-fill"></b-icon
      ></b-button>
      <b-button
        v-else
        variant="outline-primary"
        class="p-1 b-rad"
        style="font-size: small"
        @click="followUserImpl()"
        id="review-btn-follow"
        value="false"
        >팔로우 <b-icon icon="person-plus-fill"></b-icon
      ></b-button>
    </div>
  </div>
</template>

<script>
import { followInfo, isFollowing, followUser, unfollowUser } from "@/api/follow";

export default {
  data() {
    return {
      follower: 0,
      following: 0,
      followCheck: false,
    };
  },
  props: {
    userId: Number,
  },
  created() {
    if (this.$route.params.id == null || this.$route.params.id == this.$store.getters["id"]) {
      followInfo(
        this.$store.getters["userId"],
        (data) => {
          this.follower = data.data.follower;
          this.following = data.data.following;
        },
        () => {
          alert("유저 데이터 수신 중 에러가 발생했습니다.");
        }
      );
    } else {
      followInfo(
        this.userId,
        (data) => {
          this.follower = data.data.follower;
          this.following = data.data.following;
        },
        () => {
          alert("유저 데이터 수신 중 에러가 발생했습니다.");
        }
      );

      isFollowing(
        this.userId,
        (res) => {
          if (res.data > 0) this.followCheck = true;
          else this.followCheck = false;
        },
        () => {}
      );
    }
  },
  methods: {
    unfollowUserImpl() {
      unfollowUser(
        this.userId,
        () => {
          this.followCheck = false;
          this.update();
        },
        () => {}
      );
    },

    followUserImpl() {
      let params = {
        followeeId: this.userId,
      };
      followUser(
        params,
        () => {
          this.followCheck = true;
          this.update();
        },
        () => {}
      );
    },
    update() {
      followInfo(
        this.userId,
        (data) => {
          this.follower = data.data.follower;
          this.following = data.data.following;
        },
        () => {
          alert("유저 데이터 수신 중 에러가 발생했습니다.");
        }
      );
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: "NanumSquareNeo-Thin";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2")
    format("woff2");
  font-weight: 300;
  font-style: normal;
}

#follow-container {
  font-family: "NanumSquareNeo-Thin";
  border: 1px rgba(0, 0, 0, 0.13) solid;
  border-radius: 15px;
  letter-spacing: -1.5px;
  padding: 10px;
}

.inner-container-left {
  margin-left: 15px;
  margin-right: 15px;
}

.inner-container-right {
  margin-right: 15px;
}
</style>
