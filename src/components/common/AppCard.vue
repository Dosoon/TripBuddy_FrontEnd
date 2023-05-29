<template>
  <div class="col-12 col-xl-4 col-lg-5 col-md-6 col-sm-12 mb-5">
    <router-link
      :to="{
        name: 'appreviewdetail',
        params: { fromApp: fromApp, reviewId: reviewId },
        query: this.$route.query,
      }"
    >
      <b-card no-body class="m-auto" style="width: 18rem; height: 28rem">
        <b-card-img
          v-if="this.thumbnail != null"
          :src="thumbnail"
          alt="Image"
          style="height: 14rem"
          top
        ></b-card-img>
        <b-card-img
          v-else
          src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
          alt="Image"
          style="height: 14rem"
          top
        ></b-card-img>

        <b-card-body
          class="d-flex flex-column justify-content-between text-left p-3"
          style="height: 14rem; overflow: hidden"
        >
          <b-card-title class="m-0" style="max-height: 1.5rem">{{ subject }}</b-card-title>
          <app-rating :rating="rating"></app-rating>
          <b-card-text
            style="
              max-height: 6.5rem;
              word-break: break-all;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: normal;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            "
          >
            {{ getContent(content) }}</b-card-text
          >
          <span style="display: flex; align-items: center; margin-left: auto">
            <b-icon-person-fill class="mr-2" /> {{ userName }}
            <!-- <profile-img-with-name :size="'sm'" :userName="userName" /> -->
          </span>
        </b-card-body>
      </b-card>
    </router-link>
  </div>
</template>

<script>
import AppRating from "@/components/common/AppRating.vue";
// import ProfileImgWithName from "@/components/common/ProfileImgWithName.vue";
export default {
  name: "AppCard",
  components: { AppRating },
  data() {
    return {};
  },

  props: {
    fromApp: String,
    reviewId: Number,
    subject: String,
    content: String,
    userId: Number,
    userName: String,
    registTime: String,
    planId: Number,
    rating: Number,
    thumbnail: String,
  },
  created() {},
  methods: {
    getContent(content) {
      let span = document.createElement("span");
      span.innerHTML = content;
      return span.textContent || span.innerText;
    },
  },
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
