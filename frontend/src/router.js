import { createWebHistory, createRouter } from 'vue-router';
import Login from './components/account/Login.vue';
import NotFound from './components/errors/NotFound.vue';
import ChatRoom from './components/ChatRoom.vue';
import Register from "./components/account/Register.vue";

const routes = [
    { path: '/', name: 'Home', component: ChatRoom, meta: {requiresAuth: true} },
    { path: '/login', name: 'Login', component: Login, meta: {authenticated: true} },
    { path: '/register', name: 'Register', component: Register, meta: {authenticated: true} },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');
    console.log(to.meta.aut);
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else if (to.meta.authenticated && isAuthenticated) {
        next('/');
    } else {
        next();
    }
});


export default router;