<template>
  <div
    v-if="this.computedSize == 'lg'"
    class="card shadow"
    id="main-hotplace-card-lg"
    @mouseover="onHover"
    @mouseleave="onHoverOut"
    @click="movePage"
  >
    <img
      :src="
        this.computedImgSrcProp ||
        'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'
      "
      ref="bgimg"
    />
    <div
      class="card-img-overlay text-light justify-content-between flex-column d-flex w-100 h-100 m-0 p-3"
      id="card-desc"
    >
      <div>
        <h3 class="card-title">{{ this.computedTitleProp }}</h3>
        <p
          class="card-text"
          style="
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: normal;
            display: -webkit-box;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
          "
          v-html="this.computedDescProp"
        ></p>
      </div>
      <div align="right" style="margin-right: -2px">
        <h4 class="m-auto d-inline-block">&nbsp;</h4>
        <h4
          style="display: inline-block; stroke: white; stroke-width: 0.5px; vertical-align: middle"
        >
          <b-icon-arrow-right type="dark"></b-icon-arrow-right>
        </h4>
      </div>
    </div>
  </div>
  <div
    v-else
    class="card shadow"
    id="main-hotplace-card"
    @mouseover="onHover"
    @mouseleave="onHoverOut"
  >
    <img :src="this.computedImgSrcProp" ref="bgimg" />
    <div
      class="card-img-overlay text-light justify-content-between flex-column d-flex w-100 h-100 m-0 p-3"
      id="card-desc"
    >
      <div>
        <h3 class="card-title">{{ this.computedTitleProp }}</h3>
        <p class="card-text" v-html="this.computedDescProp"></p>
      </div>
      <div align="right" style="margin-right: -2px">
        <h4 class="m-auto d-inline-block">떠나기&nbsp;</h4>
        <h4
          style="display: inline-block; stroke: white; stroke-width: 0.5px; vertical-align: middle"
        >
          <b-icon-arrow-right type="dark"></b-icon-arrow-right>
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainReview",
  props: ["imgSrcProp", "titleProp", "descProp", "size", "reviewId"],
  methods: {
    onHover() {
      this.$refs.bgimg.style["-webkit-filter"] = "brightness(0.8) blur(2px)";
      this.$refs.bgimg.style["transform"] = "scale(1.05)";
    },
    onHoverOut() {
      this.$refs.bgimg.style["-webkit-filter"] = "";
      this.$refs.bgimg.style["transform"] = "";
    },
    movePage() {
      this.$router.push(`/reviews/${this.reviewId}/reviews`);
    },
  },

  computed: {
    computedImgSrcProp() {
      return this.imgSrcProp;
    },
    computedTitleProp() {
      return this.titleProp;
    },
    computedDescProp() {
      return this.descProp;
    },
    computedSize() {
      return this.size;
    },
  },
};
</script>

<style scoped>
.card-img-overlay {
  text-align: left;
}

h3 {
  font-weight: bolder;
  text-shadow: rgba(0, 0, 0, 0.5) 0 0 8px;
}

h3,
h6,
p {
  text-align: left;
  text-shadow: rgba(0, 0, 0, 0.5) 0 0 8px;
}

p {
  line-height: 110%;
}

img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
#main-hotplace-card {
  display: inline-block;
  overflow: hidden;
  width: 180px;
  height: 280px;
}
#main-hotplace-card-lg {
  display: inline-block;
  overflow: hidden;
  width: 230px;
  height: 300px;
}
div {
  margin: 10px;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
div#main-hotplace-card:hover {
  transform: scale(1.02);
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
</style>
