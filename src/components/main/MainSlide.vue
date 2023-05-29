<template>
  <div>
    <div class="d-lg-block d-md-none d-sm-none d-xs-none d-none">
      <b-container>
        <infinite-slide-bar :duration="'30s'">
          <main-review
            :title-prop="'제주'"
            :desc-prop="'올 여름엔<br/>청량한 제주 바다로'"
            :img-src-prop="'https://www.jejusori.net/news/photo/202210/409023_415016_382.jpg'"
          />
          <main-review
            :title-prop="'부산'"
            :desc-prop="'감성 넘치는<br/>벽화마을'"
            :img-src-prop="'https://a.cdn-hotels.com/gdcs/production37/d1169/1dcbfef5-2070-48ce-8d62-3e0fffa21797.jpg?impolicy=fcrop&w=800&h=533&q=medium'"
          />
          <main-review
            :title-prop="'강릉'"
            :desc-prop="'해변에서<br/>피크닉 해봤어?'"
            :img-src-prop="'https://res.klook.com/image/upload/c_fill,w_750,h_560/q_80/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/s2cwsgukc3yqy5kqckxs.jpg'"
          />
          <main-review
            :title-prop="'서울'"
            :desc-prop="'야경 즐기며<br/>유유자적 호캉스'"
            :img-src-prop="'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/Uf1/image/0m2ua_L6I_CXYUMjrzoXxlQ8PUs.jpg'"
          />
          <main-review
            :title-prop="'인천'"
            :desc-prop="'해상 케이블카에서<br/>즐기는 오션 뷰'"
            :img-src-prop="'https://image.kmib.co.kr/online_image/2021/0128/611211110015478625_1.jpg'"
          />
          <main-review
            :title-prop="'파주'"
            :desc-prop="'한국 속 작은 유럽<br/>헤이리 투어'"
            :img-src-prop="'https://ak-d.tripcdn.com/images/100t1g000001h0wbh6687_Z_640_10000_R5.jpg_.webp?proc=autoorient'"
          />
        </infinite-slide-bar>
      </b-container>
    </div>
    <div class="d-block d-lg-none d-xl-none d-xxl-none">
      <b-container>
        <main-review />
        <main-review />
        <main-review />
        <main-review />
        <main-review />
        <main-review />
      </b-container>
    </div>
  </div>
</template>

<script>
import MainReview from "./MainReview.vue";
import InfiniteSlideBar from "vue-infinite-slide-bar";

export default { name: "MainLargeSlide", components: { MainReview, InfiniteSlideBar } };
</script>

<style></style>
