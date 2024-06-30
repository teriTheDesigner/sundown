<script setup>
import { ref, onMounted } from "vue";
import { useGlobalStore } from "../store/user";
import { useSteps } from "../store/stepper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const globalStore = useGlobalStore();
const stepperStore = useSteps();
const displayPage = ref(false);
const reportName = ref();
const reportDescription = ref();
const reportDate = ref();
const isButtonDisabled = computed(() => {
  return !reportName.value || !reportDescription.value || !reportDate.value;
});

function updateUser() {
  globalStore.setReportName(reportName.value);
  globalStore.setReportDescription(reportDescription.value);
  globalStore.setReportDate(reportDate.value);
  stepperStore.setStep("step2");
  useRouter().push("/step2");
}

onMounted(() => {
  const user = localStorage.getItem("validUser");
  displayPage.value = user && user !== "undefined";
  reportName.value = globalStore.report.name;
  reportDescription.value = globalStore.report.description;
  reportDate.value = globalStore.report.date;
});
</script>

<template>
  <div class="ml-10 mr-10" v-if="displayPage">
    <div class="max-w-screen-xl mx-auto">
      <Nav></Nav>
      <Stepper />
      <div class="h-screen pt-20 pb-20">
        <form
          @submit.prevent="updateUser"
          class="content-container mx-auto grid grid-cols-12 justify-center"
        >
          <div
            class="col-start-1 md:col-end-6 col-end-12 flex flex-col md:gap-16 gap-8"
          >
            <!-- <label class="flex flex-col gap-4">
              Mission Name
              <input
                v-model="reportName"
                class="border text-black p-2 h-12 focus:outline-gray-600 border-gray-600"
                type="text"
                required
              />
            </label> -->
            <div class="grid w-full items-center gap-4">
              <Label class="text-base" for="reportName">Mission Name</Label>
              <Input
                class="text-black border h-12 border-gray-600 focus:outline-gray-600"
                v-model="reportName"
                required
                id="reportName"
                placeholder="Lunar explore"
              />
            </div>
            <div class="grid w-full gap-4">
              <Label class="text-base" for="description"
                >Mission Description</Label
              >
              <Textarea
                v-model="reportDescription"
                class="border focus:outline-gray-600 text-black p-3 border-gray-600 h-40"
                id="description"
                placeholder="As our spacecraft ventures into the unknown, exploring distant planets and uncovering the mysteries of the cosmos.."
                required
              />
            </div>
            <!-- <label class="flex flex-col gap-4">
              Mission Description
              <textarea
                v-model="reportDescription"
                class="border focus:outline-gray-600 text-black p-2 border-gray-600 h-60"
                type="text"
                required
              ></textarea>
            </label> -->
          </div>
          <div
            class="md:col-start-9 md:col-end-13 mt-8 md:mt-0 col-start-1 col-end-12 flex flex-col justify-between"
          >
            <label class="flex flex-col gap-4">
              Mission Date
              <input
                v-model="reportDate"
                class="border rounded-md focus:outline-gray-600 text-black p-2 border-gray-600 h-12"
                type="date"
                required
              />
            </label>
            <div class="flex flex-col mt-8 md:mt-0 gap-4">
              <p v-if="isButtonDisabled" class="text-sm text-red-500">
                <b> Please fill in all fields.</b>
              </p>

              <Button
                :disabled="isButtonDisabled"
                type="submit"
                :class="{
                  'hover:scale-105': !isButtonDisabled,
                  'opacity-60': isButtonDisabled,
                }"
                class="h-12 w-52 bg-white text-black flex flex-col items-center justify-center"
                >NEXT STEP</Button
              >
            </div>
          </div>
        </form>
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
