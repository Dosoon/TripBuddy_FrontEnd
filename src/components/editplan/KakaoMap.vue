<template>
  <div id="kakao-map-container" class="col-12 h-100 p-0" style="position: relative">
    <div
      v-if="loading"
      class="w-100 h-100"
      style="position: absolute; background-color: rgba(0, 0, 0, 0.5); z-index: 999999"
      id="overlay"
    >
      <b-spinner
        variant="primary"
        label="Spinning"
        style="position: absolute; top: 40%"
      ></b-spinner>
    </div>
    <div id="map" ref="map" class="w-100 h-100"></div>
    <b-button
      data-sal="slide-up"
      data-sal-duration="300"
      data-sal-delay="50"
      data-sal-easing="ease-in-out"
      @click="onClickSearchBtn"
      class="btn-outline-secondary m-4 d-none d-lg-inline-block map-btn"
      style="
        background-color: white;
        border-radius: 25px;
        padding: 15px;
        z-index: 99999;
        position: absolute;
        top: 0;
        left: 45%;
      "
    >
      현재 위치에서 검색
    </b-button>
    <div ref="chatTarget" id="chat-container">
      <div
        class="target chatting-header shadow primary-dark"
        style="opacity: 0; z-index: 99999; position: absolute; bottom: 0%; left: 2%"
        ref="chat"
      >
        <div class="row p-1 pb-2 m-0 justify-content-between">
          <div><b-icon-chat-fill /> 실시간 채팅</div>
          <div>
            <b-icon-dash-square-fill class="mr-1" @click="onMinimize" />
            <b-icon-arrow-up-right-square-fill @click="onMaximize" />
          </div>
        </div>
        <plan-chatting ref="chatting" />
        <plan-chat-form @send-chat="sendChat" />
      </div>
      <Moveable
        className="moveable"
        v-bind:target="['.target']"
        v-bind:draggable="true"
        v-bind:scalable="false"
        v-bind:rotatable="false"
        @drag="onDrag"
        @scale="onScale"
        @rotate="onRotate"
        style="z-index: -999999"
      />
    </div>
  </div>
</template>

