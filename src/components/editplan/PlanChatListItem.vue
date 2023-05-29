<template>
  <div id="chat-item-container" class="p-2 notice-container" v-if="chat.type == 'notice'">
    <div class="d-block content text-center">
      <img :src="emojis[chat.emojiIdx]" width="25px" class="mr-1" style="aspect-ratio: 1" />{{
        chat.content
      }}
    </div>
  </div>
  <div v-else id="chat-item-container" class="p-2 chat-container">
    <img :src="emojis[chat.emojiIdx]" width="25px" class="ml-1 mr-1" style="aspect-ratio: 1" /><span
      style="font-size: 11pt"
      >{{ chat.username }}</span
    >
    <div class="content" style="font-size: 10pt">{{ chat.content }}</div>
  </div>
</template>

<script>
export default {
  name: "PlanChatListItem",
  props: {
    chat: Object,
  },
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
    };
  },
};
</script>

<style scoped>
.chat-container {
  font-family: "NanumSquareNeo-Normal";
}

#chat-item-container {
  border: 1px solid rgba(33, 33, 53, 0.125);
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 15px;
  margin-top: 5px;
  box-shadow: 0px 0px 5px 0px rgba(33, 33, 53, 0.125);
  color: rgba(0, 0, 0, 0.8);
}

.content {
  padding: 5px;
}

.notice-container {
  font-family: "NanumSquareNeo-ExtraBold";
  background: linear-gradient(rgba(188, 195, 223, 0.45), rgba(245, 143, 128, 0.25));
  color: rgba(0, 0, 0, 0.5);
}
</style>
