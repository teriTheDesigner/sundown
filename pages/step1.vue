<script setup>
import { ref, onMounted } from "vue";
import { useGlobalStore } from "../store/user";

const globalStore = useGlobalStore();
const displayPage = ref(false);
const reportName = ref();
const reportDescription = ref();
const reportDate = ref();
const isButtonDisabled = computed(() => {
  return !reportName.value || !reportDescription.value || !reportDate.value;
});

function updateUser() {
  console.log(reportName.value, reportDescription.value, reportDate.value);
  globalStore.setReportName(reportName.value);
  globalStore.setReportDescription(reportDescription.value);
  globalStore.setReportDate(reportDate.value);
}

onMounted(() => {
  const user = localStorage.getItem("validUser");
  displayPage.value = user && user !== "undefined";
  reportName.value = globalStore.report.name;
  reportDescription.value = globalStore.report.description;
  reportDate.value = globalStore.report.date;
});

console.log(isButtonDisabled);
</script>

<template>
  <div v-if="displayPage">
    <Nav></Nav>
    <Stepper />
    <div class="h-screen pt-20 pb-20">
      <div class="content-container mx-auto grid grid-cols-12 justify-center">
        <div class="col-start-1 col-end-6 flex flex-col gap-20">
          <label class="flex flex-col gap-4">
            Mission Name
            <input
              v-model="reportName"
              class="border text-black p-2 h-12 border-gray-600"
              type="text"
              required
            />
          </label>
          <label class="flex flex-col gap-4">
            Mission Description
            <textarea
              v-model="reportDescription"
              class="border text-black p-2 border-gray-600 h-32"
              type="text"
              required
            ></textarea>
          </label>
        </div>
        <div class="col-start-9 col-end-13 flex flex-col justify-between">
          <label class="flex flex-col gap-4">
            Mission Date
            <input
              v-model="reportDate"
              class="border text-black p-2 border-gray-600 h-12"
              type="date"
              required
            />
          </label>
          <div class="flex flex-col gap-4">
            <p v-if="isButtonDisabled" class="text-sm text-red-500">
              Please fill in all fields.
            </p>
            <NuxtLink to="/step2"
              ><button
                :disabled="isButtonDisabled"
                @click="updateUser"
                :class="{
                  'bg-slate-400': !isButtonDisabled,
                  'opacity-60': isButtonDisabled,
                }"
                class="rounded h-12 w-52 bg-slate-400 flex flex-col items-center justify-center"
              >
                NEXT STEP
              </button></NuxtLink
            >
          </div>
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
