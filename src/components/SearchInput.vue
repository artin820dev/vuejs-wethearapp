<template>
  <div>
    <!-- search Input -->
    <form>
      <div
        class="bg-white border border-indigo-600/30 rounded-lg shadow-lg flex items-center"
      >
        <i class="fa-solid fa-magnifying-glass p-2 text-indigo-600"></i>
        <input
          type="text"
          placeholder="Search for a place"
          class="rounded-r-lg p-2 border-0 outline-0 focus:ring-2 focus:ring-indigo-600 ring-inset w-full"
          v-model="searchTerm.query"
          @input="handleSearch"
        />
      </div>
    </form>

    <!-- Search suggestions -->
    <div class="bg-white my-2 rounded-lg shadow-lg">
      <div v-if="searchTerm.results !== null">
        <div v-for="place in searchTerm.results" :key="place.id">
          <button
            @click="getWeather(place.url)"
            class="px-3 my-2 hover:text-indigo-600 hover:font-bold w-full text-left"
          >
            {{ place.name }}, {{ place.region }}, {{ place.country }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchTerm: {
        query: "",
        timeout: null,
        results: null,
      },
    };
  },
  methods: {
    // City searching

    async handleSearch() {
      clearTimeout(this.searchTerm.timeout);
      this.searchTerm.timeout = setTimeout(async () => {
        if (this.searchTerm.query !== "") {
          try {
            const response = await axios.get(
              `https://api.weatherapi.com/v1/search.json?key=76b3773717d94886a7b82725241102&q=${this.searchTerm.query}`
            );

            this.searchTerm.results = response.data;
          } catch (error) {
            console.error("Error fetching search results:", error);
          }
        } else {
          this.searchTerm.results = null;
        }
      }, 500);
    },

    // weather data

    async getWeather(url) {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=76b3773717d94886a7b82725241102&q=${url}&days=3&aqi=no&alerts=no`
        );

        this.$emit("place-data", response.data);

        this.searchTerm.query = "";
        this.searchTerm.results = null;
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },
  },
};
</script>
