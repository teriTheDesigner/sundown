<script setup>
function Logout(){
    console.log("logout")
    localStorage.removeItem('validUser');
}
</script>

<template>

    <div class="pt-8 pb-8">
        <div class="content-container mx-auto flex justify-between">
            <NuxtLink to="/">LOGO</NuxtLink>
            <NuxtLink to="/"><button  @click="Logout">Logout</button></NuxtLink>
        </div>
    </div>
</template>