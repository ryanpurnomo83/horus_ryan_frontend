<template>
    <table class="mt-10 border-collapse border border-gray-400">
        <thead class="border-b border-gray-300">
            <tr>
                <th class="p-4">ID</th>
                <th class="p-4">Username</th>
                <th class="p-4">Nama Lengkap</th>
                <th class="p-4">Email</th>
                <th class="p-4">Aksi</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="p-4">1</td>
                <td class="p-4">Ryan</td>  
                <td class="p-4">Ryan Purnomo</td>
                <td class="p-4">ryanpurnomo83@gmail.com</td>
                <td class="p-4 flex flex-row gap-5">
                    <button class="px-4 py-2 bg-blue-500 text-black rounded" @click="$router.push('/update/user')">Update</button>
                    <button class="px-4 py-2 bg-red-500 text-black rounded">Hapus</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>


<style scoped>
/*
    .border {
        width: 100%;
        border-collapse: none;
        border: 1px solid black;
    }

    .border th, .border td {
        border: 1px solid black;
        padding: 8px;
    }*/
</style>

