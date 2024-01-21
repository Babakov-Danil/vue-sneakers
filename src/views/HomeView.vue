<script>
import Card from "../components/Card.vue";
import { useCartStore } from "../stores/cart";
import { useFavoriteStore } from "../stores/favorite";
import { mapState } from "pinia";

export default {
  components: { Card },
  data() {
    return {
      sneakers: [],
      cart: [],
      favorite: [],
      search: "",
    };
  },
  mounted() {},

  computed: {
    ...mapState(useFavoriteStore, ["getFavoriteItems"]),
    ...mapState(useCartStore, ["getCartItems"]),

    filteredSneakers() {
      return this.sneakers.filter((element) => {
        if (element.title.toLowerCase().includes(this.search)) {
          return element;
        }
      });
    },
  },

  created() {
    this.cart = this.getCartItems;
    this.favorite = this.getFavoriteItems;
    this.sneakers.push(
      {
        id: 1,
        title: "Кроссовки Puma X Aka Boku Future Rider",
        price: 8999,
      },
      {
        id: 2,
        title: "Мужские Кроссовки Under Armour Curry 8",
        price: 15199,
      },
      {
        id: 3,
        title: "Мужские Кроссовки Nike Kyrie 7",
        price: 11299,
      },
      {
        id: 4,
        title: "Мужские Кроссовки Nike Kyrie Flytrap IV",
        price: 11299,
      },
      {
        id: 5,
        title: "Мужские Кроссовки Jordan Air Jordan 11",
        price: 10799,
      },
      {
        id: 6,
        title: "Мужские Кроссовки Nike Air Max 270",
        price: 12999,
      },
      {
        id: 7,
        title: "Мужские Кроссовки Nike LeBron XVIII",
        price: 16499,
      },
      {
        id: 8,
        title: "Мужские Кроссовки Nike Lebron XVIII Low",
        price: 13999,
      },
      {
        id: 9,
        title: "Мужские Кроссовки Nike Blazer Mid Suede",
        price: 8499,
      },
      {
        id: 10,
        title: "Мужские Кроссовки Nike Blazer Mid Suede",
        price: 8499,
      },
      {
        id: 11,
        title: "Кроссовки Puma X Aka Boku Future Rider",
        price: 8999,
      },
      {
        id: 12,
        title: "Мужские Кроссовки Nike Blazer Mid Suede",
        price: 12999,
      }
    );
  },

  methods: {},
};
</script>

<template>
  <div>
    <div class="contentheader">
      <h1>Все кроссовки</h1>
      <div class="search">
        <img src="/static/search.svg" alt="search" />
        <input v-model="search" placeholder="Поиск..." type="text" />
      </div>
    </div>
    <div
      class="contentwrapper"
      :class="{ jstart: filteredSneakers.length < 4 }"
    >
      <Card
        v-for="sneaker in filteredSneakers"
        :key="sneaker.id"
        :sneaker="sneaker"
        :inCart="
          (getCartItems.find((item) => item.id == sneaker.id) && true) || false
        "
        :liked="
          (favorite.find((item) => item.id == sneaker.id) && true) || false
        "
      ></Card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.jstart {
  justify-content: start !important;
}
.contentheader {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 40px;
  column-gap: 31px;

  .search {
    border: 1px solid #f3f3f3;
    display: flex;
    border-radius: 10px;
    padding: 0 15px;

    input {
      border: 0;
      padding: 13px;
      font-size: 16px;
      outline: 0;
      width: 191.08px;
    }
  }
}

.contentwrapper {
  display: grid;
  gap: 40px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 220px));
  justify-content: space-evenly;
}
</style>
