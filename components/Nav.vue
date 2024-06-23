<script setup>
import { useGlobalStore } from "../store/user";
import { useSteps } from "../store/stepper";
const globalStore = useGlobalStore();
const stepperStore = useSteps();

function Logout() {
  console.log("logout");
  localStorage.removeItem("validUser");
  stepperStore.setStep("");
}

function changeStep() {
  stepperStore.setStep("");
}
</script>

<template>
  <div class="pt-8 pb-8">
    <div class="max-w-[1300px] place-items-center mx-auto flex justify-between">
      <NuxtLink class="hover:scale-105" @click="changeStep" to="/dashboard"
        >HOME</NuxtLink
      >
      <div class="flex gap-8 place-items-center">
        <NuxtLink class="hover:scale-105" to="/"
          ><button @click="Logout">Logout</button></NuxtLink
        >
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
