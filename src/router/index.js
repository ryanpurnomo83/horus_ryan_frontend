import {createRouter, createWebHistory} from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashbord.vue'
import UpdateUser from '../views/UpdateUser.vue'

const routes = [
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        name: 'Register',
        component: Register
    },
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/',
        name: 'UpdateUser',
        component: UpdateUser
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router