import { defineStore } from "pinia";

export const usePlacesStore = defineStore("todos", {
  state: () => ({
    places: [],
  }),

  actions: {
    addPlace(data) {
      this.places.push(data);

      const jsonPlaces = JSON.stringify(this.places);

      localStorage.setItem("Places", jsonPlaces);
    },
    deletePlace(name) {
      if (confirm("Are you sure")) {
        this.places = this.places.filter((p) => p.location.name !== name);

        const jsonPlaces = JSON.stringify(this.places);

        localStorage.setItem("Places", jsonPlaces);
      }
    },
  },
});
