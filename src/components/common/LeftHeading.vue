<template>
  <div align="left">
    <div class="row">
      <div class="col-2 col-lg-1 d-flex flex-wrap align-items-center">
        <img class="m-auto d-block" :src="emoji" width="70px" style="vertical-align: middle" />
      </div>
      <div class="col-10 col-lg-11">
        <div class="row">
          <h1 style="vertical-align: middle">{{ title }}</h1>
        </div>
        <div class="row" style="padding-left: 5px; margin-top: -20px">
          <p v-html="descProp"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftHeading",
  props: ["emojiProp", "titleProp", "descProp"],
  data() {
    return {
      emoji: "https://em-content.zobj.net/thumbs/120/apple/354/sparkles_2728.png",
      title: "왼쪽 정렬 헤딩",
    };
  },
  created() {
    if (this.emojiProp) this.emoji = this.emojiProp;
    this.title = this.titleProp;
  },
};
</script>

<style scoped>
@font-face {
  font-family: "NanumSquareNeo-Variable";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2")
    format("woff2");
  font-weight: 800;
  font-style: normal;
}

h1 {
  font-family: "NanumSquareNeo-Variable";
  text-align: left;
  letter-spacing: -0.4vh;
  margin: 20px 0px;
  color: rgba(0, 0, 0, 0.9);
}
</style>
