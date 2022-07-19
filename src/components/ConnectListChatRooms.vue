<template>
  <div class="connect_chat_rooms">
    <div class="connect_list_chat_rooms">
      <item-list-chat-room v-for="item in listEnteredChatRooms"
                           :key="item.id"
                           :item="item"
                           @onClickItem="connectToChatRoom">
        <template v-slot:btn_title>Connect</template>
      </item-list-chat-room>
    </div>
  </div>
</template>

<script>
import SearchListChatRooms from "@/components/SearchListChatRooms";
import MyButton from "@/components/MyButton";
import MyInput from "@/components/MyInput";
import ItemListChatRoom from "@/components/ItemListChatRoom";

export default {
  components: {SearchListChatRooms, MyButton, MyInput, ItemListChatRoom},
  name: "ConnectListChatRooms",
  props: {
    listEnteredChatRooms: {
      type: [],
      required: true
    }
  },
  methods: {
    connectToChatRoom(item) {
      this.$router.push({ name: 'chatRoom', params: { chat_id: item.id } })
    }
  }
}
</script>

<style scoped>
.connect_list_chat_rooms {
  overflow-y: scroll; height: 420px;
}
.connect_chat_rooms {
  width: 48%;
  height: 400px;
}

@media screen and (max-width: 650px) {
  .connect_chat_rooms {
    width: 100%;
    margin-top: 20px;
  }

  .connect_list_chat_rooms {
    overflow-y: scroll; height: 170px;
  }
}
</style>