<script>
import Moveable from "vue-moveable";
import PlanChatForm from "./PlanChatForm.vue";
import PlanChatting from "./PlanChatting.vue";
export default {
  name: "KakaoMap",
  data() {
    return {
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
      socket: null,
      map: null,
      curWindow: null,
      curCourseMarkers: [],
      curPolyLine: null,
      loading: true,
      emojiIdx: 0,
      curIdx: 0,
    };
  },
  created() {
    window.kakaomapLoaded = null;

    // 연결
    this.connect();
  },
  mounted() {
    if (window.kakao) this.loadKakaoMap();
    else this.loadKakaoMapScript();
    this.$refs.chat.style.opacity = 1;
    this.$refs.chat.style.transform = "translate(0px, -30px)";
    this.$refs.chat.style.transition = "all ease-in-out 0.4s";
    setTimeout(() => {
      this.$refs.chat.style.transition = "";
    }, 400);
  },
  components: { Moveable, PlanChatting, PlanChatForm },
  beforeDestroy() {
    this.socket.close();
  },
  methods: {
    getRandomEmojiNum() {
      return Math.random() * (this.emojis.length - 1) + 1;
    },
    sendChat(msg) {
      this.socket.send(
        JSON.stringify({
          content: msg,
          username: this.$store.getters["name"],
          type: "chat",
          planNum: this.$route.params.planid,
        })
      );
    },
    onRecv({ data }) {
      // 채팅서버 패킷 수신시 콜백
      let chatData = JSON.parse(data);
      if (chatData.type == "chat" || chatData.type == "notice") {
        this.$refs.chatting.addChat(chatData);
      } else if (chatData.type == "tab") {
        this.waitForCondition("kakaomapLoaded").then(() => {
          let params = {
            idx: chatData.content,
            send: false,
          };
          this.$emit("req-change-tab", params);
        });
      } else if (chatData.type == "path") {
        this.waitForCondition("kakaomapLoaded").then(() => {
          let newCourse = JSON.parse(chatData.content);
          this.$emit("req-fetch-course", newCourse);

          this.curIdx = newCourse.idx;
          this.resetMarkers();
          this.setMarkers(newCourse);
        });
      }
    },
    sendNewPath(course) {
      course["idx"] = this.curIdx;
      this.socket.send(
        JSON.stringify({
          type: "path",
          planNum: this.$route.params.planid,
          content: JSON.stringify(course),
        })
      );
    },
    sendChangeTab(idx) {
      this.curIdx = idx;
      this.socket.send(
        JSON.stringify({
          type: "tab",
          planNum: this.$route.params.planid,
          content: idx,
        })
      );
    },

    connect() {
      // 채팅서버 접속

      const server = "ws://" + process.env.VUE_APP_CHAT_ENDPOINT + "/chat";
      this.socket = new WebSocket(server);
      this.socket.onopen = () => {
        this.emojiIdx = this.getRandomEmojiNum();
        this.socket.onmessage = this.onRecv;
        let msg = {
          type: "signin",
          username: this.$store.getters["name"],
          planNum: this.$route.params.planid,
          emojiIdx: this.emojiIdx,
        };
        this.socket.send(JSON.stringify(msg));
      };

      this.socket.onerror = () => {
        alert("실시간 서버 접속에 실패했습니다.");
      };

      this.socket.onclose = function (event) {
        // alert(event.code);
        let reason;
        // See https://www.rfc-editor.org/rfc/rfc6455#section-7.4.1
        if (event.code == 1000)
          reason =
            "Normal closure, meaning that the purpose for which the connection was established has been fulfilled.";
        else if (event.code == 1001)
          reason =
            'An endpoint is "going away", such as a server going down or a browser having navigated away from a page.';
        else if (event.code == 1002)
          reason = "An endpoint is terminating the connection due to a protocol error";
        else if (event.code == 1003)
          reason =
            "An endpoint is terminating the connection because it has received a type of data it cannot accept (e.g., an endpoint that understands only text data MAY send this if it receives a binary message).";
        else if (event.code == 1004)
          reason = "Reserved. The specific meaning might be defined in the future.";
        else if (event.code == 1005) reason = "No status code was actually present.";
        else if (event.code == 1006)
          reason =
            "The connection was closed abnormally, e.g., without sending or receiving a Close control frame";
        else if (event.code == 1007)
          reason =
            "An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [https://www.rfc-editor.org/rfc/rfc3629] data within a text message).";
        else if (event.code == 1008)
          reason =
            'An endpoint is terminating the connection because it has received a message that "violates its policy". This reason is given either if there is no other sutible reason, or if there is a need to hide specific details about the policy.';
        else if (event.code == 1009)
          reason =
            "An endpoint is terminating the connection because it has received a message that is too big for it to process.";
        else if (event.code == 1010)
          // Note that this status code is not used by the server, because it can fail the WebSocket handshake instead.
          reason =
            "An endpoint (client) is terminating the connection because it has expected the server to negotiate one or more extension, but the server didn't return them in the response message of the WebSocket handshake. <br /> Specifically, the extensions that are needed are: " +
            event.reason;
        else if (event.code == 1011)
          reason =
            "A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.";
        else if (event.code == 1015)
          reason =
            "The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified).";
        else reason = "Unknown reason";
        if (process.env.VUE_APP_IS_DEBUG) console.log("[REASON] " + reason);
      };
    },

    setInitMap(list) {
      this.waitForCondition("kakaomapLoaded").then(() => {
        if (list.length == 0) {
          this.loading = false;
          return;
        }
        let sw = new window.kakao.maps.LatLng(list[0].lat - 0.02, list[0].lng - 0.02);
        let ne = new window.kakao.maps.LatLng(list[0].lat + 0.02, list[0].lng + 0.02);
        let bounds = new window.kakao.maps.LatLngBounds(sw, ne);

        for (let i = 1; i < list.length; i++) {
          bounds.extend(new window.kakao.maps.LatLng(list[i].lat, list[i].lng));
        }

        this.map.panTo(bounds);
        this.loading = false;
      });
    },
    waitForCondition(variable) {
      function waitFor(result) {
        if (result) {
          return result;
        }
        return new Promise((resolve) => setTimeout(resolve, 100))
          .then(() => Promise.resolve(window[variable]))
          .then((res) => waitFor(res));
      }
      return waitFor();
    },
    loadKakaoMapScript() {
      const script = document.createElement("script");
      console.log(process.env.VUE_APP_KAKAO_MAP_APPKEY);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
        process.env.VUE_APP_KAKAO_MAP_APPKEY +
        "&autoload=false";
      document.head.appendChild(script);
      script.onload = () => window.kakao.maps.load(this.loadKakaoMap);
    },
    loadKakaoMap() {
      const mapContainer = this.$refs.map;
      let mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 4, // 지도의 확대 레벨
        mapTypeId: window.kakao.maps.MapTypeId.ROADMAP, // 지도종류
      };

      this.map = new window.kakao.maps.Map(mapContainer, mapOption);
      window.kakaomapLoaded = true;

      // 애니메이션
    },
    onDrag({ target, transform }) {
      target.style.transform = transform;
    },
    onScale({ target, drag }) {
      target.style.transform = drag.transform;
    },
    onRotate({ target, drag }) {
      target.style.transform = drag.transform;
    },
    onMinimize() {
      this.$refs.chat.style.transition = "all ease-in-out 0.3s";
      let params = { target: this.$refs.chat, transform: "translate(0, 400px)" };
      this.onDrag(params);
      setTimeout(() => {
        this.$refs.chat.style.transition = "";
      }, 300);
    },
    onMaximize() {
      this.$refs.chat.style.transition = "all ease-in-out 0.3s";
      let params = { target: this.$refs.chat, transform: "translate(750px, -230px)" };
      this.onDrag(params);
      setTimeout(() => {
        this.$refs.chat.style.transition = "";
      }, 300);
    },
    onClickSearchBtn() {
      if (document.querySelector("#sidebar-1").style.display == "none") {
        document.querySelector("#btn-search-sidebar").click();
      }
      this.$emit("search-latlng", this.map.getBounds());
    },
    resetMarkers() {
      for (let i = 0; i < this.curCourseMarkers.length; i++) this.curCourseMarkers[i].setMap(null);
      this.curCourseMarkers = [];
      if (this.curPolyLine != null) this.curPolyLine.setMap(null);
    },
    setMarkers(courseInfo) {
      this.waitForCondition("kakaomapLoaded").then(() => {
        let curPolyLinePath = [];
        for (let i = 0; i < courseInfo.course[courseInfo.idx].length; i++) {
          let pos = new window.kakao.maps.LatLng(
            courseInfo.course[courseInfo.idx][i].attractionDto.latitude,
            courseInfo.course[courseInfo.idx][i].attractionDto.longitude
          );
          curPolyLinePath.push(pos);

          let content = `<div style="position:relative;"><svg style="filter: drop-shadow(0px 0px 5px rgb(0 0 0 / 0.6));" xmlns="http://www.w3.org/2000/svg" fill="#0395a5" width="50px" height="50px" viewBox="0 0 1920 1920">
    <path d="M956.952 0c-362.4 0-657 294.6-657 656.88 0 180.6 80.28 347.88 245.4 511.56 239.76 237.96 351.6 457.68 351.6 691.56v60h120v-60c0-232.8 110.28-446.16 357.6-691.44 165.12-163.8 245.4-331.08 245.4-511.68 0-362.28-294.6-656.88-663-656.88" fill-rule="evenodd"/>

</svg><span style="position:absolute; top:10%; left:50%;font-family:'NanumSquareNeo-ExtraBold';color:white;
    transform: translate(-50%, 0);">${i + 1}</span></div>`;
          let newMarker = new window.kakao.maps.CustomOverlay({
            position: pos,
            content: content,
            yAnchor: 1,
          });
          // let newMarker = new window.kakao.maps.Marker({
          // position: pos,
          // });
          newMarker.setMap(this.map);
          this.curCourseMarkers.push(newMarker);
        }

        if (this.curPolyLine != null) this.curPolyLine.setMap(null);

        this.curPolyLine = new window.kakao.maps.Polyline({
          path: curPolyLinePath,

          strokeWeight: 5, // 선의 두께 입니다
          strokeColor: "#0395a5", // 선의 색깔입니다
          strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: "solid", // 선의 스타일입니다
        });
        this.curPolyLine.setMap(this.map);
      });
    },
    setMarker(LatLngAndInfo) {
      if (this.curWindow != null) this.curWindow.close();
      let pos = new window.kakao.maps.LatLng(LatLngAndInfo.lat, LatLngAndInfo.lng);

      this.map.setCenter(pos);

      let infoContent = document.createElement("div");
      infoContent.classList.add(
        "p-2",
        "d-inline-block",
        "text-left",
        "m-1",
        "mb-2",
        "info-container"
      );
      infoContent.setAttribute("id", "info-container");

      let infoRowTop = document.createElement("div");
      infoRowTop.classList.add(
        "pl-3",
        "pr-3",
        "row",
        "flex-row",
        "flex-nowrap",
        "justify-content-between",
        "attr"
      );

      let infoRowBottom = document.createElement("div");
      infoRowBottom.classList.add(
        "pl-4",
        "pr-4",
        "mt-2",
        "row",
        "flex-row",
        "flex-nowrap",
        "justify-content-between"
      );

      let infoAddPathBtn = document.createElement("button");
      infoAddPathBtn.classList.add("btn", "btn-outline-primary", "btn-rad");
      infoAddPathBtn.innerHTML = "경로에 추가";
      infoAddPathBtn.addEventListener("click", () => {
        this.addPath(LatLngAndInfo.attr);
      });
      let infoCloseBtn = document.createElement("button");
      infoCloseBtn.classList.add("btn", "btn-outline-secondary", "mr-2", "btn-rad");
      infoCloseBtn.innerHTML = "닫기";
      infoCloseBtn.addEventListener("click", () => {
        this.closeInfo();
      });

      infoRowBottom.append(infoCloseBtn, infoAddPathBtn);

      let infoLeft = document.createElement("div");

      let infoLeftBottom = document.createElement("div");
      let infoTitle = document.createElement("h5");
      infoTitle.classList.add("attr-title");
      infoTitle.innerHTML = LatLngAndInfo.attr.title;
      let infoAddr = document.createElement("h6");
      infoAddr.classList.add("small-font");
      infoAddr.innerHTML = LatLngAndInfo.attr.addr1 + " " + LatLngAndInfo.attr.addr2;
      let infoContentType = document.createElement("h6");
      infoContentType.innerHTML = this.getContentType(LatLngAndInfo.attr.contentTypeId);
      infoContentType.classList.add("small-font");
      let infoReview = document.createElement("a");
      infoReview.innerHTML = "리뷰 보기 >";
      infoReview.classList.add("small-font", "none-deco", "text-right", "d-block", "pr-2");

      let infoRight = document.createElement("div");
      infoRight.classList.add("p-2");
      let infoImg = document.createElement("img");
      infoImg.src = LatLngAndInfo.attr.firstImage;
      infoImg.width = 100;
      infoImg.style = "aspect-ratio:1";

      infoLeftBottom.append(infoContentType, infoAddr, infoReview);
      infoLeft.append(infoTitle, infoLeftBottom);
      infoLeft.classList.add(
        "p-1",
        "pl-3",
        "pr-3",
        "row",
        "flex-column",
        "flex-wrap",
        "justify-content-between"
      );

      infoRight.append(infoImg);
      infoRowTop.append(infoLeft, infoRight);
      infoContent.append(infoRowTop, infoRowBottom);

      this.curWindow = new window.kakao.maps.InfoWindow({
        position: pos,
        content: infoContent,
      });

      this.curWindow.open(this.map);
    },
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
    closeInfo() {
      this.curWindow.close();
    },
    addPath(info) {
      this.$emit("add-path", info);
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep {
  #info-container {
    margin-top: 1px;
  }
}

#map {
  background-color: black;
  margin: 0;
  padding: 0;
}
.map-btn:hover,
.map-btn button:hover,
.map-btn button svg:hover {
  color: rgba(0, 0, 0, 0.7);
}
.map-btn:focus,
.map-btn button:focus,
.map-btn button svg:focus {
  color: rgba(0, 0, 0, 0.7);
}

.chatting-header {
  width: 20%;
  text-align: left;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px solid rgba(33, 33, 53, 0.4);
  padding: 6px 10px;
  background-color: white;
  // border-bottom-left-radius: 10px;
  // border-bottom-right-radius: 10px;
}

.moveable-control-box {
  --moveable-color: transparent !important;
}

::v-deep {
  .attr-title {
    font-family: "NanumSquareNeo-ExtraBold" !important;
  }
  .attr {
    font-family: "NanumSquareNeo-Thin";
  }
  .small-font {
    font-size: smaller;
    margin: 0px;
    padding: 0px;
  }
  .none-deco,
  .none-deco:hover {
    text-decoration: none;
  }
  .moveable-control.moveable-origin,
  .moveable-control,
  .moveable-origin {
    border-color: transparent !important;
    background: transparent !important;
  }
  .btn-rad {
    border-radius: 20px;
  }
}
</style>
