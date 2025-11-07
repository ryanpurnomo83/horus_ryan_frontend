<script>
    import UserTable from '../components/UserTable.vue';
    export default {
        components: {
            UserTable
        }
    }    
</script>

<template>
    <div>
        <nav className="mb-10">
            <h1>Dashboard Pengguna</h1>
        </nav>
        <label>Cari Pengguna: <input type="text"/></label>
        <br/>
        <UserTable/>
    </div>
</template>