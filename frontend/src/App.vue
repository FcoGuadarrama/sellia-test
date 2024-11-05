<template>
<main>
  <RouterView />
</main>
</template>

<script setup>
import { ref, computed } from 'vue';
import store from './store';
const usernameInput = ref('');
const username = computed(() => store.state.username);

function handleSetUsername() {
  store.commit('setUsername', usernameInput.value);  // Use `store.commit` to call the mutation
}
</script>
