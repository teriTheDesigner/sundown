<template>
    <Nav></Nav>
<div class="flex flex-col place-items-center">
    <div class="content-container flex flex-col place-items-center h-screen ">
        
     <div class="flex flex-col justify-between m-auto h-60 ">
<label class="flex flex-col gap-2"  >
    E-mail:
    <input class="border p-2 w-56 border-gray-600" v-model="email"  type="email">
 </label>
 <label class="flex flex-col gap-2" >
    Password:
    <input class="border p-2 w-56 border-gray-600" v-model="password"  type="password ">
 </label>
 <NuxtLink @click="Login" to="/dashboard"><button class="rounded h-12 w-56 bg-slate-400 ">Login</button></NuxtLink></div>
</div>  </div>
</template>
<script setup>
    import {  onMounted, ref } from 'vue'
    const email = ref('');
    const password = ref('');

let users=[];

onMounted(async () => {

    const res = await fetch('/data/users.json')
    users = await res.json();
    console.log(users)
})

function Login(){
    const foundUser = users.find(user => user.email === email.value && user.password === password.value) 
   
    if (foundUser) {
        localStorage.setItem('validUser', email.value)
        console.log("user logged in");
        
    } else {
        console.log("email not found");
    }
}






</script>