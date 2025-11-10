import {createRouter, createWebHistory} from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import UpdateUser from '../views/UpdateUser.vue'

const routes = [
    {
        path: '/login', // ← Ubah ke path yang unik
        name: 'Login',
        component: Login
    },
    {
        path: '/register', // ← Ubah ke path yang unik
        name: 'Register',
        component: Register
    },
    {
        path: '/dashboard', // ← Ubah ke path yang unik
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/update/user/:id', // ← Ubah ke path yang unik
        name: 'UpdateUser',
        component: UpdateUser,
        props: true
    },
    // Optional: Tambahkan redirect untuk root path
    {
        path: '/',
        redirect: '/login' // atau path lain yang diinginkan
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router