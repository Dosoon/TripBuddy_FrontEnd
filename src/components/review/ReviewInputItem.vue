<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          class="h5 c-main-bold"
          label="제목"
          label-for="subject"
          label-cols-sm="1"
          label-align-sm="center"
        >
          <b-form-input
            id="subject"
            ref="subject"
            v-model="review.subject"
            type="text"
            required
            placeholder="제목 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group
          class="h5 c-main-bold"
          label="여행지"
          label-for="plan"
          label-cols-sm="1"
          label-align-sm="center"
        >
          <b-form-select
            v-model="review.planId"
            ref="plan"
            :options="sortOptions"
            id="plan"
            type="text"
            required
          />
        </b-form-group>

        <div class="form-row form-group h5 c-main-bold">
          <label for="plan" class="col-sm-1 col-form-label text-sm-center">시작일</label>
          <b-form-input
            class="col-sm-3"
            :value="this.dateComputed.startDateComputed"
            type="date"
            readonly
          />
          <label for="plan" class="col-sm-1 col-form-label text-sm-center">종료일</label>

          <b-form-input
            class="col-sm-3"
            :value="this.dateComputed.endDateComputed"
            type="date"
            readonly
          />
        </div>

        <hr />

        <div class="example d-inline-block">
          <quill-editor
            style="height: 50vh"
            class="editor"
            ref="content"
            :disabled="false"
            :value="review.content"
            :options="editorOption"
            @change="onEditorChange"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
          />
        </div>

        <b-row class="mb-1">
          <b-col class="text-right">
            <b-button
              type="submit"
              variant="outline-primary"
              class="m-1"
              v-if="this.type === 'register'"
              >글작성</b-button
            >
            <b-button type="submit" variant="outline-primary" class="m-1" v-else>글수정</b-button>
            <b-button type="reset" variant="outline-danger" class="m-1">초기화</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import hljs from "highlight.js";
import debounce from "lodash/debounce";
import { quillEditor } from "vue-quill-editor";

// highlight.js style
import "highlight.js/styles/tomorrow.css";

// import theme style
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

import { getReview, postReview, modifyReview } from "@/api/reviews";
import { listPlanByUser } from "@/api/plan";

export default {
  name: "ReviewInputItem",
  components: {
    quillEditor,
  },
  data() {
    return {
      editorOption: {
        placeholder: "place holder test",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // <strong>, <em>, <u>, <s>
            ["blockquote", "code-block"], // <blockquote>, <pre class="ql-syntax" spellcheck="false">
            [{ header: 1 }, { header: 2 }], // <h1>, <h2>
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // <sub>, <sup>
            [{ indent: "-1" }, { indent: "+1" }], // class제어
            [{ direction: "rtl" }], //class 제어
            [{ size: ["small", false, "large", "huge"] }], //class 제어 - html로 되도록 확인
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // <h1>, <h2>, <h3>, <h4>, <h5>, <h6>, normal
            [{ font: [] }], // 글꼴 class로 제어
            [{ color: [] }, { background: [] }], //style="color: rgb(230, 0, 0);", style="background-color: rgb(230, 0, 0);"
            [{ align: [] }], // class
            // ["clean"],
            ["link", "image", "video"],
          ],
          syntax: {
            highlight: (text) => hljs.highlightAuto(text).value,
          },
        },
      },
      review: {
        reviewId: "",
        subject: "",
        content: "",
        planId: 0,
      },
      planList: [],

      sortOptions: [{ value: 0, text: "후기를 적을 플랜을 선택해주세요!", disabled: true }],
    };
  },
  props: {
    type: { type: String },
  },

  created() {
    if (this.type === "modify") {
      let param = this.$route.params.reviewId;
      getReview(
        param,
        ({ data }) => {
          this.review = data.review;
        },
        () => {}
      );
    }

    listPlanByUser(
      ({ data }) => {
        this.planList = data;

        for (let i = 0; i < data.length; i++) {
          this.sortOptions.push({ value: data[i].planId, text: data[i].title });
        }
      },
      () => {}
    );
  },

  methods: {
    onEditorChange: debounce(function (value) {
      this.review.content = value.html;
    }, 466),
    onEditorBlur() {},
    onEditorFocus() {},
    onEditorReady() {},
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";

      !this.review.subject &&
        ((msg = "제목 입력해주세요"), (err = false), this.$refs.subject.focus());
      err &&
        !this.review.content &&
        ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());
      err &&
        !this.review.planId &&
        ((msg = "플랜을 골라주세요!"), (err = false), this.$refs.plan.focus());

      if (!err) alert(msg);
      else this.type === "register" ? this.registArticle() : this.modifyArticle();
    },
    onReset(event) {
      event.preventDefault();
      this.review.subject = "";
      this.review.content = "";
      this.review.planId = 0;
    },
    registArticle() {
      let params = {
        subject: this.review.subject,
        content: this.review.content,
        planId: this.review.planId,
      };
      postReview(
        params,
        () => {
          alert("여행 후기 등록이 완료되었습니다.");
          this.$router.replace({
            name: "review",
            params: { page: 1 },
          });
        },
        () => {}
      );
    },
    modifyArticle() {
      let params = {
        subject: this.review.subject,
        content: this.review.content,
        planId: this.review.planId,
        reviewId: this.$route.query.reviewId,
      };
      modifyReview(
        params,
        () => {
          alert("여행 후기 수정이 완료되었습니다.");
          this.$router.push({
            name: "appreviewdetail",
            params: {
              reviewId: this.$route.params.reviewId,
              fromApp: this.$route.params.fromApp,
            },
            query: {
              page: this.$route.query.page,
            },
          });
        },
        () => {}
      );
    },
  },
  computed: {
    editor() {
      return this.$refs.content.quill;
    },
    contentCode() {
      return hljs.highlightAuto(this.review.content).value;
    },

    dateComputed() {
      for (let i = 0; i < this.planList.length; i++) {
        if (this.planList[i].planId == this.review.planId) {
          return {
            startDateComputed: this.planList[i].startDate,
            endDateComputed: this.planList[i].endDate,
          };
        }
      }
      return "";
    },
  },
  mounted() {},
};
</script>

<style scoped></style>
