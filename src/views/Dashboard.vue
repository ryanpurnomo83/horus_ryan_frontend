<script>
    import UserTable from '../components/UserTable.vue';
    import SearchBar from '../components/SearchBar.vue';
    export default {
        components: {
            UserTable,
            SearchBar
        },
        data() {
            return {
                allUsers: [],
                filteredUsers: [],
                loading: true,
                error: null
            };
        },
        methods: {
            async fetchUsers() {
                this.loading = true;
                this.error = null;
                
                try {
                    const users = await userAPI.getUsers();
                    this.allUsers = users;
                    this.filteredUsers = users; // Awalnya tampilkan semua data
                } catch (error) {
                    console.error('Error fetching users:', error);
                    this.error = 'Gagal memuat data pengguna';
                } finally {
                    this.loading = false;
                }
            },

            // Handle hasil pencarian dari SearchBar
            handleSearchResults({ results, query }) {
                console.log('Search results received:', { query, resultsCount: results.length });
                this.filteredUsers = results;
            }
        },
        mounted() {
            this.fetchUsers();
        }
    }    
</script>

<template>
    <div class="text-xs sm:text-sm">
        <nav class="mb-10">
            <img src="../assets/vue.svg" className="flex align-items items-center justify-center mb-4">
            <img src="../assets/horus-logo-small.png" className="flex align-items items-center justify-center mb-4">
            <h1>Dashboard Pengguna</h1>
        </nav>
        <SearchBar/>
        <br/>
        <UserTable/>
    </div>
</template>

<style scoped>
/* Tambahkan padding dan margin agar tampilan lebih responsif pada perangkat kecil */
@media (max-width: 640px) {
    div { 
        font-size: 0.6rem;
        width:200px;
    }
}
</style>