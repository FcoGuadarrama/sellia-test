import { createStore } from 'vuex';
import io from 'socket.io-client';
import axios from 'axios';
import {nextTick} from "vue";

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
        messageContainer: 'messageContainer',
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
                console.log("mensaje enviado desde el servidor: ", message);
                socket.emit('sendMessage', { chatId, message, sender, timestamp: Date.now() });
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
        selectChat({ commit }, chatId) {
            commit('setCurrentChat', chatId);
            commit('fetchMessages', chatId);
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
                return response.data.exists;
            } catch (error) {
                console.error("Error al verificar existencia de chat:", error);
                return false;
            }
        },
        scrollToBottom({ state }) {
            nextTick(() => {
                const messageContainer = document.getElementById(state.messageContainer);
                if (messageContainer) {
                    messageContainer.scrollTop = messageContainer.scrollHeight;
                }
            });
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
            return state.currentChat;
        }
    }
});

socket.on("receiveMessage", (message) => {
    console.log("Mensaje recibido desde el socket:", message);
    store.commit("addMessage", message);
    store.dispatch('scrollToBottom');
});

export default store;
