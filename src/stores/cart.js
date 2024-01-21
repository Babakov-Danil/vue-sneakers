import { defineStore } from "pinia";
import { saveOrder, getOrders } from "../api";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
    totalPrice: localStorage.getItem("totalPrice")
      ? JSON.parse(localStorage.getItem("totalPrice"))
      : 0,
    cartState: false,
    orders: [],
  }),

  actions: {
    addCartItem(item) {
      this.items.push(item);
      this.totalPrice += item.price;
      this.saveToLocal();
    },

    removeCartItem(item) {
      this.items = this.items.filter((el) => el.id != item.id);
      this.totalPrice -= item.price;
      this.saveToLocal();
    },

    changeCartState() {
      this.cartState = !this.cartState;
    },

    saveToLocal() {
      localStorage.setItem("cart", JSON.stringify(this.items));
      localStorage.setItem("totalPrice", JSON.stringify(this.totalPrice));
    },

    async completeOrder() {
      let res = await saveOrder(this.items);
      this.items = [];
      this.totalPrice = 0;
      this.saveToLocal();
      this.setOrders();
    },

    async setOrders() {
      let res = await getOrders();
      let id = JSON.parse(localStorage.getItem("user")).id;
      let orders = res.data.filter((element) => id == element.user_id);
      this.orders = [...orders];
    },
  },

  getters: {
    getCartItems(state) {
      return state.items;
    },
    getTotalPrice(state) {
      return state.totalPrice;
    },
    getCartState(state) {
      return state.cartState;
    },
    getDrawerState(state) {
      return state.items.length ? true : false;
    },
    async getOrders(state) {
      if (state.orders.length) {
        return state.orders;
      } else {
        await this.setOrders();
        return state.orders;
      }
    },
  },
});
