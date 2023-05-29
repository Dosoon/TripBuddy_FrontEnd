<template>
  <div id="form-container">
    <div class="row p-1 ml-1 mt-2">
      <div
        class="d-inline-block"
        v-b-tooltip.hover
        v-b-tooltip.leftbottom
        v-b-tooltip.html
        title="<div align='left' style='line-spacing:50%'><small>'현재 위치에서 검색'을 누르면 <br/>지도 기반으로 관광지를 가져옵니다.<br/>관광지 검색 창에서 검색하면,<br/>선택한 조건에 맞는 관광지 정보를<br/>가져옵니다.<br/></small></div>"
      >
        <b-icon-info-circle></b-icon-info-circle>&nbsp;<small>사용 방법</small>
      </div>
    </div>
    <div class="row pb-2">
      <div class="col-6" id="s-sido-col">
        <b-form-select
          @change="onChange"
          v-model="sidoSelected"
          :options="sidoOptions"
          name="sido"
          id="s-sido"
        >
        </b-form-select>
      </div>
      <div class="col-6" id="s-gugun-col">
        <b-form-select
          v-model="gugunSelected"
          :options="gugunOptions"
          name="gugun"
          id="s-gugun"
        ></b-form-select>
      </div>
    </div>
    <div class="row pb-3">
      <b-input-group>
        <b-form-input placeholder="검색 키워드를 입력해주세요!" v-model="searchKeyword" />
        <b-input-group-append>
          <button class="btn btn-outline-primary" @click="onSearch">
            검색
          </button></b-input-group-append
        >
      </b-input-group>
    </div>
    <div class="row align-items-center justify-content-around pb-1">
      <span class="">분류 선택</span>

      <hr class="m-0 p-0 w-80 d-flex" />
    </div>
    <div class="d-flex pl-3 flex-column">
      <div class="row mt-2 pb-0">
        <pretty-radio
          class="p-icon p-round p-jelly"
          color="primary"
          name="contentType"
          @change="onChangeType"
          v-model="typeSelected"
          value="12"
        >
          <i slot="extra" class="icon mdi mdi-check"></i>
          관광지
        </pretty-radio>
        <pretty-radio
          class="p-icon p-round p-jelly"
          color="primary"
          name="contentType"
          @change="onChangeType"
          v-model="typeSelected"
          value="14"
        >
          <i slot="extra" class="icon mdi mdi-check"></i>
          문화시설
        </pretty-radio>
        <pretty-radio
          class="p-icon p-round p-jelly"
          color="primary"
          name="contentType"
          @change="onChangeType"
          v-model="typeSelected"
          value="15"
        >
          <i slot="extra" class="icon mdi mdi-check"></i>
          축제공연행사
        </pretty-radio>
        <pretty-radio
          class="p-icon p-round p-jelly"
          color="primary"
          name="contentType"
          @change="onChangeType"
          v-model="typeSelected"
          value="25"
        >
          <i slot="extra" class="icon mdi mdi-check"></i>
          여행코스
        </pretty-radio>
      </div>
      <div class="row mt-2 align-items-center">
        <pretty-radio
          class="p-icon p-round p-jelly"
          color="primary"
          name="contentType"
          @change="onChangeType"
          v-model="typeSelected"
          value="28"
        >
          <i slot="extra" class="icon mdi mdi-check"></i>
          레포츠
        </pretty-radio>
        <pretty-radio
          class="p-icon p-round p-jelly"
          color="primary"
          name="contentType"
          @change="onChangeType"
          v-model="typeSelected"
          value="32"
        >
          <i slot="extra" class="icon mdi mdi-check"></i>
          숙박
        </pretty-radio>
        <pretty-radio
          class="p-icon p-round p-jelly"
          color="primary"
          name="contentType"
          @change="onChangeType"
          v-model="typeSelected"
          value="38"
        >
          <i slot="extra" class="icon mdi mdi-check"></i>
          쇼핑
        </pretty-radio>
        <pretty-radio
          class="p-icon p-round p-jelly"
          color="primary"
          name="contentType"
          @change="onChangeType"
          v-model="typeSelected"
          value="39"
        >
          <i slot="extra" class="icon mdi mdi-check"></i>
          식당
        </pretty-radio>

        <button
          class="btn btn-outline-danger btn-rad pl-2 pr-2 pt-1 pb-1 d-flex align-items-center"
          :class="{ btnon: favorlist }"
          @click="toggleFavorlist"
          ref="favorBtn"
        >
          <i
            slot="extra"
            class="icon mdi mdi-heart"
            style="font-size: 16pt"
            :class="{ 'sub-standard': !favorlist }"
          ></i>
          <span class="ml-1 mr-1" style="vertical-align: middle">찜한 관광지</span>
        </button>
      </div>
    </div>
    <hr class="m-0 p-0" />
  </div>
