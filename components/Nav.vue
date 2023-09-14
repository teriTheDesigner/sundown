<script setup>
import { onMounted } from "vue";
const LoggedIn = ref(false);

onMounted(() => {
  const user = localStorage.getItem("validUser");
  LoggedIn.value = user && user !== "undefined";
});

function Logout() {
  console.log("logout");
  localStorage.removeItem("validUser");
}
</script>

<template>
  <div class="bg-black text-white pt-8 pb-8">
    <div class="content-container mx-auto flex justify-between">
      <NuxtLink to="/dashboard">LOGO</NuxtLink>
      <NuxtLink to="/"><button @click="Logout">Logout</button></NuxtLink>
    </div>
  </div>
</template>
