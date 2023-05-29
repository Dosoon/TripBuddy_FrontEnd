<template>
  <div id="form-container">
    <div class="row pt-2 pb-2">
      <div class="col-6" id="s-left-col">
        <b-form-datepicker @change="onChangeStartDate" v-model="editStartDate"> </b-form-datepicker>
      </div>
      <div class="col-6" id="s-right-col">
        <b-form-datepicker @change="onChangeEndDate" v-model="editEndDate"></b-form-datepicker>
      </div>
    </div>
    <div class="row pb-3">
      <b-input-group>
        <b-form-input
          placeholder="여행 코스 제목"
          style="text-align: center"
          v-model="editTitle"
          @change="onChangeTitle"
        />
      </b-input-group>
    </div>
    <hr class="m-0 p-0" />
  </div>
</template>

<script>
export default {
  name: "PlanSaveForm",
  props: {
    title: {
      type: String,
      default: null,
    },
    startDate: {
      type: String,
      default: null,
    },
    endDate: {
      type: String,
      default: null,
    },
  },
  data() {
    return {};
  },

  created() {
    if (this.startDate) this.editStartDate = this.startDate;
    if (this.endDate) this.editEndDate = this.endDate;
  },

  methods: {
    onChangeStartDate(e) {
      this.editStartDate = e.target.value;
    },
    onChangeEndDate(e) {
      this.editEndDate = e.target.value;
    },
    onChangeTitle(e) {
      this.editTitle = e;
    },
  },
  computed: {
    editStartDate: {
      get() {
        return this.startDate;
      },
      set(v) {
        this.$emit("on-update-start-date", v);
      },
    },
    editEndDate: {
      get() {
        return this.endDate;
      },
      set(v) {
        this.$emit("on-update-end-date", v);
      },
    },
    editTitle: {
      get() {
        return this.title;
      },
      set(v) {
        this.$emit("on-update-title", v);
      },
    },
  },
};
</script>

<style scoped lang="scss">
#form-container {
  width: 100%;
  margin: 5px;
}

.col-6 {
  padding: 0;
}

#s-left-col {
  padding-right: 5px;
}

#s-right-col {
  padding-left: 5px;
}

.row {
  padding: 5%;
  padding-top: 0;
}

.w-80 {
  width: 80%;
}

::v-deep {
  .form-control {
    font-family: "NanumSquareNeo-Normal";
    font-size: 10pt;
  }
}
</style>
