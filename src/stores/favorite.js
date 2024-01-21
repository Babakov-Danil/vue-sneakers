import { defineStore } from "pinia";

export const useFavoriteStore = defineStore("favorite", {
  state: () => ({
    items: localStorage.getItem("favorite")
      ? JSON.parse(localStorage.getItem("favorite"))
      : [],
  }),

  actions: {
    addFavoriteItem(item) {
      item.liked = true;
      this.items.push(item);
      this.saveToLocal();
    },
    removeFavoriteItem(item) {
      this.items.forEach((element, index) => {
        if (element.id == item.id) {
          this.items.splice(index, 1);
          this.saveToLocal();
        }
      });
    },
    saveToLocal() {
      localStorage.setItem("favorite", JSON.stringify(this.items));
    },
  },

  getters: {
    getFavoriteItems(state) {
      return state.items;
    },
  },
});
