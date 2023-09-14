<script setup>
import { ref, onMounted } from "vue";
import { useGlobalStore } from "../store/user";
const globalStore = useGlobalStore();

const displayPage = ref(false);

onMounted(() => {
  const user = localStorage.getItem("validUser");
  displayPage.value = user && user !== "undefined";
});
function saveReport() {
  globalStore.addReport();
  saveUserDataToLocalStorage();
}
function saveUserDataToLocalStorage() {
  const userData = {
    email: globalStore.email,
    userName: globalStore.userName,
    codeName: globalStore.codeName,
    firstName: globalStore.firstName,
    lastName: globalStore.lastName,
    avatar: globalStore.avatar,
    allReports: globalStore.allReports,
    report: globalStore.report,
  };

  const userDataJson = JSON.stringify(userData);

  localStorage.setItem(globalStore.email, userDataJson);
}
</script>
<template>
  <div v-if="displayPage">
    <Nav></Nav>
    <Stepper />
    <div class="pt-20 pb-20">
      <div class="content-container mx-auto grid grid-cols-12 justify-center">
        <div
          class="bg-white text-black p-4 col-start-1 col-end-6 flex flex-col gap-8"
        >
          <div class="flex flex-col gap-2">
            <h2><b>Mission Name</b></h2>
            <p>{{ globalStore.report.name }}</p>
          </div>
          <div class="flex flex-col gap-2">
            <h2><b>Mission description</b></h2>
            <p>{{ globalStore.report.description }}</p>
          </div>
          <div class="flex flex-col gap-2">
            <h2><b>Mission Start Date</b></h2>
            <p>{{ globalStore.report.date }}</p>
          </div>
          <div class="flex flex-col gap-2">
            <h2><b>Latitude</b></h2>
            <p>{{ globalStore.report.latitude }}</p>
          </div>
          <div class="flex flex-col gap-2">
            <h2><b>Longitude</b></h2>
            <p>{{ globalStore.report.longitude }}</p>
          </div>
        </div>
        <div class="col-start-7 col-end-13 grid grid-cols-3 h-max gap-2">
          <div
            v-for="(image, index) in globalStore.report.images"
            :key="index"
            class="w-40 h-40 overflow-hidden"
          >
            <img
              :src="image.image.img_src"
              alt="mars image"
              class="object-cover w-full h-full"
            />
          </div>
          <NuxtLink
            @click="saveReport"
            class="rounded h-12 w-52 bg-slate-400 flex flex-col items-center justify-center"
            to="/dashboard"
            >SAVE REPORT</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
  <div v-else class="h-screen flex place-items-center">
    <div class="m-auto flex flex-col place-items-center gap-20">
      <h1 class="text-3xl">This page is protected</h1>
      <NuxtLink to="/"
        ><button class="rounded h-12 w-48 bg-white text-black">
          LOGIN
        </button></NuxtLink
      >
    </div>
  </div>
</template>
