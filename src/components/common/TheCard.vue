<template>
  <div class="col-12 col-xl-4 col-lg-5 col-md-6 col-sm-12 mb-5">
    <router-link :to="'/review/detail'">
      <b-card no-body class="m-auto" style="width: 18rem; height: 28rem">
        <b-card-img
          v-if="true"
          src="https://placekitten.com/1000/600"
          alt="Image"
          style="height: 14rem"
          top
        ></b-card-img>
        <b-card-img
          v-else
          src="https://placekitten.com/1000/600"
          alt="Image"
          style="height: 14rem"
          top
        ></b-card-img>

        <b-card-body
          class="d-flex flex-column justify-content-between text-left p-3"
          style="height: 14rem; overflow: hidden"
        >
          <b-card-title class="m-0" style="max-height: 1.5rem">Card Title</b-card-title>
          <the-rating></the-rating>
          <b-card-text style="max-height: 6.5rem; text-overflow: ellipsis; word-break: break-all">
            Some quick example text to build on the card title and make up the bulk of the card's
            contentddddddddddddddddddddddddd.</b-card-text
          >
          <span style="display: flex; align-items: center; margin-left: auto">
            <profile-img-with-name :size="'sm'" />
          </span>
        </b-card-body>
      </b-card>
    </router-link>
  </div>
</template>

<script>
import TheRating from "@/components/common/TheRating.vue";
import ProfileImgWithName from "@/components/common/ProfileImgWithName.vue";
export default {
  name: "TheCard",
  components: { TheRating, ProfileImgWithName },
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped lang="scss">
::v-deep {
  a {
    color: rgba(0, 0, 0, 0.65);
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    -ms-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }
  a:hover {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.8);
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    -ms-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }
}
</style>
