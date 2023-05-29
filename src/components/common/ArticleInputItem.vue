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
            v-model="article.subject"
            type="text"
            required
            placeholder="제목 입력..."
          ></b-form-input>
        </b-form-group>

        <hr />

        <div class="example d-inline-block">
          <quill-editor
            style="height: 50vh"
            class="editor"
            ref="myTextEditor"
            :disabled="false"
            :value="article.content"
            :options="editorOption"
            @change="onEditorChange"
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

import { postNotice, modifyNotice } from "@/api/notice";

export default {
  name: "ArticleInputItem",
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
      article: {
        articleId: -1,
        userName: " ",
        subject: "제목을 작성해주세요.",
        content: "내용을 작성해주세요.",
        planId: -1,
      },
      isUserId: true,
    };
  },
  props: {
    type: { type: String },
    fromApp: { type: String },
  },

  created() {},
  methods: {
    onEditorChange: debounce(function (value) {
      this.article.content = value.html;
    }, 466),
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";

      !this.article.subject &&
        ((msg = "제목 입력해주세요"), (err = false), this.$refs.subject.focus());
      err &&
        !this.article.content &&
        ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

      if (!err) alert(msg);
      else this.type === "register" ? this.registArticle() : this.modifyArticle();
    },
    onReset(event) {
      event.preventDefault();
      this.article.subject = "";
      this.article.content = "";
    },
    registArticle() {
      // if (this.fromApp === "notice") {
      let params = {
        subject: this.article.subject,
        content: this.article.content,
      };
      postNotice(
        params,
        () => {
          alert("공지사항 등록이 완료되었습니다.");
        },
        () => {}
      );
      // } else {
      // }

      this.moveList();
    },
    modifyArticle() {
      // if (this.fromApp === "notice") {
      let params = {
        subject: this.article.subject,
        content: this.article.content,
        noticeId: this.article.articleId,
      };
      modifyNotice(
        params,
        () => {
          alert("공지사항 수정이 완료되었습니다.");
        },
        () => {}
      );
      // } else {
      //   let params = {
      //     subject: this.article.subject,
      //     content: this.article.content,

      // }

      this.moveList();
    },
    moveList() {
      // if (this.fromApp === "notice") {
      this.$router.push({ path: "/notice", params: { page: 1 } });
      // } else {
      // }
    },
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill;
    },
    contentCode() {
      return hljs.highlightAuto(this.article.content).value;
    },
  },
  mounted() {},
};
</script>

<style scoped></style>
