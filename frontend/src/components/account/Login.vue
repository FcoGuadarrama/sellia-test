<template>
  <div
      class="px-6 h-screen py-20 md:px-12 lg:px-20 flex items-center justify-center"
  >
    <div class="p-12 shadow text-center lg:w-[30rem] backdrop-blur-md rounded-xl bg-[rgba(255,255,255,0.1)]">
      <div class="text-center mb-8">
        <ChatIcon></ChatIcon>
        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome Back</div>
        <span class="text-surface-600 dark:text-surface-200 font-medium leading-normal">Don't have an account?</span>
        <a @click="goToRegister"  class="font-medium underline ml-2 text-primary cursor-pointer">Create today!</a>
      </div>
      <div>
        <label for="email1" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Username</label>
        <InputText id="username" type="text" placeholder="Username" class="w-full mb-4" v-model="username"/>

        <label for="password1" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Password</label>
        <InputText v-model="password" id="password" type="password" placeholder="Password" class="w-full mb-4"/>

        <!--        <div class="flex items-center justify-between mb-12">-->
        <!--          <div class="flex items-center">-->
        <!--            <Checkbox id="rememberme1" v-model="checked1" :binary="true" class="mr-2" />-->
        <!--            <label for="rememberme1">Remember me</label>-->
        <!--          </div>-->
        <!--          <a class="font-medium no-underline ml-2 text-primary text-right cursor-pointer">Forgot password?</a>-->
        <!--        </div>-->

        <Button label="Sign In" @click="handleLogin" icon="pi pi-user" class="w-full"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import { ref } from 'vue'
import axios from 'axios'
import {useRoute, useRouter} from 'vue-router'
import ChatIcon from "../assets/ChatIcon.vue";

const router = useRouter()
const route = useRoute()

const checked1 = ref(true);

const username = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/login', {
      username: username.value,
      password: password.value
    })

    localStorage.setItem('token', response.data.token)
    localStorage.setItem('userId', response.data.userId)


    await router.push('/')
  } catch (error) {
    console.error('Error en el inicio de sesión:', error.response?.data?.error || error.message)
    alert('Credenciales inválidas. Inténtalo de nuevo.')
  }
}

const goToRegister = () => {
  router.push('/register')
}
</script>
