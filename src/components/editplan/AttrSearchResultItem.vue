<template>
  <div
    id="result-item-container"
    class="w-100"
    v-if="attr"
    @click="
      () => {
        if (type == 'search') setMarker(attr.latitude, attr.longitude);
        else if (type == 'plan')
          setMarker(attr.attractionDto.latitude, attr.attractionDto.longitude);
      }
    "
  >
    <div class="row">
      <div class="col-8">
        <div class="row pl-3 pt-2 pr-1 text-left">
          <h4>{{ type == "search" ? attr.title : attr.attractionDto.title }}</h4>
        </div>
        <div class="row pl-3">
          {{
            type == "search"
              ? getContentType(attr.contentTypeId)
              : getContentType(attr.attractionDto.contentTypeId)
          }}
        </div>
        <div class="row pl-3 pr-1" style="text-align: left">
          {{
            type == "search"
              ? attr.addr1 + " " + attr.addr2
              : attr.attractionDto.addr1 + " " + attr.attractionDto.addr2
          }}
        </div>
      </div>
      <div class="col-4 p-0 m-0 pr-2">
        <b-img
          class="img-responsive"
          :src="type == 'search' ? attr.firstImage : attr.attractionDto.firstImage"
          style="aspect-ratio: 1/1; max-width: 95%"
          rounded
        />
      </div>
    </div>
    <div class="row pl-3 pr-3 mt-3 sub-standard" v-if="type == 'search'">
      <b-icon-heart class="heart" v-if="!favored" @click="favorAttr" />
      <b-icon-heart-fill class="heart" v-else @click="unfavorAttr" />
    </div>
    <div class="row pl-3 pr-3 mt-3 justify-content-between" v-if="type == 'plan'">
      <hr class="mt-0 mb-1 p-0" style="width: 100%" />
      <button
        @click="visible = !visible"
        class="rad btn-primary-standard-n bold-border"
        style="aspect-ratio: 1; font-size: 14pt"
      >
        <b-icon-chat-text />
      </button>
      <button class="rad btn-gray bold-border-gray" style="aspect-ratio: 1; font-size: 14pt">
        <b-icon-trash @click="onDelete" />
      </button>

      <hr class="mt-1 mb-1 p-0" style="width: 100%" />
      <b-collapse id="collapse-memolist" class="mt-2 w-100" v-model="visible">
        <b-card class="p-0">
          <attr-memo-list :course="attr" />
        </b-card>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import AttrMemoList from "./AttrMemoList.vue";
import { postWish, deleteWish, checkWish } from "@/api/wish";
export default {
  components: { AttrMemoList },
  data() {
    return {
      visible: false,
      favored: false,
    };
  },
  props: {
    attrProp: {
      type: Object,
    },
    type: {
      type: String,
      default: "search",
    },
    thumbnail: {
      type: String,
      default: "https://www.visitbusan.net/uploadImgs/files/cntnts/20200703155006481_oen",
    },
    title: {
      type: String,
      default: "관광지명",
    },
    contentType: {
      type: String,
      default: "관광지타입",
    },
    addr: {
      type: String,
      default: "서울시 관악구 봉천동 인헌38가길 관광마을 402호",
    },
  },
  created() {
    checkWish(
      this.attr.contentId,
      (res) => {
        if (res.data > 0) this.favored = true;
        else this.favored = false;
      },
      () => {}
    );
  },
  computed: {
    attr: {
      get() {
        return this.attrProp;
      },
      set(v) {
        this.$emit("on-update-attr", v);
      },
    },
  },
  methods: {
    getContentType(id) {
      switch (id) {
        case 12:
          return "관광지";
        case 14:
          return "문화시설";
        case 15:
          return "축제공연행사";
        case 25:
          return "여행코스";
        case 28:
          return "레포츠";
        case 32:
          return "숙박";
        case 38:
          return "쇼핑";
        case 39:
          return "음식점";
      }
    },
    setMarker(lat, lng) {
      let attr;
      if (this.type == "search") attr = this.attr;
      else attr = this.attr.attractionDto;

      this.$emit("set-marker", { lat, lng, attr });
    },
    onDelete() {
      let params = {
        order: this.attr.order,
        day: this.attr.day,
      };
      this.$emit("on-delete", params);
    },
    favorAttr() {
      let params = {
        contentId: this.attr.contentId,
      };
      postWish(
        params,
        () => {
          this.favored = true;
        },
        () => {
        }
      );
    },
    unfavorAttr() {
      deleteWish(
        this.attr.contentId,
        () => {
          this.favored = false;
        },
        () => {
        }
      );
    },
  },
};
</script>

<style scoped lang="scss">
.heart:hover {
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  transform: scale(1.3);
}

.heart {
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

#result-item-container {
  padding: 15px;
  border: 1px solid rgba(33, 33, 53, 0.125);
  background-color: #fff;
  border-radius: 20px;
  margin: 5px;
  margin-left: 0px;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

#result-item-container:hover {
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  background-color: rgba(0, 0, 0, 0.085);
  transform-origin: center !important;
  transform: scale(1.02);
  margin-top: 10px;
  margin-bottom: 10px;
}

.rad {
  border-radius: 100%;
}

.btn-primary-standard-n {
  border: none;
  color: rgba(3, 149, 165, 1) !important;
  background-color: transparent;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

.btn-primary-standard-n:hover {
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  color: rgba(2, 87, 140, 1) !important;
  transform: scale(1.1);
}

.btn-gray {
  border: none;
  color: rgb(90, 90, 90) !important;
  background-color: transparent;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
.btn-gray:hover {
  color: rgb(50, 50, 50) !important;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  transform: scale(1.1);
}

.bold-border-gray {
  stroke: rgba(90, 90, 90, 1) !important;
  stroke-width: 0.15px;
}

.bold-border-gray:hover {
  stroke: rgba(50, 50, 50, 1) !important;
}

.bold-border {
  stroke: rgba(3, 149, 165, 1) !important;
  stroke-width: 0.15px;
}

.bold-border:hover {
  stroke: rgba(2, 87, 140, 1) !important;
}

::v-deep {
  .card-body {
    width: 100%;
    padding: 0px;
  }
}
</style>
