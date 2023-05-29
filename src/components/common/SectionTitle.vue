<template>
  <div>
    <hr class="d-inline-block w-25" style="vertical-align: middle" />
    <h4 class="d-inline-block">{{ titleProp }}</h4>
    <hr class="d-inline-block w-25" style="vertical-align: middle" />
  </div>
</template>

<script>
export default { name: "SectionTitle", props: ["titleProp"] };
</script>

<style scoped>
@font-face {
  font-family: "NanumSquareNeo-Variable";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2")
    format("woff2");
  font-weight: 800;
  font-style: normal;
}

h4 {
  font-family: "NanumSquareNeo-Variable";
  margin: 0px 50px;
  color: rgba(0, 0, 0, 0.7);
}

hr {
  border-width: 1px;
  box-shadow: rgba(0, 0, 0, 0.07) 0 0 5px;
}
</style>
