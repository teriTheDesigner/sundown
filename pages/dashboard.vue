<script setup>
import { ref, onMounted } from "vue";
import { useGlobalStore } from "../store/user";
const globalStore = useGlobalStore();
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
}
function deleteReport(index) {
  // Remove the report from the allReports array
  globalStore.allReports.splice(index, 1);

  // Update local storage to reflect the changes
  const userData = localStorage.getItem(globalStore.email);
  if (userData) {
    const userDataObj = JSON.parse(userData);
    userDataObj.allReports = globalStore.allReports;
    localStorage.setItem(globalStore.email, JSON.stringify(userDataObj));
  }
}
</script>

<template>
  <div v-if="displayPage">
    <Nav></Nav>
    <div class="pt-20 pb-20 h-screen">
      <div class="content-container mx-auto grid grid-cols-12">
        <h1 class="col-start-1 col-end-13 place-self-center mb-12">
          Welcome {{ globalStore.codeName }}
        </h1>

        <div
          class="col-start-1 col-end-7 flex flex-col gap-8 border border-black"
        >
          <h2>Your Reports:</h2>
          <div class="flex flex-col gap-12">
            <div v-for="(report, index) in globalStore.allReports" :key="index">
              <div class="flex w-full justify-between border-b border-black">
                <div class="flex flex-col gap-2">
                  <p><b>Report Name:</b> {{ report.name }}</p>
                  <p>{{ report.date }}</p>
                </div>
                <div class="flex gap-6">
                  <NuxtLink
                    @click="() => editReport(index)"
                    to="/step1"
                    class="rounded h-8 p-2 bg-slate-400 flex flex-col items-center justify-center"
                    >EDIT</NuxtLink
                  >

                  <button
                    @click="() => deleteReport(index)"
                    class="rounded h-8 p-2 bg-slate-400 flex flex-col items-center justify-center"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NuxtLink
          class="col-start-9 col-end-13 rounded h-12 w-52 bg-slate-400 flex flex-col items-center justify-center"
          to="/step1"
          >+ CREATE NEW REPORT</NuxtLink
        >
      </div>
    </div>
  </div>
  <h1 v-else>This page is protected</h1>
</template>
