<template>
  <b-container id="container-mypage">
    <left-heading
      :emojiProp="'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Waving%20Hand.png'"
      :titleProp="'마이 페이지'"
      :descProp="'개인 정보를 수정하세요.'"
    />
    <hr />
    <b-container
      class="ps-5 pe-5 pt-4"
      id="mypage"
      style="width: 80%"
      data-sal="fade"
      data-sal-duration="500"
      data-sal-delay="100"
      data-sal-easing="ease-in-out"
    >
      <b-input-group class="mt-4 mb-3 ps-4 pe-4 align-items-center">
        <div class="col-2 text-center">
          <span class="c-main-bold">프로필 사진</span>
        </div>
        <div class="col-10 text-left">
          <img
            src="https://kokodoc.com/wp-content/uploads/2019/05/noimage-w-900.jpg"
            class="img-thumbnail b-rad mb-2"
            width="100px"
            height="100px"
            alt=""
            id="mypage-pfimg-thumb"
          />
          <b-form-file
            @change="onChangeFile"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
            style="width: 280px; display: block"
            accept=".jpg, .png, .gif, .jpeg, .bmp"
          ></b-form-file>
        </div>
      </b-input-group>
      <div class="input-group mt-4 mb-3 ps-4 pe-4 align-items-center">
        <div class="col-2 text-center">
          <span class="c-main-bold">아이디</span>
        </div>
        <div class="col-4">
          <input
            type="text"
            class="form-control b-rad text-muted"
            id="mypage-id"
            :value="this.$store.getters['id']"
            readonly
            disabled
          />
        </div>
      </div>
      <div class="input-group mt-4 mb-3 ps-4 pe-4 align-items-center">
        <div class="col-2 text-center">
          <span class="c-main-bold">이름</span>
        </div>
        <div class="col-3">
          <input
            type="text"
            class="form-control b-rad text-muted"
            id="mypage-name"
            :value="this.$store.getters['name']"
            readonly
            disabled
          />
        </div>
        <div class="col-2 ms-3 text-center">
          <span class="c-main-bold">이메일</span>
        </div>
        <div class="col-4">
          <input
            type="email"
            class="form-control b-rad text-muted"
            :value="this.$store.getters['email']"
            readonly
            disabled
          />
        </div>
      </div>
      <div class="input-group mt-4 mb-3 ps-4 pe-4 align-items-center">
        <div class="col-2 text-center">
          <span class="c-main-bold">비밀번호 변경</span>
        </div>
        <div class="col-6">
          <input
            type="password"
            class="form-control b-rad"
            id="mypage-pw"
            v-model="password"
            @input="comparePassword"
          />
        </div>
      </div>
      <div class="input-group mb-3 ps-4 pe-4 align-items-center">
        <div class="col-2 text-center">
          <span class="c-main-bold">비밀번호 확인</span>
        </div>
        <div class="col-6">
          <input
            type="password"
            class="form-control b-rad"
            id="mypage-pw-check"
            v-model="passwordCheck"
            @input="comparePassword"
          />
        </div>
      </div>
      <div class="input-group mb-3 ps-4 pe-4 align-items-center">
        <div class="col-2 text-center"></div>
        <div class="col-6 text-left" ref="checkmsg"></div>
      </div>
      <div class="container p-5">
        <div class="row justify-content-between">
          <div class="col-2">
            <button class="btn btn-outline-danger ps-3 pe-3" @click="onDelete">탈퇴</button>
          </div>
          <div class="col-2">
            <button
              class="btn btn-outline-primary ps-3 pe-3"
              @click="onSaveProfile"
              id="btn-req-changeinfo"
            >
              변경
            </button>
          </div>
        </div>
      </div>
    </b-container>
  </b-container>
</template>

<script>
import LeftHeading from "@/components/common/LeftHeading.vue";
import { modifyUser, deleteUser, logout } from "@/api/user";
import sal from "sal.js";
export default {
  name: "AppMyPage",
  components: { LeftHeading },
  data() {
    return {
      base64file: null,
      password: null,
      passwordCheck: null,
      validPassword: false,
    };
  },
  created() {},
  mounted() {
    sal();
  },
  methods: {
    comparePassword() {
      if (
        this.password != null &&
        this.passwordCheck != null &&
        this.password == this.passwordCheck &&
        this.password != "" &&
        this.passwordCheck != ""
      ) {
        this.validPassword = true;
        this.$refs.checkmsg.innerHTML = "비밀번호가 일치합니다.";
      } else if (
        (this.password == null && this.passwordCheck == null) ||
        (this.password == "" && this.passwordCheck == "")
      ) {
        this.validPassword = false;
        this.$refs.checkmsg.innerHTML = "";
        this.password = null;
        this.passwordCheck = null;
      } else {
        this.validPassword = false;
        this.$refs.checkmsg.innerHTML = "비밀번호가 일치하지 않습니다.";
      }
    },
    onChangeFile(e) {
      let file = e.target.files[0];
      if (file.size > 64000) {
        alert("64KB 이하의 파일만 업로드할 수 있습니다.");
        document.getElementById("mypage-pfimg-thumb").src =
          "https://kokodoc.com/wp-content/uploads/2019/05/noimage-w-900.jpg";
        file = null;
        return;
      }

      // FileReader support
      if (FileReader && file) {
        var fr = new FileReader();
        fr.onload = function () {
          document.getElementById("mypage-pfimg-thumb").src = fr.result;
        };
        fr.readAsDataURL(file);
      }

      const base64file = async (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (e) => reject(e);
        });
      base64file(file).then((result) => {
        this.base64file = result;
      });
    },
    onSaveProfile() {
      let params = {};
      if (this.base64file) {
        params.profileImg = this.base64file;
      }
      if (this.validPassword && this.password) {
        params.password = this.password;
      }
      if (this.base64file || this.password) {
        modifyUser(
          params,
          (res) => {
            if (this.base64file) {
              this.$store.commit("setProfileImg", res.data.profileImg);
            }
            alert("변경되었습니다.");
            this.$router.go(this.$router.currentRoute);
          },
          () => {}
        );
      }
    },
    onDelete() {
      if (confirm("정말 탈퇴하시겠습니까?")) {
        deleteUser(
          () => {
            alert("탈퇴되었습니다.");
            logout(
              () => {
                this.$store.commit("resetState");
                this.$router.push("/");
              },
              () => {
                this.$store.commit("resetState");
                this.$router.push("/");
              }
            );
          },
          () => {}
        );
      }
    },
  },
};
</script>

<style scoped></style>
