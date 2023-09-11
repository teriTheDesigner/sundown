<script setup>
import { ref, onMounted } from 'vue'

const url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=DEMO_KEY&sol=15";
const apiKey = process.env.VUE_APP_API_KEY;

const displayPage = ref(false);
const images = ref([]);
const displayedImages = ref([]);
const imagesPerPage = 9;
let currentPage = 1;

onMounted(() => {
  const user = localStorage.getItem('validUser');
  displayPage.value = user && user !== 'undefined';

  if (displayPage.value) {
    fetchImages();
  }
});

const fetchImages = async () => {
  try {
    const res = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (res.ok) {
      const fetchedImages = await res.json();
      images.value.push(...fetchedImages.photos);
      updateDisplayedImages();
    } else {
      console.error('Failed to fetch data');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const updateDisplayedImages = () => {
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  displayedImages.value = images.value.slice(0, endIndex);
};

const loadMoreImages = () => {
  currentPage++;
  updateDisplayedImages();
};
</script>

<template>
  <div>
    <div v-if="displayPage">
      <Nav></Nav>
      <Stepper/>
      <div class=" pt-20 pb-20">
        <div class=" content-container mx-auto grid grid-cols-12 justify-center">
      <div class="col-start-1 col-end-7 grid grid-cols-3 gap-2">
        <div v-for="(image, index) in displayedImages" :key="index" class="w-40 h-40 overflow-hidden">
          <img :src="image.img_src" alt="mars image" class="object-cover w-full h-full">
        </div>
      
      <button @click="loadMoreImages" v-if="displayedImages.length < images.length">Load More</button></div>
    </div></div></div>
    <h1 v-else>This page is protected</h1>
  </div>

</template>
