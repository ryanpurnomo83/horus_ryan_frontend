<template>
    <div>
      <img src="../assets/horus-logo-small.png" class="flex align-items items-center justify-center mb-4">
      <form @submit.prevent="handleRegister">
        <div class="flex flex-col gap-4 mb-10">
          <label>Nama Lengkap: <input type="text" class="border" v-model="userData.nama"/></label>
          <label>Email: <input type="email" class="border" v-model="userData.email"/></label>
          <label>Username: <input type="text" class="border" v-model="userData.username"/></label>
          <label>Password: <input type="password" class="border" v-model="userData.password"/></label>
        </div>
        <div class="flex flex-row gap-5 align-items items-center justify-center">
          <button type="button" @click="$router.push('/login')">Login</button>
          <button type="submit" :disabled="loading">
            {{ loading ? 'Loading...' : 'Register' }}
          </button>
        </div>
        <div v-if="errorMessage" class="text-red-500 mt-4">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import authService from '../store/auth';
  
  export default {
    data() {
      return {
        userData: {
          nama: '',
          email: '',
          username: '',
          password: ''
        },
        loading: false,
        errorMessage: ''
      }
    },
    methods: {
      async handleRegister() {
        // Validasi yang lebih baik
        if (!this.userData.nama || !this.userData.email || !this.userData.username || !this.userData.password) {
          this.errorMessage = 'Please fill in all the fields';
          return;
        }
  
        this.loading = true;
        this.errorMessage = '';
        
        try {
          const result = await authService.register(this.userData);
          if (result.success) {
            // Register successful
            this.$router.push('/dashboard');
          } else {
            // Register failed
            this.errorMessage = result.message;
          }
        } catch (error) {
          console.error('Register error:', error);
          this.errorMessage = 'An unexpected error occurred';
        } finally {
          this.loading = false;
        }
      }
    }
  }
  </script>