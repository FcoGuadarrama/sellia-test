<template>
  <div class="sidebar hidden lg:flex w-1/3 flex-2 flex-col pr-6">
    <div class="flex-1 h-full overflow-auto px-2 bg-gray-800 text-white">
      <div>
        <label for="userSelect" class="text-gray-300">Iniciar chat con:</label>
        <select id="userSelect" v-model="newUser" class="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2">
          <option value="">Selecciona un usuario</option>
          <option v-for="user in users" :key="user._id" :value="user._id">
            {{ user.username }}
          </option>
        </select>
      </div>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <button @click="createChat" class="mt-4 bg-blue-600 text-white hover:bg-blue-500 rounded px-4 py-2">
        Iniciar Chat
      </button>

      <div v-for="chat in chats"
           @click="selectChat(chat)"
           class="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-gray-700 mb-4 rounded p-4 flex shadow-md hover:bg-gray-600"
      >
        <div class="flex-1 px-2">
          <div class="truncate w-32"><span class="text-gray-200">{{ getParticipantsUsernames(chat) }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const newUser = ref('');
const errorMessage = ref('');

const chats = computed(() => store.state.chats);
const users = computed(() => store.state.users);
const userId = localStorage.getItem('userId');


onMounted(() => {
  fetchChats();
  fetchUsers();
});

const fetchChats = async () => {
  try {
    const userId = localStorage.getItem('userId');
    if (userId) {
      await store.dispatch('fetchChats', userId);
    }
  } catch (error) {
    console.error('Error fetching chats:', error);
  }
};

const fetchUsers = async () => {
  try {
    await store.dispatch('fetchUsersToChatWith');
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const createChat = async () => {
  if (!newUser.value) return;

  try {
    const chatExists = await store.dispatch('checkChatExists', { userId: newUser.value, currentUserId: userId });

    if (chatExists) {
      errorMessage.value = 'Ya existe un chat con este usuario.';
      return;
    }

    const newChat = await store.dispatch('createChat', { userId: newUser.value });

    if (newChat) {
      store.commit('addChat', newChat);
      newUser.value = '';
      errorMessage.value = '';
    } else {
      console.error('No se pudo crear el chat, newChat es undefined.');
    }
  } catch (error) {
    console.error('Error al crear chat:', error);
    errorMessage.value = 'Error al crear el chat. Por favor, inténtalo de nuevo.';
  }
};

const selectChat = async (chat) => {
  store.commit('setCurrentChat', chat);
  await store.dispatch('fetchMessages', chat._id);
};

const getParticipantsUsernames = (chat) => {
  if (!chat || !chat.participants) {
    return 'Error';
  }

  if (Array.isArray(chat.participants) && chat.participants.length > 0) {
    const otherParticipantId = chat.participants.find(id => id !== userId);

    console.log(otherParticipantId);

    if (typeof otherParticipantId === 'object' && otherParticipantId.hasOwnProperty('username')) {
      return otherParticipantId.username;
    } else {
      const user = users.value.find(u => u._id === otherParticipantId);
      return user.username;
    }
  }

  return '';
};

</script>
