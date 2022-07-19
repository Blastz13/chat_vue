<template>
  <div class="search_chat_rooms">
    <div class="action_chat_room">
      <my-input style="" class="search_input" placeholder="Search..." v-model="searchQuery"></my-input>
    </div>
    <div class="search_list_chat_rooms">
      <item-list-chat-room v-for="item in searchedListChatRooms"
                           :key="item.id"
                           :item="item"
                           @onClickItem="joinToChatRoom">
        <template v-slot:btn_title>Join</template>
      </item-list-chat-room>
    </div>
  </div>
</template>

<script>
import MyInput from "@/components/MyInput";
import MyButton from "@/components/MyButton";
import ItemListChatRoom from "@/components/ItemListChatRoom";
import axios from "axios";

export default {
  components: {ItemListChatRoom, MyButton, MyInput},
  name: "SearchListChatRooms",
  data() {
    return {
      searchQuery: ""
    }
  },
  props: {
    listChatRooms: {
      type: [],
      required: true
    }
  },
  methods: {
    joinToChatRoom(item) {
      const response = axios.post('http://127.0.0.1:8000/chat/chat_room/' + item.id, {},
          {headers: {Authorization: `Bearer ${this.$store.getters.getToken}`}})
          .then(() => {
            this.$router.push({name: 'home', params: {chat_id: item.id}});
          })
          .catch((e) => {
            alert(e.toString());
          })
    }
  },
  computed: {
    searchedListChatRooms() {
      return this.listChatRooms.filter(task => task.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  }
}
</script>

<style scoped>
.search_input {
  background-color: #f8f8f8;
  border: 2px solid #ccc !important;
  height: 50px;
}

.search_chat_rooms {
  width: 48%;
}

.action_chat_room {
  display: flex;
  justify-content: space-between;
}

.search_list_chat_rooms {
  overflow-y: scroll; height: 350px;
}

@media screen and (max-width: 650px) {
  .search_chat_rooms {
    width: 100%;
  }

  .search_list_chat_rooms {
    overflow-y: scroll; height: 170px;

  }
}
</style>