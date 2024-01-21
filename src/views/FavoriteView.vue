<script>
import { mapState } from "pinia";
import Card from "../components/Card.vue";
import { useFavoriteStore } from "../stores/favorite";
import { useCartStore } from "../stores/cart";
import EmptyData from "../components/emptyData.vue";

export default {
  computed: {
    ...mapState(useFavoriteStore, ["getFavoriteItems"]),
    ...mapState(useCartStore, ["getCartItems"]),
  },
  components: { Card, EmptyData },
  created() {},
};
</script>

<template>
  <div>
    <div v-if="getFavoriteItems.length">
      <h2 class="name">
        <router-link to="/">
          <img width="35" height="35" src="/static/back.svg" alt="back" />
        </router-link>
        Мои закладки
      </h2>
      <div
        class="favoriteItems"
        :class="{ firstItem: getFavoriteItems.length < 4 }"
      >
        <Card
          v-for="favItem in getFavoriteItems"
          :key="favItem.id"
          :sneaker="favItem"
          :inCart="
            (getCartItems.find((item) => item.id == favItem.id) && true) ||
            false
          "
          :liked="
            (getFavoriteItems.find((item) => item.id == favItem.id) && true) ||
            false
          "
        />
      </div>
    </div>
    <empty-data v-if="!getFavoriteItems.length">
      Вы ничего не добавляли в закладки</empty-data
    >
  </div>
</template>

<style lang="scss" scoped>
.name {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  img {
    cursor: pointer;
  }
}

.favoriteItems {
  display: grid;
  gap: 40px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 220px));
  justify-content: space-evenly;
}

.firstItem {
  justify-content: start;
}
</style>
