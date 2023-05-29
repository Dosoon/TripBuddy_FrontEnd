<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination b-pagination-pills">
        <li
          class="page-item"
          v-for="index in totalPage"
          :key="index"
          @click="onPage(index)"
          :class="{ active: $route.query.page == index }"
        >
          <a class="page-link">{{ index }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { totalNotices } from "@/api/notice";

export default {
  name: "NoticePagination",
  components: {},
  data() {
    return {
      total: 1,
      totalPage: 1,
      page: null,
    };
  },
  created() {
    let keyword = null;
    if (this.$route.query.keyword) keyword = this.$route.query.keyword;
    totalNotices(
      keyword,
      (res) => {
        this.total = res.data;
        if (this.total % 20 == 0) this.totalPage = this.total / 20;
        else this.totalPage = Math.floor(this.total / 20) + 1;
      },
      () => {}
    );
  },
  methods: {
    onPage(index) {
      this.$emit("update-list", index);
    },
    updateByParams(params) {
      totalNotices(
        params.keyword,
        (res) => {
          this.total = res.data;
          if (this.total % 20 == 0) this.totalPage = this.total / 20;
          else this.totalPage = Math.floor(this.total / 20) + 1;
        },
        () => {}
      );
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep {
  a,
  a:hover,
  a:focus,
  a:active,
  a.page-link,
  a.page-link:hover,
  a.page-link:focus,
  a.page-link:active {
    color: rgba(0, 0, 0, 0.7) !important;
  }

  .active > a,
  .active > a:hover {
    color: white !important;
  }

  .active > a {
    background-color: rgba(3, 149, 165, 1) !important;
    // border-radius: 0.25rem;
  }
}
</style>
