<template>
  <b-list-group-item @click="onItemClick" @mouseover="onHover" @mouseleave="onHoverOut">
    <div id="plan-container">
      <div class="row justify-content-around">
        <div class="col-3" style="padding: 0" align="center">
          <b-img
            :src="
              plan.thumbnail != null ? plan.thumbnail : 'https://monchouchou-kr.com/img/no_img.jpg'
            "
            width="50"
            height="50"
            rounded
            style="border: 1px rgba(0, 0, 0, 0.35) solid"
          />
        </div>
        <div class="col-7" style="padding: 0; overflow: hidden" align="left">
          <h6
            style="
              word-break: keep-all;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              margin-top: 4px;
            "
          >
            {{ plan.title }}
          </h6>
          <p>{{ plan.lastModified }}</p>
        </div>
        <div class="col-1" style="padding: 0; vertical-align: bottom; font-size: smaller">
          <b-icon-triangle-fill
            animation="cylon"
            :rotate="90"
            class="small mt-3"
            ref="animTarget"
          />
        </div>
      </div>
    </div>
  </b-list-group-item>
</template>

<script>
export default {
  name: "MainRecentPlantItem",
  props: ["plan"],
  data() {
    return {
      title: "여행 계획",
      modifiedTime: "2023-05-17 15:16:38",
      imgSrc: "https://blog.kakaocdn.net/dn/o1KIw/btqu9mflPY6/rGk1mM3iugV1c6jj9Z3E80/img.jpg",
    };
  },
  methods: {
    onHover() {
      this.$refs.animTarget.setAttribute("animation", "cylon");
    },
    onHoverOut() {
      this.$refs.animTarget.setAttribute("animation", "");
    },
    onItemClick() {
      this.$router.push("/editplan/" + this.plan.planId);
    },
  },
};
</script>

<style scoped>
#plan-container {
  padding: 15px;
  transition: all ease-in-out 0.2s;
  color: rgba(0, 0, 0, 0.7);
}

#plan-container:hover {
  background-color: rgba(3, 149, 165, 1) !important;
  color: white;
  transition: all ease-in-out 0.2s;
}

p {
  font-size: x-small;
  margin: 0;
}
</style>
