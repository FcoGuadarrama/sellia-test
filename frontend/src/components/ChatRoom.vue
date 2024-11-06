<template>
  <div class="flex h-screen">
    <ChatList @select-chat="selectChat" />


    <div class="flex-1 p-4 flex flex-col"  v-if="currentChat">
      <div id="messageContainer" class="max-h-full overflow-y-auto flex-1">
        <Messages />
      </div>
      <div class="flex-2 pt-4 pb-0">
        <div class="write bg-gray-700 shadow flex rounded-lg">
          <div class="flex-1">
            <input v-model="message" class="w-full block outline-none py-4 px-4 bg-gray-700" @keyup.enter="handleSendMessage" placeholder="Escribe un mensaje..." />
          </div>
          <div class="flex-2 w-32 p-2 flex content-center items-center">
            <div class="flex-1 text-center">
              <button class="bg-blue-400 w-10 h-10 rounded-full inline-block" @click="handleSendMessage">
            <span class="inline-block align-text-bottom">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-4 h-4 text-white">
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, nextTick, onMounted, ref, watch} from 'vue';
import store from '../store';
import ChatList from "./chats/ChatList.vue";
import Messages from "./chats/Messages.vue";

const currentChat = computed(() => store.state.currentChat);
const username = computed(() => store.state.username);
const message = ref('');
const messages = computed(() => store.state.messages);

function selectChat(chat) {
  store.commit('setCurrentChat', chat);
  store.dispatch('fetchMessages', chat._id);
}

function handleSendMessage() {
  const chatId = store.state.currentChat._id;
  if (message.value.trim() && chatId) {
    store.dispatch("sendMessage", { chatId, message: message.value, sender: userLogged })
        .then(() => {
          message.value = "";
          console.log('mensaje enviado')
          store.dispatch('scrollToBottom');
        });
  }
}

const userLogged = localStorage.getItem('userId')

onMounted(() => {
  store.dispatch('scrollToBottom');
});

const isMessageFromUser = (msg) => {
  if (msg.sender._id) {
    return msg.sender._id === userLogged;
  }

  return msg.sender === userLogged;
};


</script>
