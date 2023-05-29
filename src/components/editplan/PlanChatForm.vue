<template>
  <div id="chat-form-container" class="p-2 d-flex justify-content-around">
    <b-input-group class="mt-2">
      <b-form-input
        type="text"
        v-model="curMsg"
        placeholder="채팅을 입력하세요"
        @click="focus"
        @keyup.enter="onChatSubmit"
        style="z-index: 99999999999999"
        ref="chatInputForm"
      ></b-form-input>
      <b-input-group-append>
        <b-button variant="info" class="btn-primary-dark" @click="onChatSubmit">전송</b-button>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
export default {
  name: "PlanChatForm",
  data() {
    return {
      curMsg: "",
    };
  },
  methods: {
    focus() {
      this.$refs.chatInputForm.focus();
    },
    onChatSubmit() {
      if (this.curMsg == "" || this.curMsg == null) return;
      this.$emit("send-chat", this.curMsg);
      this.curMsg = null;
    },
  },
};
</script>

<style>
#chat-form-container {
  border-top: 1px solid rgba(33, 33, 53, 0.4);
}

.btn-primary-dark {
  background-color: rgba(2, 87, 140, 1) !important;
  border-color: rgba(2, 87, 140, 1) !important;
}

.btn-primary-dark:hover {
  background-color: rgb(2, 58, 94) !important;
}
</style>
