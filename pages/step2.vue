<script setup>
import { ref, onMounted } from "vue";
import { useGlobalStore } from "../store/user";
import { useSteps } from "../store/stepper";
const globalStore = useGlobalStore();
const stepperStore = useSteps();

const runtimeConfig = useRuntimeConfig();

const displayPage = ref(false);
const images = ref([]);
const displayedImages = ref([]);
const imagesPerPage = 9;
let currentPage = 1;

const selectedImages = ref([]);
const isButtonDisabled = computed(() => {
  return selectedImages.value.length === 0;
});

onMounted(() => {
  const user = localStorage.getItem("validUser");
  displayPage.value = user && user !== "undefined";

  if (displayPage.value) {
    fetchImages();
    selectedImages.value = globalStore.report.images.map((image, index) => ({
      ...image,
      index,
    }));
  }
});

const fetchImages = async () => {
  const apiKey = runtimeConfig.public.VUE_APP_API_KEY;
  try {
    const res = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${apiKey}&sol=15`
    );

    if (res.ok) {
      const fetchedImages = await res.json();
      images.value.push(...fetchedImages.photos);
      updateDisplayedImages();
    } else {
      console.error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

function deleteImage(image, index) {
  const foundItem = selectedImages.value.find(
    (item) => item.image === image && item.index === index
  );

  if (foundItem !== undefined) {
    const itemIndex = selectedImages.value.indexOf(foundItem);
    if (itemIndex !== -1) {
      selectedImages.value.splice(itemIndex, 1);
    }
  }
}

function selectImages(image, index) {
  if (selectedImages.value.length < 7) {
    selectedImages.value.push({ image, index });
  }
}
const updateDisplayedImages = () => {
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  displayedImages.value = images.value.slice(0, endIndex);
};

const loadMoreImages = () => {
  currentPage++;
  updateDisplayedImages();
};

function updateImages() {
  globalStore.setImages(selectedImages.value);
  stepperStore.setStep("step3");
  useRouter().push("/step3");
}
</script>

<template>
  <div v-if="displayPage" class="h-screen ml-10 mr-10">
    <Nav></Nav>
    <Stepper />
    <form @submit.prevent="updateImages" class="pt-20 pb-20">
      <div class="content-container mx-auto grid grid-cols-12 justify-center">
        <div class="col-start-1 col-end-7 grid grid-cols-3 gap-2">
          <div
            v-for="(image, index) in displayedImages"
            :key="index"
            class="aspect-square"
          >
            <img
              @click="selectImages(image, index)"
              :src="image.img_src"
              alt="mars image"
              class="object-cover w-full h-full"
              :class="{ 'cursor-pointer': selectedImages.length < 7 }"
            />
          </div>
        </div>

        <button
          type="button"
          class="p-2 border h-12 hover:scale-105 border-white rounded mt-4 col-start-5 col-span-2"
          @click="loadMoreImages"
          v-if="displayedImages.length < images.length"
        >
          LOAD MORE
        </button>
        <div class="col-start-8 col-span-5 row-start-1">
          <div class="grid grid-cols-3 h-max w-full gap-2">
            <div
              v-for="image in selectedImages"
              :key="image.index"
              class="aspect-square overflow-hidden"
            >
              <img
                @click="deleteImage(image.image, image.index)"
                :src="image.image.img_src"
                alt="mars image"
                class="hover:scale-105 cursor-pointer object-cover w-full h-full"
              />
            </div>
          </div>
          <div class="flex flex-col gap-2 mt-4">
            <p v-if="isButtonDisabled" class="text-xs text-red-500">
              <b>Please select 1 - 7 images.</b>
            </p>
            <button
              class="rounded h-12 w-1/3 bg-white text-black flex flex-col items-center justify-center"
              type="submit"
              :disabled="isButtonDisabled"
              :class="{
                'hover:scale-105': !isButtonDisabled,
                'opacity-60': isButtonDisabled,
              }"
            >
              NEXT STEP
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
  <div v-else class="h-screen flex place-items-center">
    <div class="m-auto flex flex-col place-items-center gap-20">
      <h1 class="text-3xl">This page is protected</h1>
      <NuxtLink class="rounded h-12 w-48 bg-white text-black" to="/">
        LOGIN</NuxtLink
      >
    </div>
  </div>
</template>
