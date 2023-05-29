<template>
  <div
    class="w-100 h-100 bg-primary-standard align-items-center justify-content-center d-flex flex-column"
    id="index-container"
    :v-cloak="true"
  >
    <h1
      id="logo"
      class="mb-2"
      style="margin-left: 30px"
      data-sal="flip-up"
      data-sal-duration="500"
      data-sal-delay="50"
      data-sal-easing="ease-out-back"
    >
      TripBuddy <span class="mdi mdi-bird" style="font-size: 60pt; margin-left: -10px"></span>
    </h1>
    <img
      alt="Dove"
      width="125"
      height="125"
      style="margin-bottom: -50px; z-index: 99999; margin-left: 20%"
      ref="emoji"
      data-sal="zoom-in"
      data-sal-duration="500"
      data-sal-delay="1000"
      data-sal-easing="ease-in-out-back"
    />
    <div class="shadow-lg d-flex justify-content-center" id="login-container" ref="loginContainer">
      <div
        class="p-5 d-flex flex-column justify-content-around"
        data-sal="fade"
        data-sal-duration="500"
        data-sal-delay="200"
        data-sal-easing="ease-out-back"
      >
        <h3 class="primary-standard logofont mb-0" ref="title">
          Welcome, Buddy!

          <br />
          <small class="inner-container" style="font-size: 10pt; padding-top: 0"
            >로그인이 필요해요.</small
          >
        </h3>
        <div class="inner-container pt-0 pb-0">
          <b-collapse id="init-collapse" visible>
            <div class="row justify-content-center m-3">
              <button
                v-b-toggle:init-collapse.login-collapse
                class="btn shadow-sm btn-trans pl-5 pr-5"
                @click="resetModels"
              >
                로그인
              </button>
            </div>
            <div class="row justify-content-center m-3">
              <button
                v-b-toggle.init-collapse.signup-collapse
                class="btn shadow-sm btn-trans pl-5 pr-5"
                @click="resetModels"
              >
                회원 가입
              </button>
            </div>
          </b-collapse>
          <b-collapse id="login-collapse">
            <b-input-group prepend="아이디" class="mt-3">
              <b-form-input class="btn-trans" v-model="id" @keyup.enter="onLogin" />
            </b-input-group>
            <b-input-group prepend="비밀번호" class="mt-3">
              <b-form-input
                :type="'password'"
                class="btn-trans"
                v-model="password"
                @keyup.enter="onLogin"
              />
            </b-input-group>

            <div class="row align-item-center mt-3 justify-content-center">
              <div
                class="d-inline-block m-auto"
                style="margin-left: 15px !important; margin-right: 15px !important"
                @click="resetModels"
              >
                <b-icon-chevron-left v-b-toggle.init-collapse.login-collapse />
              </div>
              <button class="btn shadow-sm btn-trans" @click="onLogin">로그인</button>

              <div
                class="d-inline-block m-auto"
                style="
                  margin-left: 15px !important;
                  margin-right: 15px !important;
                  visibility: hidden;
                "
              >
                <b-icon-chevron-left v-b-toggle:init-collapse />
              </div>
            </div>
          </b-collapse>
          <b-collapse id="signup-collapse">
            <div class="row">
              <div class="col-6">
                <b-input-group prepend="아이디" class="mt-3">
                  <b-form-input
                    id="signup-id"
                    class="btn-trans"
                    v-model="id"
                    @input="onChangeId"
                    :class="{ invalid: !this.validId }"
                  />
                </b-input-group>
              </div>
              <div class="col-6">
                <b-input-group prepend="이름" class="mt-3">
                  <b-form-input class="btn-trans" v-model="name" />
                </b-input-group>
              </div>
            </div>
            <b-input-group prepend="비밀번호" class="mt-3">
              <b-form-input class="btn-trans" :type="'password'" v-model="password" />
            </b-input-group>
            <b-input-group prepend="비밀번호 확인" class="mt-3">
              <b-form-input class="btn-trans" :type="'password'" v-model="passwordCheck" />
            </b-input-group>
            <b-input-group prepend="메일" class="mt-3">
              <b-form-input class="btn-trans" v-model="email" />
            </b-input-group>

            <div class="row align-item-center mt-3 justify-content-center">
              <div
                class="d-inline-block m-auto"
                style="margin-left: 15px !important; margin-right: 15px !important"
                @click="resetModels"
              >
                <b-icon-chevron-left v-b-toggle.init-collapse.signup-collapse id="prevSignup" />
              </div>
              <button class="btn shadow-sm btn-trans" @click="onSignup">가입</button>
              <div
                class="d-inline-block m-auto"
                style="
                  margin-left: 15px !important;
                  margin-right: 15px !important;
                  visibility: hidden;
                "
              >
                <b-icon-chevron-left v-b-toggle:init-collapse />
              </div>
            </div>
          </b-collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sal from "sal.js";
