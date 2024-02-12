<template>
  <main>
    <!-- Current date -->
    <div class="text-center mb-6">
      {{
        new Date().toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      }}
    </div>

    <!-- Search -->
    <div>
      <SearchInput @place-data="addPlace" />
    </div>

    <!-- Weather cards -->
    <div class="grid grid-cols-2 gap-4">
      <div v-for="(place, index) in places" :key="index">
        <WeatherCard :place="place" @delete-place="deletePlace" />
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import SearchInput from "./components/SearchInput.vue";
import WeatherCard from "./components/WeatherCard.vue";
import { usePlacesStore } from "./store/store";
import { storeToRefs } from "pinia";

onMounted(() => {
  if (!places.value[0]) {
    const historyPlaces = JSON.parse(localStorage.getItem("Places"));
    console.log(historyPlaces);
    for (let place in historyPlaces) {
      addPlace(historyPlaces[place]);
    }
  }
});

const { addPlace, deletePlace } = usePlacesStore();
const { places } = storeToRefs(usePlacesStore());
</script>
