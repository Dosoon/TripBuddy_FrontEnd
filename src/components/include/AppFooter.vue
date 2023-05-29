<template>
  <footer class="text-muted text-center text-lg-start w-100 footer-container">
    <!-- Grid container -->
    <div class="container p-4 pt-3">
      <!--Grid row-->
      <div class="row justify-content-start text-left align-items-center m-4">
        <div id="logo" :to="'/'" href="#" class="p-3 me-5 text-secondary">TripBuddy</div>
        <div class="ml-5">
          <span class="m-0">개인정보처리방침 | 이용약관</span>
          <p class="m-0 mt-1" style="font-size: 10pt; line-height: 130%">
            본 사이트의 콘텐츠는 저작권법의 보호를 받는 바 무단 전재, 복사, 배포 등을 금합니다.<br />
            Copyright © TripBuddy All Rights Reserved.
          </p>
        </div>
      </div>
      <!--Grid row-->
    </div>
    <!-- Grid container -->
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
#logo {
  font-family: "Tenada";
  font-size: x-large;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: auto;
  letter-spacing: -0.8px;
}

.footer-container {
  background-color: #efefef;
}
</style>
