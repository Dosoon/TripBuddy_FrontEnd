<template>
  <div>
    <b-row
      class="notice mt-4"
      data-sal="slide-up"
      data-sal-duration="500"
      data-sal-delay="100"
      data-sal-easing="ease-in-out"
    >
      <b-table-simple
        hover
        responsive
        style="border-bottom: 1px solid gray; border-top: 1px solid gray"
      >
        <b-thead>
          <b-tr>
            <b-th>글번호</b-th>
            <b-th>제목</b-th>
            <b-th>작성자</b-th>
            <b-th>작성일</b-th>
          </b-tr>
        </b-thead>
        <tbody class="table-group-divider">
          <!-- 하위 component인 notice 데이터 전달(props) -->
          <notice-list-item
            v-for="notice in notices"
            :key="notice.noticeid"
            v-bind="notice"
            :params="getParams()"
          />
        </tbody>
      </b-table-simple>
    </b-row>

    <div class="row justify-content-end mt-3">
      <div v-if="userInfo.admin === true">
        <b-row class="mb-1">
          <b-button
            style="font-size: small"
            size="sm"
            variant="outline-primary"
            @click="moveRegister()"
            >공지등록
            <b-icon-clipboard-plus />
          </b-button>
        </b-row>
      </div>
    </div>
    <div
      class="row justify-content-center"
      data-sal="slide-up"
      data-sal-duration="500"
      data-sal-delay="200"
      data-sal-easing="ease-in-out"
    >
      <notice-pagination @update-list="onPage" ref="pagination"></notice-pagination>
    </div>
  </div>
</template>

<script>
import NoticeListItem from "@/components/notice/item/NoticeListItem";
import NoticePagination from "@/components/notice/item/NoticePagination";
import { getNotices } from "@/api/notice";
import { mapGetters } from "vuex";

export default {
  name: "NoticeList",
  components: {
    NoticeListItem,
    NoticePagination,
  },
  data() {
    return {
      userId: -1,
      notices: [],
      page: 1,
      keyword: null,
    };
  },

  computed: {
    ...mapGetters([
      "userInfo", // index js 에 정의된 이름.
    ]),
  },

  created() {
    if (this.$route.query.page) this.page = this.$route.query.page;
    if (this.$route.query.sort) this.sort = this.$route.query.sort;
    if (this.$route.query.keyword) this.keyword = this.$route.query.keyword;

    let params = {
      page: this.page,
      sort: this.sort,
    };
    if (this.$route.query.keyword) params["keyword"] = this.$route.query.keyword;

    getNotices(
      params,
      ({ data }) => {
        this.notices = data;
      },
      () => {}
    );
  },
  methods: {
    getParams() {
      let params = {};
      if (this.$route.query.page) params["page"] = this.$route.query.page;
      if (this.$route.query.sort) params["sort"] = this.$route.query.sort;
      if (this.$route.query.keyword) params["keyword"] = this.$route.query.keyword;
      return params;
    },
    moveRegister() {
      this.$router.replace({
        name: "appnoticeregister",
        params: { page: this.$route.query.page },
      });
    },
    onPage(index) {
      this.page = index;
      let params = {
        page: index,
        sort: this.$route.query.sort,
      };
      if (this.$route.query.keyword) params["keyword"] = this.$route.query.keyword;
      this.$router.replace({ name: "notices", query: params });

      getNotices(
        params,
        ({ data }) => {
          this.notices = data;
          this.page = index;
        },
        () => {}
      );
    },
    reqSearch(params) {
      if (params.keyword) this.keyword = params.keyword;
      getNotices(
        params,
        ({ data }) => {
          this.notices = data;
        },
        () => {}
      );
      this.$refs.pagination.updateByParams(params);
    },
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
</style>
