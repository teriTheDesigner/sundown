<script setup>
// useHead({
//   script: [
//     {
//       src: "https://cdn.jsdelivr.net/npm/ol@v7.2.2/dist/ol.js",
//       type: "text/javascript",
//       async: true,
//     },
//   ],

//   link: [
//     {
//       href: "https://cdn.jsdelivr.net/npm/ol@v7.2.2/ol.css",
//       rel: "stylesheet",
//     },
//   ],
// });

import { ref, onMounted, watchEffect } from "vue";
import { useGlobalStore } from "../store/user";
const globalStore = useGlobalStore();

const displayPage = ref(false);
const latitude = ref(null);
const longitude = ref(null);
const map = ref(null);

onMounted(async () => {
  const user = localStorage.getItem("validUser");
  displayPage.value = user && user !== "undefined";

  if (displayPage.value) {
    fetchISSLocation();
    setInterval(fetchISSLocation, 60000);
    await loadOpenLayersLibrary();
  }
});

const fetchISSLocation = async () => {
  const timestamp = Date.now();
  const unixTimestamp = Math.floor(timestamp / 3000);
  console.log(unixTimestamp);
  try {
    const response = await fetch(
      `https://api.wheretheiss.at/v1/satellites/25544?timestamp=${unixTimestamp}`
    );
    if (response.ok) {
      const data = await response.json();
      latitude.value = data.latitude;
      longitude.value = data.longitude;
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

watchEffect(() => {
  if (latitude.value !== null && longitude.value !== null) {
    map.value = null;
    createMap();
  }
});

const createMap = () => {
  console.log(latitude.value, longitude.value);
  if (latitude.value !== null && longitude.value !== null) {
    map.value = new ol.Map({
      layers: [
        new ol.layer.Tile({
          source: new ol.source.XYZ({
            url: "https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=00BVJaSkhTUVFkQcPsvf",
          }),
        }),
      ],
      target: "map",
      view: new ol.View({
        center: ol.proj.fromLonLat([
          Number(longitude.value),
          Number(latitude.value),
        ]),
        zoom: 2,
      }),
    });

    if (latitude.value !== null && longitude.value !== null) {
      const marker = new ol.layer.Vector({
        source: new ol.source.Vector({
          features: [
            new ol.Feature({
              geometry: new ol.geom.Point(
                ol.proj.fromLonLat([
                  Number(longitude.value),
                  Number(latitude.value),
                ])
              ),
            }),
          ],
        }),
        style: new ol.style.Style({
          image: new ol.style.Icon({
            src: "https://docs.maptiler.com/openlayers/default-marker/marker-icon.png",
            anchor: [0.5, 1],
          }),
        }),
      });

      map.value.addLayer(marker);
    }
  }
};
</script>

<template>
  <div v-if="displayPage">
    <Nav></Nav>
    <Stepper />
    <div class="pt-20 pb-20">
      <div class="content-container mx-auto grid grid-cols-12 justify-center">
        <div id="map" class="col-start-1 col-end-7"></div>
        <div class="col-start-8 col-end-13 flex flex-col gap-20">
          <label class="flex flex-col gap-4"
            >Latitude:
            <input
              class="border p-2 border-gray-600 h-12"
              type="text"
              readonly
              v-model="latitude"
            />
          </label>

          <label class="flex flex-col gap-4"
            >Longitude:
            <input
              class="border p-2 border-gray-600 h-12"
              type="text"
              readonly
              v-model="longitude"
            />
          </label>
          <NuxtLink
            class="rounded h-12 w-52 bg-slate-400 flex flex-col items-center justify-center"
            to="/step4"
            >NEXT STEP</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
  <h1 v-else>This page is protected</h1>
</template>
