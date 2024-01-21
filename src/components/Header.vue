<script>
import { mapState } from "pinia";
import { useCartStore } from "../stores/cart";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(useCartStore, ["getTotalPrice", "changeCartState"]),
  },
  methods: {
    clickProfile() {
      this.$emit("clickProfile");
    },
  },
};
</script>

<template>
  <header>
    <router-link to="/">
      <div class="headerlogo">
        <img style="width: 40px; height: 40px" src="/static/logo.png" alt="" />
        <div class="headername">
          <h3>Vue Sneakers</h3>
          <p>Магазин реактивных кроссовок</p>
        </div>
      </div>
    </router-link>
    <ul class="headerinfo">
      <li class="cart" @click="changeCartState">
        <img style="width: 18px; height: 18px" src="/static/cart.svg" alt="" />
        <span>{{ getTotalPrice.toLocaleString("ru") }} руб.</span>
      </li>
      <li>
        <router-link to="/favorites">
          <img
            style="width: 18px; height: 18px"
            src="/static/like.svg"
            alt=""
          />
        </router-link>
      </li>
      <li class="profile" @click="clickProfile">
        <img
          style="width: 18px; height: 18px"
          src="/static/profile.svg"
          alt=""
        />
      </li>
    </ul>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 45px;
  flex-wrap: wrap;
  gap: 10px;

  border-bottom: 1px solid #eaeaea;

  .headerlogo {
    display: flex;
    align-items: center;

    img {
      margin-right: 15px;
    }

    .headername {
      h3 {
        text-transform: uppercase;
      }
      * {
        margin: 0;
      }
    }
  }

  .headerinfo {
    list-style: none;
    display: flex;
    padding: 0;
    gap: 10px 15px;
    flex-wrap: wrap;

    li {
      cursor: pointer;
    }

    .cart {
      width: max-content;
      img {
        margin-right: 15px;
      }
    }
  }
}
</style>
