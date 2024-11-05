import { createStore } from 'vuex';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io("http://localhost:3000");

const store = createStore({
    state: {
        messages: {}, socket,
        username: '',
        chats: [],
        currentChat: null,
    },
    mutations: {
        setUsername(state, username) {
            state.username = username;
        },
        addMessage(state, { chatId, message }) {
            if (!state.messages[chatId]) {
                state.messages[chatId] = [];
            }
            state.messages[chatId].push(message);
        },
        setMessages(state, { chatId, messages }) {
            state.messages[chatId] = messages;
        },
        setChats(state, chats) {
            state.chats = chats;
        },
        addChat(state, chat) {
            state.chats.push(chat);
        },
        setCurrentChat(state, chatId) {
            state.currentChat = chatId; // Establece el chat actual
        }
    },
    actions: {
        fetchMessages({ commit }, chatId) {
            axios.get(`http://localhost:3000/api/chats/${chatId}/messages`)
                .then(response => {
                    commit('setMessages', { chatId, messages: response.data });
                })
                .catch(error => {
                    console.error("Error al obtener mensajes:", error);
                });
        },
        sendMessage({ state }, { chatId, message }) {
            const data = { chatId, username: state.username, message };
            socket.emit("sendMessage", data);
        },
        fetchChats({ commit }) {
            axios.get("http://localhost:3000/api/chats")
                .then(response => {
                    commit('setChats', response.data);
                })
                .catch(error => {
                    console.error("Error al obtener chats:", error);
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
        }
    },
    getters: {
        getMessages: (state) => (chatId) => {
            return state.messages[chatId] || [];
        },
        getChats(state) {
            return state.chats;
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
