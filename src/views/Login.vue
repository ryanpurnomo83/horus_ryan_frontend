<template>
    <img src="../assets/horus-logo-small.png" className="flex align-items items-center justify-center mb-4">
    <div className="flex flex-col gap-4 mb-10">
        <label>Username: <input type="text" className="border"/></label>
        <label>Password: <input type="password" className="border"/></label>
    </div>
    <div className="flex flex-row gap-5 align-items items-center justify-center">
        <button>Login</button>
        <button @click="$router.push('/register')">Register</button>
    </div>
</template>

<!--
<script>
    export default{
        name: 'Login',
        methods: {
            goToRegister(){
                this.$router.push({ name: 'Register' });
            }
        }
    }
</script>-->