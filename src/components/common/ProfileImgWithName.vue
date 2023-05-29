<template>
  <div class="outer d-inline-block">
    <b-avatar v-if="computedImgSrc" :src="computedImgSrc" :size="size"></b-avatar>
    <b-avatar v-else :size="computedSize">
      <span v-if="computedSize == 'lg'"> {{ computedUserName }}</span>
      <span v-else-if="computedSize == 'md'" style="font-size: 10pt"> {{ computedUserName }} </span>
      <span v-else style="font-size: 8pt"> {{ computedUserName }}</span>
    </b-avatar>
    <div v-if="computedType == 'lg'" class="d-inline-block m-3" style="font-size: 13pt">
      {{ computedUserName }}
    </div>
    <div v-else class="d-inline-block m-1" style="font-size: 12pt">{{ computedUserName }}</div>
  </div>
</template>

<script>
export default {
  props: {
    type: { type: String, default: "sm" },
    imgSrc: { type: String },
    userName: { type: String, default: "유저" },
    size: { type: String, default: "4.5rem" },
  },
  computed: {
    computedType() {
      return this.type;
    },
    computedImgSrc() {
      return this.imgSrc;
    },
    computedUserName() {
      return this.userName;
    },
    computedSize() {
      return this.size;
    },
  },
};
</script>

<style>
.outer {
  margin: 5px;
  text-align: left;
}
</style>
