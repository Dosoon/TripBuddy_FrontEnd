<template>
  <div class="d-flex flex-row flex-wrap">
    <app-card
      data-sal="slide-up"
      data-sal-duration="500"
      data-sal-delay="100"
      data-sal-easing="ease-in-out"
    ></app-card>
  </div>
</template>

<script>
import AppCard from "@/components/common/AppCard.vue";

export default {
  name: "ReviewMain",
  components: { AppCard },
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
