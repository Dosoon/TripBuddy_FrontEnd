<template>
  <div id="main-carousel">
    <b-carousel
      id="carousel-fade"
      style="text-shadow: 0px 0px 2px #000"
      fade
      indicators
      img-width="1024"
      img-height="480"
    >
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block rounded-slide"
            src="https://images.chosun.com/resizer/69C7uY8RR6LgatIC9wTCp3sEWVY=/1128x759/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/CU422HY2YJHS7JQ3REJ24E4H64.PNG"
        /></template>
      </b-carousel-slide>
      <b-carousel-slide>
        <template v-slot:img>
          <img class="d-block rounded-slide" src="https://picsum.photos/1024/480/?image=12" />
        </template>
      </b-carousel-slide>
      <b-carousel-slide>
        <template v-slot:img>
          <img class="d-block rounded-slide" src="https://picsum.photos/1024/480/?image=22" />
        </template>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: "MainCarousel",
};
</script>

<style>
#carousel-fade {
  width: 100%;
  max-height: 40%;
  overflow: hidden;
}

.rounded-slide {
  border-radius: 20px !important;
  width: 100%;
  height: 40vh;
  object-fit: cover;
}
</style>
