<template>
  <span v-if="userInfo.userId != this.followeeId">
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
  </span>
</template>

<script>
import { isReviewFollowing, followUser, unfollowUser } from "@/api/follow";
import { mapGetters } from "vuex";
export default {
  name: "ReviewFollowToggle",
  components: {},
  data() {
    return {
      followCheck: false,
    };
  },
  props: {
    followeeNameProp: String,
    followeeIdProp: Number,
  },
  created() {
    let param = this.$route.params.reviewId;
    isReviewFollowing(
      param,
      ({ data }) => {
        this.followCheck = data;
      },
      () => {}
    );
  },

  methods: {
    followUserImpl() {
      let params = {
        followeeId: this.followeeId,
      };
      followUser(
        params,
        () => {
          this.followCheck = true;
        },
        () => {}
      );
    },

    unfollowUserImpl() {
      unfollowUser(
        this.followeeId,
        () => {
          this.followCheck = false;
        },
        () => {}
      );
    },
  },
  computed: {
    ...mapGetters([
      "userInfo", // index js 에 정의된 이름.
    ]),

    followeeId() {
      return this.followeeIdProp;
    },
    followeeName() {
      return this.followeeNameProp;
    },
  },
};
</script>

<style scoped></style>