import { login, signup, checkId } from "@/api/user";

export default {
  data() {
    return {
      validId: false,
      emojis: [
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Dolphin.png",
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Dove.png",
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Front-Facing%20Baby%20Chick.png",
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Camel.png",
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Eagle.png",
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Ewe.png",
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Sauropod.png",
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Spouting%20Whale.png",
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Turtle.png",
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Sloth.png",
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Cat.png",
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Dog.png",
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Poodle.png",
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Kangaroo.png",
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Otter.png",
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Penguin.png",
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Rabbit.png",
      ],
      id: null,
      password: null,
      passwordCheck: null,
      name: null,
      tel: null,
      email: null,
    };
  },
  mounted() {
    this.$refs.emoji.src = this.getEmojiSrc();
    sal();
    setTimeout(() => {
      this.$refs.loginContainer.style.height = "40%";
    }, 1000);
  },
  methods: {
    onChangeId() {
      checkId(
        this.id,
        (res) => {
          if (res.data == 0) this.validId = true;
          else this.validId = false;
        },
        () => {
          this.validId = false;
        }
      );
    },
    getRandomEmojiNum() {
      return Math.random() * (this.emojis.length - 1) + 1;
    },
    getEmojiSrc() {
      return this.emojis.at(this.getRandomEmojiNum());
    },

    onLogin() {
      login(
        { id: this.id, password: this.password }, //api에서 가져온 함수
        (data) => {
          let accessToken = data.data["access-token"];
          let refreshToken = data.data["refresh-token"];
          this.$store.commit("setTokens", { accessToken, refreshToken });
          this.$store.commit("SET_IS_LOGIN", true);
          this.$store.commit("SET_IS_VALID_TOKEN", true);
          this.$store.commit("onLogin", data.data.userinfo);
          this.$router.push("/main");
        },
        () => {
          alert("로그인 정보를 다시 확인해주세요.");
          this.$store.commit("SET_IS_LOGIN", false);
          this.$store.commit("SET_IS_VALID_TOKEN", false);
        }
      );
    },

    onSignup() {
      if (this.id == null || this.password == null || (this.name == null) | (this.email == null)) {
        alert("빈칸이 있습니다.\n모든 정보를 기입해주세요.");
        return;
      }
      if (this.password != this.passwordCheck) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      if (!this.validId) {
        alert("사용할 수 없는 아이디입니다.");
        return;
      }
      let params = {
        id: this.id,
        password: this.password,
        name: this.name,
        email: this.email,
      };
      signup(
        params,
        () => {
          alert("가입에 성공했습니다!");
          this.$root.$emit("bv::toggle::collapse", "init-collapse");
          this.$root.$emit("bv::toggle::collapse", "signup-collapse");
          this.resetModels();
        },
        () => {
          alert("이 이메일은 이미 사용중입니다.");
        }
      );
    },
    resetModels() {
      this.id = null;
      this.password = null;
      this.passwordCheck = null;
      this.name = null;
      this.tel = null;
      this.email = null;
    },
  },
};
</script>

<style scoped lang="scss">
.logofont {
  font-family: "Tenada";
}
#logo {
  font-family: "Tenada";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: auto;
  letter-spacing: -0.8px;
  color: white;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
#index-container {
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

#login-container {
  width: 25%;
  height: 0px;
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  display: inline-block;
  -webkit-transition: all 0.9s cubic-bezier(0.22, 1, 0.36, 1);
  -moz-transition: all 0.9s cubic-bezier(0.22, 1, 0.36, 1);
  -o-transition: all 0.9s cubic-bezier(0.22, 1, 0.36, 1);
  -ms-transition: all 0.9s cubic-bezier(0.22, 1, 0.36, 1);
  transition: all 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}

.inner-container {
  font-family: "NanumSquareNeo-Thin";
  color: black;

  font-size: 12pt;
  padding: 15px;
}

.btn-trans {
  border: 1px rgba(0, 0, 0, 0.1) solid;
  border-radius: 15px;
}

::v-deep {
  //   .input-group-prepend,
  .input-group-text {
    border: 1px rgba(0, 0, 0, 0.1) solid;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }
}

.invalid {
  color: red !important;
}
</style>
