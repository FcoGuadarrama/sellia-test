<template>
  <div class="bg-black">
    <h2>Lista de Chats</h2>
    <ul>
      <li v-for="chat in chats" :key="chat._id" @click="selectChat(chat)"> <!-- Llama a selectChat aquí -->
        Chat con {{ chat.participants.map(p => p.username).join(', ') }}
      </li>
    </ul>

    <!-- Select para elegir un usuario para iniciar un nuevo chat -->
    <div>
      <label for="userSelect">Iniciar chat con:</label>
      <select id="userSelect" v-model="newUser">
        <option value="">Selecciona un usuario</option>
        <option v-for="user in users" :key="user._id" :value="user._id">
          {{ user.username }}
        </option>
      </select>
    </div>

    <button @click="createChat">Iniciar Chat</button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Reactive references
const newUser = ref('');
const errorMessage = ref('');

// Computed properties to get chats and users from Vuex state
const chats = computed(() => store.state.chats);
const users = computed(() => store.state.users);

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
    const userId = localStorage.getItem('userId');
    const chatExists = await store.dispatch('checkChatExists', { userId: newUser.value, currentUserId: userId });

    if (chatExists) {
      errorMessage.value = 'Ya existe un chat con este usuario.';
      return;
    }

    await store.dispatch('createChat', { userId: newUser.value });
    newUser.value = '';
    errorMessage.value = '';
    await fetchChats();
  } catch (error) {
    console.error('Error al crear chat:', error);
    errorMessage.value = 'Error al crear el chat. Por favor, inténtalo de nuevo.';
  }
};

const selectChat = async (chat) => {
  store.commit('setCurrentChat', chat);
  await store.dispatch('fetchMessages', chat._id);
};
</script>
