<template>
    <div class="search-container mb-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <!-- Label dan Input -->
            <div class="flex-1 w-full">
                <label for="search" class="block text-sm font-medium text-gray-700 mb-2">
                    Cari Pengguna:
                </label>
                <div class="flex gap-2">
                    <input 
                        id="search"
                        type="text" 
                        v-model="searchQuery"
                        @input="handleInput"
                        @keyup.enter="handleSearch"
                        placeholder="Masukkan username, nama, atau email..."
                        class="flex-1 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button 
                        @click="handleSearch"
                        :disabled="searching"
                        class="px-2 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors duration-200 flex items-center gap-2"
                    >
                        <span v-if="searching">🔍</span>
                        <span v-else>🔍</span>
                        {{ searching ? 'Mencari...' : 'Cari' }}
                    </button>

                    <button 
                        v-if="showReset"
                        @click="handleReset"
                        class="px-4 py-2 bg-gray-500 text-black rounded-lg hover:bg-gray-600 transition-colors duration-200"
                    >
                        Reset
                    </button>
                </div>
            </div>

            <!-- Reset Button -->
            
        </div>

        <!-- Search Info -->
        <div v-if="searchResults !== null" class="mt-3 text-sm text-gray-600">
            <span v-if="searchResults.length > 0">
                Ditemukan {{ searchResults.length }} hasil untuk "{{ lastSearchQuery }}"
            </span>
            <span v-else-if="lastSearchQuery">
                Tidak ditemukan hasil untuk "{{ lastSearchQuery }}"
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
    props: {
        users: {
            type: Array,
            default: () => []
        },
        searchMode: {
            type: String,
            default: 'manual', // 'manual' atau 'realtime'
            validator: (value) => ['manual', 'realtime'].includes(value)
        },
        debounceDelay: {
            type: Number,
            default: 300
        }
    },
    data() {
        return {
            searchQuery: '',
            searching: false,
            searchResults: null,
            lastSearchQuery: '',
            debounceTimer: null
        };
    },
    computed: {
        showReset() {
            return this.searchQuery || this.searchResults !== null;
        }
    },
    methods: {
        // Algoritma pencarian utama
        searchUsers(query) {
            if (!query.trim()) {
                return this.users; // Return semua data jika query kosong
            }

            const searchTerm = query.toLowerCase().trim();
            
            return this.users.filter(user => {
                // Cari di semua field yang relevan
                const searchableFields = [
                    user.username?.toLowerCase() || '',
                    user.nama?.toLowerCase() || '',
                    user.full_name?.toLowerCase() || '',
                    user.email?.toLowerCase() || ''
                ];

                // Cek apakah ada field yang mengandung kata kunci
                return searchableFields.some(field => 
                    field.includes(searchTerm)
                );
            });
        },

        // Handle input change (untuk real-time search)
        handleInput() {
            if (this.searchMode === 'realtime') {
                // Debounce untuk menghindari request berlebihan
                clearTimeout(this.debounceTimer);
                this.debounceTimer = setTimeout(() => {
                    this.performSearch();
                }, this.debounceDelay);
            }
        },

        // Handle tombol cari atau enter
        handleSearch() {
            this.performSearch();
        },

        // Eksekusi pencarian
        performSearch() {
            if (!this.searchQuery.trim()) {
                this.handleReset();
                return;
            }

            this.searching = true;
            this.lastSearchQuery = this.searchQuery;

            // Simulasi loading (bisa dihapus jika tidak perlu)
            setTimeout(() => {
                const results = this.searchUsers(this.searchQuery);
                this.searchResults = results;
                this.searching = false;

                // Emit hasil pencarian ke parent component
                this.$emit('search-results', {
                    query: this.searchQuery,
                    results: results,
                    total: results.length
                });
            }, 300);
        },

        // Reset pencarian
        handleReset() {
            this.searchQuery = '';
            this.searchResults = null;
            this.lastSearchQuery = '';
            this.searching = false;
            clearTimeout(this.debounceTimer);

            // Emit reset event
            this.$emit('search-results', {
                query: '',
                results: this.users, // Kembalikan semua data
                total: this.users.length
            });
        },

        // Clear debounce timer ketika component di-destroy
        clearTimer() {
            if (this.debounceTimer) {
                clearTimeout(this.debounceTimer);
            }
        }
    },
    watch: {
        // Watch perubahan data users untuk reset search results
        users: {
            handler() {
                if (this.searchQuery) {
                    this.performSearch();
                }
            },
            deep: true
        }
    },
    beforeUnmount() {
        this.clearTimer();
    }
};
</script>

<style scoped>
.search-container {
    max-width: 600px;
}

/* Responsive design */
@media (max-width: 640px) {
    .search-container {
        width: 100%;
    }
    
    .flex.sm\:flex-row {
        flex-direction: column;
    }
    
    input {
        font-size: 0.875rem;
    }
    
    button {
        font-size: 0.875rem;
        padding: 0.5rem 1rem;
    }
}

/* Animation untuk loading state */
button:disabled {
    cursor: not-allowed;
    opacity: 0.7;
}

/* Focus styles untuk accessibility */
input:focus {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>