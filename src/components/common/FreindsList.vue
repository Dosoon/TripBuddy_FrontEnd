<template>
  <div class="h-95" style="overflow-y: scroll; overflow-x: hidden">
    <friends-list-item
      v-for="friend in friendsList"
      :key="friend.userId"
      :friend="friend"
      :type-prop="'invite'"
    />
  </div>
</template>

<script>
import FriendsListItem from "./FriendsListItem.vue";
export default {
  components: { FriendsListItem },
  props: {
    friendsList: {
      type: Array,
    },
  },
  name: "FriendsList",
  created() {},
};
</script>

<style scoped>
.h-95 {
  max-height: 95% !important;
}
</style>
