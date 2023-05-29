<template>
  <div id="chat-list-container" class="p-2">
    <plan-chat-list-item v-for="c in chatlist" :chat="c" :key="c.idx" />
  </div>
</template>

<script>
import PlanChatListItem from "./PlanChatListItem.vue";
export default {
  methods: {
    addChat(data) {
      this.chatlist.unshift(data);
    },
  },
  data() {
    return {
      chatlist: [],
    };
  },
  components: { PlanChatListItem },
};
</script>

<style>
#chat-list-container {
  width: 100%;
  height: 400px;
  border-top: 1px solid rgba(33, 33, 53, 0.4);
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
