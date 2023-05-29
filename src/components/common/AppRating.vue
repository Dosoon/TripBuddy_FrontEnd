<template>
  <span class="text-warning">
    <span v-if="computedRating == 0" class="review-star"
      ><small> <b-icon-star /><b-icon-star /><b-icon-star /><b-icon-star /><b-icon-star /> </small
    ></span>
    <span v-if="computedRating > 0 && computedRating < 0.75" class="review-star"
      ><small>
        <b-icon-star-half /><b-icon-star /><b-icon-star /><b-icon-star /><b-icon-star /></small
    ></span>
    <span v-if="computedRating >= 0.75 && computedRating < 1.25" class="review-star"
      ><small>
        <b-icon-star-fill /><b-icon-star /><b-icon-star /><b-icon-star /><b-icon-star /> </small
    ></span>
    <span v-if="computedRating >= 1.25 && computedRating < 1.75" class="review-star"
      ><small>
        <b-icon-star-fill /><b-icon-star-half /><b-icon-star /><b-icon-star /><b-icon-star /> </small
    ></span>
    <span v-if="computedRating >= 1.75 && computedRating < 2.25" class="review-star"
      ><small>
        <b-icon-star-fill />
        <b-icon-star-fill /><b-icon-star /><b-icon-star /><b-icon-star /> </small
    ></span>
    <span v-if="computedRating >= 2.25 && computedRating < 2.75" class="review-star"
      ><small>
        <b-icon-star-fill /><b-icon-star-fill /><b-icon-star-half /><b-icon-star /><b-icon-star /> </small
    ></span>

    <span v-if="computedRating >= 2.75 && computedRating < 3.25" class="review-star"
      ><small>
        <b-icon-star-fill />
        <b-icon-star-fill /><b-icon-star-fill /><b-icon-star /><b-icon-star /> </small
    ></span>
    <span v-if="computedRating >= 3.25 && computedRating < 3.75" class="review-star"
      ><small>
        <b-icon-star-fill /><b-icon-star-fill /><b-icon-star-fill /><b-icon-star-half /><b-icon-star /> </small
    ></span>

    <span v-if="computedRating >= 3.75 && computedRating < 4.25" class="review-star"
      ><small>
        <b-icon-star-fill /><b-icon-star-fill /><b-icon-star-fill /><b-icon-star-fill /><b-icon-star /> </small
    ></span>
    <span v-if="computedRating >= 4.25 && computedRating < 5" class="review-star"
      ><small>
        <b-icon-star-fill /><b-icon-star-fill /><b-icon-star-fill /><b-icon-star-fill /><b-icon-star-half /> </small
    ></span>
    <span v-if="computedRating == 5" class="review-star"
      ><small>
        <b-icon-star-fill /><b-icon-star-fill /><b-icon-star-fill /><b-icon-star-fill /><b-icon-star-fill /> </small
    ></span>
  </span>
</template>

<script>
export default {
  name: "AppRating",
  components: {},
  data() {
    return {};
  },
  props: {
    rating: Number,
  },
  created() {},
  computed: {
    computedRating() {
      return this.rating;
    },
  },
  methods: {},
};
</script>

<style scoped></style>
