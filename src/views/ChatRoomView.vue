<template>
  <div class="container">
    <div class="wrap_container">
      <div class="chat_block" ref="chatContainer">
        <item-message-chat v-for="item in getListMessages"
                                  :item="item"/>
      </div>
      <form @submit.prevent>
        <div class="action_chat">
            <my-input class="input_message" style="height: 50px;" placeholder="Message..." v-model="userMessage"></my-input>
            <my-button style="height: 50px; margin-left: 10px;" @click="sendMessage">Send</my-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import MyInput from "@/components/MyInput";
import MyButton from "@/components/MyButton";
import ItemMessageChat from "@/components/ItemMessageChat";

export default {
  components: {ItemMessageChat, MyButton, MyInput},
  data() {
    return {
      listMessages: [],
      userMessage: ""
    }
  },
  methods: {
    connectWebSocket() {
      this.chatSocket = new WebSocket(`ws://localhost:8000/chat/ws/` + this.$route.params.chat_id + "/" + this.$store.getters.getToken);
      this.chatSocket.onopen = () => {
        console.log("WS connect");
        this.chatSocket.onmessage = ({data}) => {
          this.listMessages.push(JSON.parse(data));
          this.scrollToDown();
        };
      };
    },
    sendMessage() {
      this.chatSocket.send(this.userMessage);
      this.userMessage = "";
    },
    scrollToDown() {
      let container = this.$refs.chatContainer;
      container.scrollTop = container.scrollHeight;
    }
  },
  created() {
    this.connectWebSocket();
  },
  mounted() {
  },
  computed: {
    getListMessages() {
      return this.listMessages;
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 5%;
}

.wrap_container {
  width: 800px;
  background: white;
  border-radius: 15px;
  padding: 25px;
  -webkit-box-shadow: 18px 23px 30px -20px rgba(34, 60, 80, 0.7);
  -moz-box-shadow: 18px 23px 30px -20px rgba(34, 60, 80, 0.7);
  box-shadow: 18px 23px 30px -20px rgba(34, 60, 80, 0.7);
}

.chat_block {
  width: 100%;
  overflow-y: scroll; height: 500px;
}

.action_chat {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.input_message {
  background-color: #f8f8f8;
  border: 2px solid #ccc !important;
  height: 50px;
}

h2{
  text-align: center;
  color: #75d0ab;
  font-size: 40px;
  text-shadow: 2px 2px 2px #c0c0c0;
}
</style>