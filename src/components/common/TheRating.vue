<template>
  <span>
    <span v-if="rating >= 0 && rating < 0.5" class="review-star"><small> ☆☆☆☆☆ </small></span>
    <span v-if="rating >= 0.5 && rating < 1.5" class="review-star"><small> ★☆☆☆☆ </small></span>
    <span v-if="rating >= 1.5 && rating < 2.5" class="review-star"><small> ★★☆☆☆ </small></span>
    <span v-if="rating >= 2.5 && rating < 3.5" class="review-star"><small> ★★★☆☆ </small></span>
    <span v-if="rating >= 3.5 && rating < 4.5" class="review-star"><small> ★★★★☆ </small></span>
    <span v-if="rating >= 4.5 && rating <= 5.0" class="review-star"><small> ★★★★★ </small></span>
  </span>
</template>

<script>
export default {
  name: "TheRating",
  components: {},
  data() {
    return {
      rating: 4,
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
