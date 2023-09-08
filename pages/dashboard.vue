<script setup>
import { ref, onMounted } from 'vue'

const displayPage = ref(false);

onMounted(()=>{
    const user = localStorage.getItem('validUser');
    displayPage.value = user && user !== 'undefined'
})

</script>

<template>
    <div v-if="displayPage">


    <Nav></Nav>
    <div class=" pt-20 pb-20">
        <div class=" content-container mx-auto grid grid-cols-12 place-items-center">
    <h1 class="col-start-1 col-end-13">Welcome User</h1>
    <NuxtLink class="col-start-9 col-end-13  rounded h-12 w-52 bg-slate-400 flex flex-col items-center justify-center"   to="/step1">+ CREATE NEW REPORT</NuxtLink>
    <div class=" col-start-1 col-end-6 flex flex-col gap-4">
        <p>You will see your reports here</p>
    </div>

</div>
</div>
    </div>
    <h1 v-else>This page is protected</h1>
</template>
