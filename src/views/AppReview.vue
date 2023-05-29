<template>
  <div class="container">
    <left-heading
      :descProp="'여행지에 대한 이야기를 들려주세요!'"
      :emojiProp="'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Camera%20with%20Flash.png'"
      :titleProp="'여행 후기'"
    />

    <hr />
    <div class="row justify-content-between">
      <div class="col-3 col-lg-2">
        <b-form-select v-model="selected" :options="sortOptions" @change="onSortChange" />
      </div>
      <div class="col-9 col-lg-6">
        <div class="row justify-content-end">
          <div class="col-8">
            <b-input-group>
              <b-form-input
                type="text"
                placeholder="검색어를 입력하세요"
                @keyup.enter="search"
                v-model="keyword"
              ></b-form-input>

              <b-input-group-append>
                <b-button variant="outline-primary" @click="search">검색</b-button>
              </b-input-group-append>
            </b-input-group>
          </div>
          <div class="col-4 col-lg-2 p-0">
            <button class="btn btn-outline-primary" @click="moveRegister">
              작성
              <b-icon-clipboard-plus />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="container d-flex flex-row flex-wrap justify-content-around mt-4"
      data-sal="slide-up"
      data-sal-duration="500"
      data-sal-delay="100"
      data-sal-easing="ease-in-out"
      id="card-list"
      ref="cardContainer"
    >
      <app-card
        v-for="review in reviews"
        :key="review.reviewId"
        v-bind="review"
        fromApp="review"
        ref="appCard"
      ></app-card>
    </div>
  </div>
</template>

<script>
import LeftHeading from "@/components/common/LeftHeading.vue";
import AppCard from "@/components/common/AppCard.vue";
import { getReviews, totalReviews } from "@/api/reviews";
import sal from "sal.js";
export default {
  name: "AppReview",
  components: { AppCard, LeftHeading },
  beforeDestroy() {
    document.removeEventListener("scroll", this.infScroll);
  },
  data() {
    return {
      total: 0,
      loadingFlag: false,
      page: 1,
      reviews: [],
      keyword: null,
      selected: "new",
      sortOptions: [
        {
          text: "최신 등록순",
          value: "new",
        },
        {
          text: "오래된 순",
          value: "old",
        },
        {
          text: "별점 높은 순",
          value: "rating",
        },
      ],
    };
  },
  created() {
    if (this.$route.query.page) this.page = this.$route.query.page;
    if (this.$route.query.sort) this.sort = this.$route.query.sort;
    if (this.$route.query.keyword) this.keyword = this.$route.query.keyword;
    //생성때만 keyword인자. 나머진 searchKeyword

    let params = {
      page: this.page,
      sort: this.sort,
      keyword: this.keyword,
    };

    getReviews(
      params,
      ({ data }) => {
        this.reviews = data;
      },
      () => {}
    );

    totalReviews(
      this.keyword,
      ({ data }) => {
        this.total = data;
      },
      () => {}
    );

    document.addEventListener("scroll", this.infScroll);
  },
  mounted() {
    sal({
      threshold: 0.2,
    });
  },
  methods: {
    infScroll() {
      let scrollCheck =
        this.$refs.cardContainer.getBoundingClientRect().bottom - window.innerHeight < 200;

      if (scrollCheck && !this.loadingFlag && this.reviews.length < this.total) {
        this.loadingFlag = true;
        this.page++;
        let params = {
          page: this.page,
          sort: this.sort,
          keyword: this.keyword,
        };

        getReviews(
          params,
          ({ data }) => {
            this.reviews = this.reviews.concat(data);
            this.loadingFlag = false;
          },
          () => {}
        );
      }
    },

    moveRegister() {
      this.$router.replace({
        name: "appreviewregister",
      });
    },
    search() {
      this.sort = this.selected;
      let params = {
        page: 1,
        sort: this.selected,
      };
      if (this.keyword) params["keyword"] = this.keyword;

      if (this.$route.query.sort == params.sort && this.$route.query.keyword == params.keyword) {
        return;
      }

      this.$router.push({
        path: "/reviews",
        query: params,
      });

      this.page = 1;
      this.reviews = [];

      getReviews(
        params,
        ({ data }) => {
          this.reviews = data;
        },
        () => {}
      );

      totalReviews(
        this.keyword,
        ({ data }) => {
          this.total = data;
        },
        () => {}
      );
    },

    onSortChange() {
      this.sort = this.selected;
      let params = {
        page: 1,
        sort: this.selected,
      };
      if (this.keyword) params["keyword"] = this.keyword;
      this.$router.push({
        path: "/reviews",
        query: params,
      });
      this.page = 1;
      this.reviews = [];

      getReviews(
        params,
        ({ data }) => {
          this.reviews = data;
        },
        () => {}
      );

      totalReviews(
        this.keyword,
        ({ data }) => {
          this.total = data;
        },
        () => {}
      );
    },
  },
};
</script>
