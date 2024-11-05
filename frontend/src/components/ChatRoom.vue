<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside class="w-1/4 bg-gray-100 p-4">
      <ChatList @select-chat="selectChat" /> <!-- Emitir evento cuando se seleccione un chat -->
    </aside>

    <!-- Chat Messages -->
    <div class="flex-1 p-4 overflow-y-auto" v-if="currentChat">
      <Messages></Messages>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import store from '../store';
import ChatList from "./chats/ChatList.vue";
import Messages from "./chats/Messages.vue";

const currentChat = computed(() => store.state.currentChat);

function selectChat(chat) {
  store.commit('setCurrentChat', chat);
  store.dispatch('fetchMessages', chat._id);
}

</script>
