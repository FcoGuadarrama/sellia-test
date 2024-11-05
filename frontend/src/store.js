import { createStore } from 'vuex';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io("http://localhost:3000");



const store = createStore({
    state: {
        messages: [],
        socket,
        username: '',
        chatExists: false,
        chats: [],
        users: [],
        currentChat: null,
    },
    mutations: {
        setUsername(state, username) {
            state.username = username;
        },
        setChats(state, chats) {
            state.chats = chats;
        },
        setUsers(state, users) {
            state.users = users;
        },
        setChatExists(state, chatExists) {
            state.chatExists = chatExists;
        },
        addChat(state, chat) {
            state.chats.push(chat);
        },
        setCurrentChat(state, chat) {
            state.currentChat = chat;
        },
        setMessages(state, messages) {
            state.messages = messages;
        },
        clearMessages(state) {
            state.messages = [];
        },
        addMessage(state, message) {
            state.messages.push(message);
        }
    },
    actions: {
        async fetchMessages({ commit }, chatId) {
            commit('clearMessages');
            try {
                const response = await axios.get(`http://localhost:3000/api/chats/${chatId}/messages`);
                const messages = response.data;
                commit('setMessages', messages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        },
        async sendMessage({ commit }, { chatId, message, sender }) {
            try {
                const response = await axios.post("http://localhost:3000/api/messages", { chatId, message, sender });
                commit('addMessage', response.data);
            } catch (error) {
                console.error("Error al enviar mensaje:", error);
            }
        },
        fetchChats({ commit }, userId) {
            axios.get(`http://localhost:3000/api/chats?userId=${userId}`)
                .then(response => {
                    commit('setChats', response.data);
                })
                .catch(error => {
                    console.error("Error al obtener chats:", error.response ? error.response.data : error.message);
                });
        },
        createChat({ commit }, participants) {
            axios.post("http://localhost:3000/api/chats", { participants })
                .then(response => {
                    commit('addChat', response.data);
                })
                .catch(error => {
                    console.error("Error al crear chat:", error);
                });
        },
        // Nueva acción para establecer el chat actual
        selectChat({ commit }, chatId) {
            commit('setCurrentChat', chatId); // Establece el chat actual
            commit('fetchMessages', chatId); // Opcional: obtener mensajes al seleccionar el chat
        },
        fetchUsersToChatWith({ commit }) {
            axios.get('http://localhost:3000/api/users')
                .then(response => {
                    commit('setUsers', response.data)
                }).catch(error => {
                    console.error("Error al obtener usuarios: ", error);
            })
        },
        async checkChatExists({ }, { userId, currentUserId }) {
            try {
                const response = await axios.get(`http://localhost:3000/api/chats/exist?userId=${userId}&currentUserId=${currentUserId}`);
                return response.data.exists; // Retorna el booleano directamente
            } catch (error) {
                console.error("Error al verificar existencia de chat:", error);
                return false; // Considera que no existe si hay error
            }
        },
    },
    getters: {
        getMessages: (state) => (chatId) => {
            return state.messages[chatId] || [];
        },
        getChats(state) {
            return state.chats;
        },
        getUsers(state) {
            return state.users;
        },
        getCurrentChat(state) {
            return state.currentChat; // Getter para obtener el chat actual
        }
    }
});

socket.on("receiveMessage", (message) => {
    const { chatId } = message;
    store.commit("addMessage", { chatId, message });
});

export default store;
