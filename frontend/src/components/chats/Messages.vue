<script setup>
import { computed, ref } from "vue";
import store from "../../store.js";

const messages = computed(() => store.state.messages)

const username = computed(() => store.state.username);
const message = ref('');
const userLogged = localStorage.getItem('userId')

function handleSendMessage() {
  const chatId = store.state.currentChat._id;
  console.log(message.value);
  if (message.value.trim() && chatId) {
    store.dispatch('sendMessage', { chatId, message: message.value , sender: userLogged});
    message.value = ''; // Limpiar el campo de entrada
  }
}

const isMessageFromUser = (msg) => {
  if (msg.sender._id) {
    return msg.sender._id === userLogged;
  }

  return msg.sender === userLogged;
};

</script>

<template>
  <div class="max-h-screen overflow-y-auto">
    <div v-for="msg in messages" :key="msg._id" class="overflow-y-auto">
      <div class="message mb-4 flex" v-if="!isMessageFromUser(msg)">
        <div class="flex-1 px-2">
          <div class="inline-block bg-gray-300 rounded-full p-2 px-6 text-gray-700">
            <span>{{ msg.message }}</span>
          </div>
          <div class="pl-4">
            <small class="text-gray-500">{{ new Date(msg.timestamp).toLocaleString() }}</small>
          </div>
        </div>
      </div>
      <div class="message me mb-4 flex text-right" v-if="isMessageFromUser(msg)">
        <div class="flex-1 px-2">
          <div class="inline-block bg-blue-600 rounded-full p-2 px-6 text-white">
            <span>{{ msg.message }}</span>
          </div>
          <div class="pr-4">
            <small class="text-gray-500">{{ new Date(msg.timestamp).toLocaleString() }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex-2 pt-4 pb-0">
    <div class="write bg-white shadow flex rounded-lg">
      <div class="flex-1">
        <input v-model="message" class="w-full block outline-none py-4 px-4 bg-transparent" @keyup.enter="handleSendMessage" placeholder="Escribe un mensaje..." />
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
</template>

<style scoped>
/* Tu estilo aquí */
</style>
