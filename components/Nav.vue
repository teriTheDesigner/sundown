<script setup>
import { useGlobalStore } from "../store/user";
const globalStore = useGlobalStore();

function Logout() {
  console.log("logout");
  localStorage.removeItem("validUser");
}
</script>

<template>
  <div class="pt-8 pb-8">
    <div
      class="content-container place-items-center mx-auto flex justify-between"
    >
      <NuxtLink to="/dashboard">LOGO</NuxtLink>
      <div class="flex gap-8 place-items-center">
        <NuxtLink to="/"><button @click="Logout">Logout</button></NuxtLink>
        <div class="flex place-items-center gap-2">
          <img
            v-if="globalStore.avatar"
            :src="globalStore.avatar"
            alt="User Avatar"
            class="w-8 h-8 rounded-full"
          />
          <p v-if="globalStore.userName" class="text-sm">
            {{ globalStore.userName }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
