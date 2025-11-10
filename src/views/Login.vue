<template>
    <img src="../assets/vue.svg" style="width: 300px;" className="flex align-items items-center justify-center mb-4">
    <img src="../assets/horus-logo-small.png" className="flex align-items items-center justify-center mb-4">
    <form @submit.prevent="handleLogin">
    <div className="flex flex-col gap-4 mb-10">
        <label>Username: <input type="text" className="border" v-model="credentials.username"/></label>
        <label>Password: <input type="password" className="border" v-model="credentials.password"/></label>
    </div>

    <div v-if="errorMessage" className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
        {{ errorMessage }}
    </div>

    <div className="flex flex-row gap-5 align-items items-center justify-center">
        <button type="submit">Login</button>
        <button type="button" @click="$router.push('/register')">Register</button>
    </div>
    </form>
</template>

<script>
import authService from '../store/auth';

export default {
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      },
      loading: false,
      errorMessage: ''
    }
  },
  methods: {
    async handleLogin() {
      
      if (!this.credentials.username || !this.credentials.password) {
        this.errorMessage = 'Please fill in all fields';
        return;
      }

      this.loading = true;
      this.errorMessage = '';

      try {
        const result = await authService.login(this.credentials);
        
        if (result.success) {
          // Login successful
          this.$router.push('/dashboard');
        } else {
          // Login failed
          this.errorMessage = result.message;
        }
      } catch (error) {
        console.error('Login error:', error);
        this.errorMessage = 'An unexpected error occurred';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>