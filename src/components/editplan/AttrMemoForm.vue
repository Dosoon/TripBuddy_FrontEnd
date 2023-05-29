<template>
  <div>
    <b-input-group>
      <b-form-input
        type="text"
        placeholder="메모를 입력하세요"
        v-model="memo"
        @keyup.enter="onSaveMemo"
      ></b-form-input>

      <b-input-group-append>
        <b-button variant="outline-primary" @click="onSaveMemo">저장</b-button>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      planId: this.$route.params.planid,
      memo: null,
    };
  },
  methods: {
    onSaveMemo() {
      this.$emit("on-save-memo", this.memo);
      //   alert(this.planId + ", memo is --> " + this.memo);
    },
    resetMemo() {
      this.memo = null;
    },
  },
};
</script>

<style></style>
