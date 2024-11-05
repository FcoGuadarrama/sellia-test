<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside class="w-1/4 bg-gray-100 p-4">
      <button @click="showUserList = !showUserList" class="mb-4 p-2 bg-blue-500 text-white rounded">
        Add New Chat
      </button>
      <ChatList />

      <!-- User List Modal -->
      <div v-if="showUserList" class="absolute bg-white shadow-lg p-4 rounded">
        <h3 class="font-bold">Select Users</h3>
        <ul>
          <li v-for="user in users" :key="user._id" @click="createChat(user)" class="cursor-pointer hover:bg-gray-200 p-2">
            {{ user.username }}
          </li>
        </ul>
      </div>
    </aside>

    <!-- Chat Messages -->
    <div class="flex-1 p-4 overflow-y-auto">
      <div class="max-h-screen overflow-y-auto">
        <div v-for="msg in messages" :key="msg._id" class="overflow-y-auto">
          <div class="message mb-4 flex" v-if="msg.username !== username">
            <div class="flex-1 px-2">
              <div class="inline-block bg-gray-300 rounded-full p-2 px-6 text-gray-700">
                <span>{{ msg.message }}</span>
              </div>
              <div class="pl-4">
                <small class="text-gray-500">{{ new Date(msg.timestamp).toLocaleString() }}</small>
              </div>
            </div>
          </div>
          <div class="message me mb-4 flex text-right" v-if="msg.username === username">
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import store from '../store';
import ChatList from "./chats/ChatList.vue";

const message = ref('');
const messages = computed(() => store.state.messages);
const username = computed(() => store.state.username);
const showUserList = ref(false);
const users = ref([]); // Store users for creating new chat

async function fetchUsers() {

  try {
    const response = await fetch('/api/users');
    if (response.ok) {
      users.value = await response.json();
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

function createChat(user) {
  console.log('Creating chat with:', user);
  showUserList.value = false;
}

function handleSendMessage() {
  if (message.value.trim()) {
    store.dispatch('sendMessage', message.value);
    message.value = '';
  }
}

onMounted(() => {
  store.dispatch('fetchMessages');
  fetchUsers();
});
</script>