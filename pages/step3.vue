<script setup>
import { ref, onMounted } from "vue";

import { useGlobalStore } from "../store/user";
import { useSteps } from "../store/stepper";
const globalStore = useGlobalStore();
const stepperStore = useSteps();
const displayPage = ref(false);
const latitude = ref(null);
const longitude = ref(null);
let currentTimestamp = ref(null);
const map = ref(null);
const markerLayer = ref(null);

const runtimeConfig = useRuntimeConfig();

onMounted(async () => {
  const user = localStorage.getItem("validUser");
  displayPage.value = user && user !== "undefined";

  if (displayPage.value) {
    await loadOpenLayersLibrary();
    createMap();
    fetchISSLocation();
    setInterval(fetchISSLocation, 60000);
  }
});

const fetchISSLocation = async () => {
  const timestamp = Date.now();
  const unixTimestamp = Math.floor(timestamp / 3000);

  try {
    const response = await fetch(
      `https://api.wheretheiss.at/v1/satellites/25544?timestamp=${unixTimestamp}`
    );
    if (response.ok) {
      const data = await response.json();
      latitude.value = data.latitude;
      longitude.value = data.longitude;
      currentTimestamp = unixTimestamp;

      // Update the map with new coordinates
      updateMap();
    } else {
      console.error("Failed to fetch ISS location data");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const loadOpenLayersLibrary = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/ol@v7.2.2/dist/ol.js";

    script.type = "text/javascript";
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;

    document.head.appendChild(script);
  });
};

const createMap = () => {
  const apiKey = runtimeConfig.public.VUE_APP_MAP_API_KEY;
  map.value = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.XYZ({
          url: `https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=${apiKey}`,
        }),
      }),
    ],
    target: "map",
  });

  // Create the marker layer
  markerLayer.value = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [],
    }),
    style: new ol.style.Style({
      image: new ol.style.Icon({
        src: "https://docs.maptiler.com/openlayers/default-marker/marker-icon.png",
        anchor: [0.5, 1],
      }),
    }),
  });

  // Set a name for the marker layer for easy identification
  markerLayer.value.set("name", "marker");

  // Add the marker layer to the map
  map.value.addLayer(markerLayer.value);
};

const updateMap = () => {
  if (map.value && latitude.value !== null && longitude.value !== null) {
    // Update the map's view (center and zoom) with the new coordinates
    const view = map.value.getView();
    view.setCenter(
      ol.proj.fromLonLat([Number(longitude.value), Number(latitude.value)])
    );
    view.setZoom(5);

    // Update the marker layer with the new coordinates
    const markerSource = markerLayer.value.getSource();
    markerSource.clear();
    markerSource.addFeature(
      new ol.Feature({
        geometry: new ol.geom.Point(
          ol.proj.fromLonLat([Number(longitude.value), Number(latitude.value)])
        ),
      })
    );
  }
};

function updateReport() {
  globalStore.setLongitude(longitude.value);
  globalStore.setLatitude(latitude.value);
  globalStore.setTimestamp(currentTimestamp);
  stepperStore.setStep("step4");
}
</script>

<template>
  <div v-if="displayPage" class="h-screen">
    <Nav></Nav>
    <Stepper />
    <div class="pt-20 pb-20">
      <div class="content-container mx-auto grid grid-cols-12 justify-center">
        <div id="map" class="col-start-1 col-end-7"></div>
        <div class="col-start-8 col-end-13 flex flex-col gap-20">
          <label class="flex flex-col gap-4"
            >Latitude:
            <input
              class="border text-black p-2 border-gray-600 h-12"
              type="text"
              readonly
              v-model="latitude"
            />
          </label>

          <label class="flex flex-col gap-4"
            >Longitude:
            <input
              class="border text-black p-2 border-gray-600 h-12"
              type="text"
              readonly
              v-model="longitude"
            />
          </label>
          <NuxtLink
            @click="updateReport"
            class="rounded h-12 w-52 hover:scale-105 bg-white text-black flex flex-col items-center justify-center"
            to="/step4"
            >NEXT STEP</NuxtLink
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
