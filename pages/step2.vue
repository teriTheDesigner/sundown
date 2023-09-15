<script setup>
import { ref, onMounted } from "vue";
import { useGlobalStore } from "../store/user";
const globalStore = useGlobalStore();

const url =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=DEMO_KEY&sol=15";
const apiKey = process.env.VUE_APP_API_KEY;

const displayPage = ref(false);
const images = ref([]);
const displayedImages = ref([]);
const imagesPerPage = 9;
let currentPage = 1;
const errors = ref(null);

const selectedImages = ref([]);

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
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

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
  console.log("removing image", image, "with index", index);
}

function selectImages(image, index) {
  selectedImages.value.push({ image, index });
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
}
console.log(selectedImages.value);
</script>

<template>
  <div v-if="displayPage">
    <Nav></Nav>
    <Stepper />
    <div class="pt-20 pb-20">
      <div class="content-container mx-auto grid grid-cols-12 justify-center">
        <div
          class="col-start-1 col-end-7 grid grid-cols-3 max-h-96 overflow-y-scroll gap-2"
        >
          <div
            v-for="(image, index) in displayedImages"
            :key="index"
            class="w-40 h-40 overflow-hidden"
          >
            <img
              @click="selectImages(image, index)"
              :src="image.img_src"
              alt="mars image"
              class="object-cover w-full h-full"
            />
          </div>

          <button
            class="p-2 border border-white rounded col-start-3 col-end-4"
            @click="loadMoreImages"
            v-if="displayedImages.length < images.length"
          >
            LOAD MORE
          </button>
        </div>
        <div
          class="col-start-8 col-end-13 grid grid-cols-3 h-max mb-4 w-full gap-1"
        >
          <div
            v-for="image in selectedImages"
            :key="image.index"
            class="w-32 h-32 overflow-hidden"
          >
            <img
              @click="deleteImage(image.image, image.index)"
              :src="image.image.img_src"
              alt="mars image"
              class="object-cover w-full h-full"
            />
          </div>
        </div>

        <NuxtLink
          class="rounded col-start-11 col-end-13 h-12 w-52 bg-slate-400 flex flex-col items-center justify-center"
          to="/step3"
          @click="updateImages"
          >NEXT STEP</NuxtLink
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
