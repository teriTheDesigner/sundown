<script setup>
import { ref, onMounted } from "vue";
import { useGlobalStore } from "../store/user";
import { useSteps } from "../store/stepper";
const globalStore = useGlobalStore();
const stepperStore = useSteps();
const displayPage = ref(false);

onMounted(() => {
  const user = localStorage.getItem("validUser");
  displayPage.value = user && user !== "undefined";

  const userData = localStorage.getItem(globalStore.email);
  if (userData) {
    const userDataObj = JSON.parse(userData);
    globalStore.email = userDataObj.email;
    globalStore.userName = userDataObj.userName;
    globalStore.codeName = userDataObj.codeName;
    globalStore.firstName = userDataObj.firstName;
    globalStore.lastName = userDataObj.lastName;
    globalStore.avatar = userDataObj.avatar;
    globalStore.allReports = userDataObj.allReports;
    globalStore.report = userDataObj.report;
  }
});

function editReport(index) {
  console.log("adding report with index ", index);
  globalStore.report = globalStore.allReports[index];
  globalStore.allReports.splice(index, 1);
  stepperStore.setStep("step1");
  stepperStore.setEditMode(true);
}
function deleteReport(index) {
  globalStore.allReports.splice(index, 1);

  const userData = localStorage.getItem(globalStore.email);
  if (userData) {
    const userDataObj = JSON.parse(userData);
    userDataObj.allReports = globalStore.allReports;
    localStorage.setItem(globalStore.email, JSON.stringify(userDataObj));
  }
}

function changeStep() {
  stepperStore.setStep("step1");
}
</script>

<template>
  <div v-if="displayPage">
    <Nav></Nav>
    <div class="pt-20 pb-20 h-screen">
      <div class="content-container mx-auto grid grid-cols-12">
        <h1 class="text-2xl col-start-1 col-end-13 place-self-center mb-12">
          Welcome back, {{ globalStore.codeName }}!
        </h1>

        <div class="col-start-1 col-end-7 flex flex-col gap-8">
          <h2>Your Reports:</h2>
          <div class="flex flex-col gap-12">
            <div v-for="(report, index) in globalStore.allReports" :key="index">
              <div
                class="flex w-full justify-between rounded bg-white text-black p-4"
              >
                <div class="flex flex-col gap-2">
                  <p><b>Report Name:</b> {{ report.name }}</p>
                  <p>{{ report.date }}</p>
                </div>
                <div class="flex gap-6">
                  <NuxtLink
                    @click="() => editReport(index)"
                    to="/step1"
                    class="rounded hover:scale-105 h-8 p-4 bg-black text-white flex flex-col items-center justify-center"
                    >EDIT</NuxtLink
                  >

                  <button
                    @click="() => deleteReport(index)"
                    class="rounded hover:scale-105 h-8 p-2 border border-black flex flex-col items-center justify-center"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NuxtLink
          @click="changeStep"
          class="col-start-9 col-end-13 hover:scale-105 rounded h-12 w-52 bg-white text-black flex flex-col items-center justify-center"
          to="/step1"
          >+ CREATE NEW REPORT</NuxtLink
        >
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
