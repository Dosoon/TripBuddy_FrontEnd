<template>
  <b-tr>
    <b-td>{{ computedNoticeId }}</b-td>
    <b-th class="text-left">
      <router-link
        :to="{
          name: 'appnoticedetail',
          params: { noticeId: computedNoticeId },
          query: { page: params.page, keyword: params.keyword, sort: params.sort },
        }"
        >{{ subject }}</router-link
      >
    </b-th>
    <b-td>{{ computedUserName }}</b-td>
    <b-td>{{ computedRegisterTime }}</b-td>
  </b-tr>
</template>

<script>
export default {
  name: "NoticeListItem",
  props: {
    noticeId: Number,
    userId: Number,
    userName: String,
    subject: String,
    content: String,
    registerTime: String,
    params: Object,
  },

  computed: {
    computedNoticeId() {
      return this.noticeId;
    },
    computedSubject() {
      return this.subject;
    },
    computedUserName() {
      return this.userName;
    },
    computedRegisterTime() {
      return this.registerTime;
    },
  },
};
</script>

<style scoped>
a,
a:hover {
  color: rgba(0, 0, 0, 0.7);
  text-decoration: none;
}
</style>
