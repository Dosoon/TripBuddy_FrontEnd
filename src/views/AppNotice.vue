<template>
  <b-container id="container-notice">
    <left-heading
      :titleProp="'공지사항'"
      :descProp="'원활한 사이트 이용을 위해 규칙을 확인해주세요.'"
      :emojiProp="'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Triangular%20Flag.png'"
    />
    <hr />
    <div class="row justify-content-between">
      <div class="col-4 col-lg-2">
        <b-form-select v-model="selected" :options="sortOptions" @change="onSortChange" />
      </div>
      <div class="col-4">
        <b-input-group>
          <b-form-input
            type="text"
            placeholder="검색어를 입력하세요"
            @keyup.enter="search"
            v-model="searchKeyword"
          ></b-form-input>

          <b-input-group-append>
            <b-button variant="outline-primary" @click="search">검색</b-button>
          </b-input-group-append>
        </b-input-group>
      </div>
    </div>
    <notice-list ref="noticelist" />
  </b-container>
</template>
<script>
import sal from "sal.js";
import NoticeList from "@/components/notice/NoticeList.vue";
import LeftHeading from "@/components/common/LeftHeading.vue";
export default {
  name: "AppNotice",
  components: { NoticeList, LeftHeading },
  data() {
    return {
      searchKeyword: null,
      selected: 1,
      sortOptions: [
        {
          text: "최신 등록순",
          value: 1,
        },
        {
          text: "오래된 순",
          value: 2,
        },
      ],
    };
  },
  created() {
    this.selected = this.$route.query.sort == "old" ? 2 : 1;
  },
  mounted() {
    sal();
  },
  methods: {
    search() {
      if (this.$route.query.keyword == this.searchKeyword) return;
      let params = {
        page: 1,
        keyword: this.searchKeyword,
        sort: "new",
      };
      this.$router.replace("/notices?page=1&sort=new&keyword=" + this.searchKeyword);
      this.$refs.noticelist.reqSearch(params);
    },
    onSortChange() {
      let sort = "new";
      if (this.selected == 1) sort = "new";
      else if (this.selected == 2) sort = "old";
      this.$router.replace("/notices?page=1&sort=" + sort);
      let params = {
        page: 1,
        sort: sort,
      };
      this.$refs.noticelist.reqSearch(params);
    },
  },
};
</script>
<style scoped></style>
