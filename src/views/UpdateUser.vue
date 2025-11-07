<template>
    <div>
        <nav class="mb-10">
            <h1>Update User</h1>
        </nav>
        
        <!-- Menyusun label dan input dalam satu div menggunakan flex -->
        <div class="flex flex-col gap-4 mb-4">
            <div class="flex items-start gap-2">
                <label class="w-32 text-right">Nama Lengkap:</label>
                <input type="text" class="border p-2 flex-1"/>
            </div>
            <div class="flex items-start gap-2">
                <label class="w-32 text-right">Email:</label>
                <input type="text" class="border p-2 flex-1"/>
            </div>
            <div class="flex items-start gap-2">
                <label class="w-32 text-right">Username:</label>
                <input type="text" class="border p-2 flex-1"/>
            </div>
        </div>

        <br/>
        <div class="flex flex-row gap-10 justify-center">
            <button class="px-4 py-2 bg-blue-500 text-black rounded">Update</button>
            <button class="px-4 py-2 bg-gray-500 text-black rounded">Kembali</button>
        </div>
    </div>
</template>

