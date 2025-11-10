<template>
    <div class="overflow-x-auto">
        <!-- Loading State -->
        <div v-if="loading" class="text-center p-8">
            Loading data...
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center p-8 text-red-500">
            {{ error }}
        </div>

        <!-- Empty Data State -->
        <div v-else-if="users.length === 0" class="text-center p-8 text-gray-500">
            Tidak ada data pengguna
        </div>

        <!-- Data Available -->
        <table v-else class="mt-10 border-collapse border border-gray-400 w-full table-auto sm:table-fixed">
            <thead class="border-b border-gray-300">
                <tr>
                    <th class="p-4 text-xs sm:text-sm">ID</th>
                    <th class="p-4 text-xs sm:text-sm">Username</th>
                    <th class="p-4 text-xs sm:text-sm">Nama Lengkap</th>
                    <th class="p-4 text-xs sm:text-sm">Email</th>
                    <th class="p-4 text-xs sm:text-sm">Aksi</th>
                </tr>
            </thead>
            <tbody>
                <!-- Loop data dengan safe navigation -->
                <tr v-for="user in users" :key="user.id">
                    <td class="p-4 text-xs sm:text-sm">{{ user.id || 'N/A' }}</td>
                    <td class="p-4 text-xs sm:text-sm">{{ user.username || 'N/A' }}</td>
                    <td class="p-4 text-xs sm:text-sm break-words whitespace-normal">{{ user.nama || 'N/A' }}</td>
                    <td class="p-4 text-xs sm:text-sm break-words sm:max-w-xs whitespace-normal">{{ user.email || 'N/A' }}</td>
                    <td class="p-4 flex flex-col gap-3 text-xs sm:text-sm w-full">
                        <button class="px-4 py-2 bg-blue-500 text-black text-xs sm:text-sm rounded" 
                                @click="updateUser(user.id)"
                                :disabled="!user.id">
                            Update
                        </button>
                        <button class="px-4 py-2 bg-red-500 text-black text-xs sm:text-sm rounded" 
                                @click="deleteUser(user.id)"
                                :disabled="!user.id">
                            Hapus
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { userAPI } from '../services/api.js';

export default {
    data() {
        return {
            users: [],
            loading: false,
            error: null
        };
    },
    methods: {
        async fetchUsers() {
            this.loading = true;
            this.error = null;
            
            try {   
                const data = await userAPI.getUsers();
                console.log('Data received:', data);
                
                // Handle berbagai tipe response
                if (Array.isArray(data)) {
                    this.users = data;
                } else if (data && Array.isArray(data.users)) {
                    this.users = data.users; // Jika response berupa object dengan property users
                } else if (data && Array.isArray(data.data)) {
                    this.users = data.data; // Jika response berupa object dengan property data
                } else {
                    this.users = []; // Fallback ke array kosong
                    console.warn('Unexpected response format:', data);
                }
                
            } catch (error) {
                console.error('Error fetching users:', error);
                this.error = 'Gagal memuat data pengguna: ' + (error.message || 'Unknown error');
                this.users = []; // Reset ke array kosong saat error
            } finally {
                this.loading = false;
            }
        },
        async updateUser(id) {
            if (!id) {
                console.warn('Invalid user ID');
                return;
            }
            this.$router.push(`/update/user/${id}`);
        },
        async deleteUser(id) {
            if (!id) {
                console.warn('Invalid user ID');
                return;
            }
            
            // Konfirmasi
            if (!confirm(`Yakin hapus user ${id}?`)) {
                return;
            }
            
            try {
                // Optimistic update - hapus dari UI dulu
                this.users = this.users.filter(user => user.id !== id);
                
                // Panggil API
                await userAPI.deleteUser(id);
                console.log(`User ${id} deleted successfully`);
                
                // Optional: Tampilkan pesan sukses
                // alert('User berhasil dihapus');
                
            } catch (error) {
                console.error('Error deleting user:', error);
                
                // Rollback - muat ulang data asli
                this.fetchUsers();
                
                alert('Gagal menghapus user: ' + (error.message || 'Unknown error'));
            }
        }
    },
    mounted() {
        this.fetchUsers();
    }
};
</script>

<style scoped>
/* Styles tetap sama */
@media (max-width: 640px) {
    div {
        width: 100%;
    }
    
    table {
        font-size: 0.7rem;
    }
    
    th, td {
        padding: 0.5rem;
    }

    .p-2 {
        padding: 0.2rem;
    }
    
    .break-words {
        word-wrap: break-word;
    }

    td {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
    }

    .w-full {
        width: 100%;
    }

    .flex {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .sm:flex-row {
        flex-direction: row;
    }
}
</style>