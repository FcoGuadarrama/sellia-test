<script setup>
import {computed, nextTick, onMounted, ref, watch} from "vue";
import store from "../../store.js";

const messages = computed(() => store.state.messages)
const userLogged = localStorage.getItem('userId')


const isMessageFromUser = (msg) => {
  if (msg.sender._id) {
    return msg.sender._id === userLogged;
  }

  return msg.sender === userLogged;
};


onMounted(() => {
  store.dispatch('scrollToBottom');
});

</script>

<template>
    <div id="messageContainer" v-for="msg in messages" :key="msg._id">
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


</template>

<style scoped>
/* Tu estilo aquí */
</style>
