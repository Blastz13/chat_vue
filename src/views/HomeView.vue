<template>
  <div class="container">
    <div class="wrap_container">
      <h2>Chat Rooms</h2>
      <div class="chat_room">
        <search-list-chat-rooms :listChatRooms="listChatRooms"></search-list-chat-rooms>
        <connect-list-chat-rooms :listEnteredChatRooms="listEnteredChatRooms"></connect-list-chat-rooms>
      </div>
    </div>
  </div>
</template>

<script>
import MyInput from "@/components/MyInput";
import MyButton from "@/components/MyButton";
import axios from "axios";
import SearchListChatRooms from "@/components/SearchListChatRooms";
import ConnectListChatRooms from "@/components/ConnectListChatRooms";

export default {
  components: {ConnectListChatRooms, SearchListChatRooms, MyButton, MyInput},
  data() {
    return {
      listChatRooms: [],
      listEnteredChatRooms: [],
    }
  },
  methods: {
    async fetchListChatRooms() {
      const response = await axios.get('http://127.0.0.1:8000/chat/chat_room/', {headers: {Authorization: `Bearer ${this.$store.getters.getToken}`}});
      this.listChatRooms = response.data;
    },
    async fetchListEnteredChatRooms() {
      const response = await axios.get('http://127.0.0.1:8000/chat/chat_room/entered/', {headers: {Authorization: `Bearer ${this.$store.getters.getToken}`}});
      this.listEnteredChatRooms = response.data;
    }
  },
  created() {
  },
  mounted() {
    this.fetchListChatRooms();
    this.fetchListEnteredChatRooms();
  },
  watch: {
  },
  computed: {

  }
}
</script>

<style scoped>
.wrap_container {
  width: 800px;
  height: 500px;
  background: white;
  border-radius: 15px;
  padding: 15px;
}

.container{
  margin-top: 15%;
}

.chat_room {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

h2{
  text-align: center;
  color: #75d0ab;
  font-size: 40px;
  text-shadow: 2px 2px 2px #c0c0c0;
  padding: 5px;
}

</style>