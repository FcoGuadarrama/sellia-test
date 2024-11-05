<template>
  <div>
    <h2>Lista de Chats</h2>
    <ul>
      <li v-for="chat in chats" :key="chat._id" @click="selectChat(chat)">
        Chat con {{ chat.participants.map(p => p.username).join(', ') }}
      </li>
    </ul>
    <input v-model="newUser" placeholder="Nombre de usuario para nuevo chat" />
    <button @click="createChat">Iniciar Chat</button>
  </div>
</template>

<script setup>
import {computed, ref, onMounted} from 'vue';
import {useStore} from 'vuex';

const store = useStore();

// Reactive reference to hold the new user's name
const newUser = ref('');

// Computed property to get chats from Vuex state
const chats = computed(() => store.state.chats);

// Lifecycle hook to fetch chats when the component is mounted
onMounted(() => {
  fetchChats();
});

// Function to fetch chats from the store
const fetchChats = async () => {
  try {
    await store.dispatch('fetchChats');
  } catch (error) {
    console.error('Error fetching chats:', error);
  }
};

// Function to create a new chat with the provided username
const createChat = async () => {
  if (!newUser.value) return; // Do not proceed if the input is empty

  try {
    // Dispatch action to create a new chat with the new user
    await store.dispatch('createChat', [newUser.value]);
    newUser.value = ''; // Clear the input after successful chat creation
  } catch (error) {
    console.error('Error al crear chat:', error);
  }
};

// Function to select a chat and set it as the current chat in Vuex state
const selectChat = (chat) => {
  store.commit('setCurrentChat', chat);
};
</script>

<style scoped>
/* Add your styles here for better UI */
h2 {
  margin-bottom: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  cursor: pointer;
  padding: 0.5rem;
  border: 1px solid #ccc;
  margin: 0.5rem 0;
}

li:hover {
  background-color: #f0f0f0;
}

input {
  margin-right: 0.5rem;
}
</style>
