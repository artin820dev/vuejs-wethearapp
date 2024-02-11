<script>
import SearchInput from "./components/SearchInput.vue";
import WeatherCard from "./components/WeatherCard.vue";

export default {
  data() {
    return {
      places: [],
    };
  },
  methods: {
    addPlace(data) {
      this.places.push(data);
      console.log(this.places);
    },
    deletePlace(name) {
      if (confirm("Are you sure")) {
        this.places = this.places.filter((p) => p.location.name !== name);
      }
    },
  },
  components: {
    SearchInput,
    WeatherCard,
  },
};
</script>

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
