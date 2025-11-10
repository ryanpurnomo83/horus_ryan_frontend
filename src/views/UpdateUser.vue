<template>
    <div class="container mx-auto p-4">
        <nav class="mb-10">
            <h1 class="text-2xl font-bold">Update User - ID: {{ userId }}</h1>
        </nav>
        
        <!-- Loading State -->
        <div v-if="loading" class="text-center p-4">
            🔄 Loading user data...
        </div>
        
        <!-- Error State -->
        <div v-else-if="error" class="text-center p-4 text-red-500">
            ❌ Error: {{ error }}
        </div>
        
        <!-- Form State -->
        <div v-else>
            <!-- Menyusun label dan input dalam satu div menggunakan flex -->
            <div class="flex flex-col gap-4 mb-4 max-w-2xl">
                <div class="flex items-center gap-4">
                    <label class="w-32 text-right font-medium">Nama Lengkap:</label>
                    <input 
                        type="text" 
                        v-model="formData.nama" 
                        class="border border-gray-300 p-2 flex-1 rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div class="flex items-center gap-4">
                    <label class="w-32 text-right font-medium">Email:</label>
                    <input 
                        type="email" 
                        v-model="formData.email" 
                        class="border border-gray-300 p-2 flex-1 rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div class="flex items-center gap-4">
                    <label class="w-32 text-right font-medium">Username:</label>
                    <input 
                        type="text" 
                        v-model="formData.username" 
                        class="border border-gray-300 p-2 flex-1 rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div class="flex items-center gap-4">
                    <label class="w-32 text-right font-medium">Password:</label>
                    <input 
                        type="password" 
                        v-model="formData.password" 
                        placeholder="Kosongkan jika tidak ingin mengubah"
                        class="border border-gray-300 p-2 flex-1 rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>

            <br/>
            <div class="flex flex-row gap-4 justify-center">
                <button 
                    @click="updateUser" 
                    :disabled="updating"
                    class="px-6 py-2 bg-blue-500 text-black rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                    {{ updating ? 'Updating...' : 'Update' }}
                </button>
                <button 
                    @click="goBack" 
                    class="px-6 py-2 bg-gray-500 text-black rounded hover:bg-gray-600"
                >
                    Kembali
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { userAPI } from '../services/api.js';

export default {
    data() {
        return {
            userId: null,
            userData: null,
            formData: {
                nama: '',
                email: '',
                username: '',
                password: ''
            },
            loading: false,
            updating: false,
            error: null
        };
    },
    methods: {
        async fetchUser() {
            this.loading = true;
            this.error = null;
            
            try {
                console.log('🔄 Fetching user with ID:', this.userId);
                const user = await userAPI.getUserById(this.userId);
                console.log('✅ User data received:', user);
                
                this.userData = user;
                
                this.formData = {
                    nama: user.nama || '',
                    email: user.email || '',
                    username: user.username || '',
                    password: user.password // Password dikosongkan untuk keamanan
                };
            } catch (error) {
                console.error('❌ Error fetching user:', error);
                this.error = error.message || 'Failed to load user data';
            } finally {
                this.loading = false;
            }
        },
        
        async updateUser() {
            this.updating = true;
            this.error = null;
            
            try {
                console.log('🔄 Updating user:', this.userId);
                console.log('📊 Data to update:', this.formData);
                
                // Hapus password dari data jika kosong (tidak ingin diubah)
                const updateData = { ...this.formData };
                if (!updateData.password) {
                    delete updateData.password;
                }
                
                const result = await userAPI.updateUser(this.userId, updateData);
                console.log('✅ Update successful:', result);
                
                this.$router.push('/dashboard');
                
            } catch (error) {
                console.error('❌ Error updating user:', error);
                this.error = error.message || 'Failed to update user';
            } finally {
                this.updating = false;
            }
        },
        
        goBack() {
            this.$router.push('/users');
        }
    },
    
    mounted() {
        // Ambil ID dari route parameters
        this.userId = this.$route.params.id;
        console.log('🔧 UpdateUser mounted with ID:', this.userId);
        
        if (this.userId) {
            this.fetchUser();
        } else {
            this.error = 'User ID tidak valid';
        }
    }
};
</script>

<style scoped>
.container {
    max-width: 1200px;
}

/* Tambahkan padding dan margin agar tampilan lebih responsif pada perangkat kecil */
@media (max-width: 640px) {
    .container {
        padding: 1rem;
    }
    
    .flex.items-center {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .flex.items-center label {
        width: 100%;
        text-align: left;
        margin-bottom: 0.5rem;
    }
    
    .flex.items-center input {
        width: 100%;
    }
    
    .flex.flex-row {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .flex.flex-row button {
        width: 100%;
    }
}
</style>

index.js

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