</template>

<script>
import PrettyRadio from "pretty-checkbox-vue/radio";
import { getSiDoAreaCodes, getGugunAreaCodes, search } from "@/api/attraction";
import { getWishes } from "@/api/wish";

export default {
  components: { PrettyRadio },
  data() {
    return {
      favorlist: false,
      page: 1,
      swLat: null,
      swLng: null,
      neLat: null,
      neLng: null,
      searchKeyword: null,
      typeSelected: null,
      sidoSelected: null,
      gugunSelected: null,
      oldSearchKeyword: null,
      oldTypeSelected: null,
      oldSidoSelected: null,
      oldGugunSelected: null,
      sidoOptions: [
        {
          value: null,
          text: "시도 선택",
        },
      ],
      gugunOptions: [
        {
          value: null,
          text: "구군 선택",
        },
      ],
    };
  },
  methods: {
    toggleFavorlist() {
      if (this.favorlist) return;
      this.sidoSelected = null;
      this.gugunSelected = null;
      this.searchKeyword = null;
      this.oldGugunSelected = null;
      this.oldSearchKeyword = null;
      this.oldSidoSelected = null;
      this.swLat = null;
      this.swLng = null;
      this.neLat = null;
      this.neLng = null;
      let arr = document.querySelectorAll(".p-jelly");
      for (let i = 0; i < arr.length; i++) {
        arr[i].firstChild.checked = false;
      }
      this.favorlist = true;
      // alert(this.favorlist);
      this.$emit("reset-list");
      this.page = 1;
      this.onSearch(null, null, null, null, null);
    },
    resetPage() {
      this.page = 1;
    },
    onChange() {
      this.gugunOptions = [{ value: null, text: "구군 선택", disabled: true }];
      this.gugunSelected = null;
      this.resetPage();
      getGugunAreaCodes(
        this.sidoSelected,
        (res) => {
          for (let i = 0; i < res.data.length; i++) {
            this.gugunOptions.push({
              value: res.data[i].areaCode,
              text: res.data[i].areaName,
            });
          }
        },
        () => {}
      );
    },
    onChangeType() {
      if (this.favorlist) {
        this.favorlist = false;
        this.$emit("reset-list");
        this.$refs.favorBtn.classList.remove("sub-standard");
      }
    },
    reqSearch(latlng) {
      if (this.favorlist) {
        this.sidoSelected = null;
        this.gugunSelected = null;
        this.searchKeyword = null;
        this.typeSelected = null;
        this.oldGugunSelected = null;
        this.oldSearchKeyword = null;
        this.oldSidoSelected = null;
        this.swLat = null;
        this.swLng = null;
        this.neLat = null;
        this.neLng = null;
        this.favorlist = false;
      }
      let swLat = latlng.qa.toFixed(5);
      let neLat = latlng.pa.toFixed(5);
      let swLng = latlng.ha.toFixed(5);
      let neLng = latlng.oa.toFixed(5);
      this.onSearch(swLat, swLng, neLat, neLng);
    },
    scrollSearch() {
      this.onSearch(null, null, null, null, true);
    },
    onSearch(swLat, swLng, neLat, neLng, isScroll = false) {
      if (
        (swLat != null && swLng != null && neLat != null && neLng != null && this.favorlist) ||
        (this.sidoSelected != null && this.favorlist)
      ) {
        this.favorlist = false;
        this.page = 1;
      }
      if (this.favorlist) {
        getWishes(
          { page: this.page },
          (res) => {
            if (this.page == 2) {
              this.$emit("on-new-result", res.data);
            } else {
              this.$emit("on-add-result", res.data);
            }
          },
          () => {}
        );
      } else if (
        (swLat != null && swLng != null && neLat != null && neLng != null) ||
        (this.swLat != null &&
          this.swLng != null &&
          this.neLat != null &&
          this.neLng != null &&
          isScroll)
      ) {
        this.favorlist = false;
        this.oldGugunSelected = null;
        this.oldSearchKeyword = null;
        this.oldSidoSelected = null;
        if (
          !(
            isScroll ||
            (this.swLat == swLat &&
              this.swLng == swLng &&
              this.neLat == neLat &&
              this.neLng == neLng &&
              this.typeSelected == this.oldTypeSelected)
          )
        ) {
          this.resetPage();
        }
        if (!isScroll) {
          this.swLat = swLat;
          this.swLng = swLng;
          this.neLat = neLat;
          this.neLng = neLng;
          this.oldTypeSelected = this.typeSelected;
        }

        let params = {
          swLat: this.swLat,
          swLng: this.swLng,
          neLat: this.neLat,
          neLng: this.neLng,
          page: this.page,
          type: this.typeSelected,
        };
        search(
          params,
          (res) => {
            if (this.page == 2) {
              this.$emit("on-new-result", res.data);
            } else {
              this.$emit("on-add-result", res.data);
            }
          },
          () => {}
        );
      } else {
        this.favorlist = false;
        this.swLat = null;
        this.swLng = null;
        this.neLat = null;
        this.neLng = null;

        if (
          !(
            isScroll ||
            (this.gugunSelected == this.oldGugunSelected &&
              this.sidoSelected == this.oldSidoSelected &&
              this.searchKeyword == this.oldSearchKeyword &&
              this.typeSelected == this.oldTypeSelected)
          )
        ) {
          this.resetPage();
        }

        let params = {
          gugun: this.gugunSelected,
          sido: this.sidoSelected,
          keyword: this.searchKeyword,
          page: this.page,
          type: this.typeSelected,
        };
        search(
          params,
          (res) => {
            if (this.page == 2) {
              this.$emit("on-new-result", res.data);
            } else {
              this.$emit("on-add-result", res.data);
            }
          },
          () => {}
        );
        this.oldGugunSelected = this.gugunSelected;
        this.oldSearchKeyword = this.searchKeyword;
        this.oldSidoSelected = this.sidoSelected;
        this.oldTypeSelected = this.typeSelected;
      }
      this.page++;
    },
  },
  created() {
    getSiDoAreaCodes(
      (res) => {
        for (let i = 0; i < res.data.length; i++) {
          this.sidoOptions.push({
            value: res.data[i].areaCode,
            text: res.data[i].areaName,
          });
        }
      },
      () => {}
    );
  },
};
</script>

<style scoped lang="scss">
.btnon {
  background-color: rgba(242, 92, 92, 1) !important;
  border-color: rgba(242, 92, 92, 1) !important;
  color: white !important;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

#form-container {
  width: 100%;
  margin: 5px;
}

.btn-rad {
  border-radius: 25px;
}

.col-6 {
  padding: 0;
}

#s-sido-col {
  padding-right: 5px;
}

#s-gugun-col {
  padding-left: 5px;
}

.row {
  padding: 5%;
  padding-top: 0;
}

.w-80 {
  width: 80%;
}
</style>
