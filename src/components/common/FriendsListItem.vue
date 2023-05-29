<template>
  <div id="friends-list-item-container" class="p-3 row justify-content-between">
    <profile-img-with-name
      v-if="friend.followeeProfileImg"
      :img-src="friend.followeeProfileImg"
      :user-name="friend.followeeName"
      :type="'lg'"
    />
    <profile-img-with-name v-else :user-name="friend.followeeName" :type="'lg'" />
    <div class="d-flex mr-3" v-if="typeProp == 'invite'">
      <input
        class="invitefriends"
        type="checkbox"
        name="invited"
        color="primary"
        :value="friend.followeeId"
        style="width: 20px"
      />
      <div class="d-flex justify-content-center align-content-center flex-column m-2">초대</div>
    </div>
  </div>
</template>

<script>
import ProfileImgWithName from "./ProfileImgWithName.vue";

export default {
  name: "FriendsListItem",
  props: ["friend", "typeProp"],
  components: {
    ProfileImgWithName,
  },
  mounted() {},
};

ProfileImgWithName;
</script>

<style scoped>
#friends-list-item-container {
  border: 1px solid rgba(33, 33, 53, 0.05);
  text-align: left;
}
</style>
