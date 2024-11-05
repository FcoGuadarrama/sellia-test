<template>
  <div class="px-6 h-screen py-20 md:px-12 lg:px-20 flex items-center justify-center">
    <div class="p-12 shadow text-center lg:w-[30rem] backdrop-blur-md rounded-xl bg-[rgba(255,255,255,0.1)]">
      <div class="text-center mb-8">
        <svg class="mb-4 mx-auto fill-surface-600 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ChatIcon></ChatIcon>
        </svg>
        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Create Your Account</div>
        <span class="text-surface-600 dark:text-surface-200 font-medium leading-normal">Already have an account?</span>
        <a @click="goToLogin" class="font-medium underline ml-2 text-primary cursor-pointer">Sign In</a>
      </div>
      <div>
        <label for="username" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Username</label>
        <InputText v-model="username" id="username" type="text" placeholder="Username" class="w-full mb-4"/>

        <label for="password" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Password</label>
        <InputText v-model="password" id="password" type="password" placeholder="Password" class="w-full mb-4"/>

        <Button @click="handleRegister" label="Register" class="bg-primary text-white font-medium py-2 px-4 rounded w-full"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import ChatIcon from "../assets/ChatIcon.vue";

const username = ref('')
const email = ref('')
const password = ref('')

const router = useRouter()

const handleRegister = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/register', {
      username: username.value,
      email: email.value,
      password: password.value
    })

    localStorage.setItem('token', response.data.token)

    await router.push('/dashboard')
  } catch (error) {
    console.error('Error en el registro:', error.response?.data?.error || error.message)
    alert(error.response?.data?.error || error.message)
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
</style>
