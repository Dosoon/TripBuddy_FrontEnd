<template>
  <div>
    <b-carousel
      id="carousel-1"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333"
    >
      <!-- Text slides with image -->

      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=52"></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54"> </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
    </b-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
#carousel-1 {
  width: 100%;
  max-height: 70vh;
  overflow: hidden;
}
b-carousel-slide {
  width: 100%;
  max-height: 70vh;
  object-fit: cover;
}
</style>
