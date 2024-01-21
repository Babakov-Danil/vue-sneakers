<script>
import { useCartStore } from "../stores/cart";
import { useFavoriteStore } from "../stores/favorite";
import { mapActions } from "pinia";
export default {
  props: {
    sneaker: { type: Object, default: {} },
    showIcons: { type: Boolean, default: true },
    inCart: { type: Boolean, default: false },
    liked: { type: Boolean, default: false },
  },
  data() {
    return {};
  },

  methods: {
    ...mapActions(useCartStore, [
      "addCartItem",
      "removeCartItem",
      "checkItemInCart",
    ]),
    ...mapActions(useFavoriteStore, ["addFavoriteItem", "removeFavoriteItem"]),

    // setFavoriteMarker() {
    //   this.liked = !this.liked;
    // },

    // setItemMarker() {
    //   this.inCart = !this.inCart;
    // },

    addToCart() {
      this.addCartItem(this.sneaker);
    },

    removeFromCart() {
      this.removeCartItem(this.sneaker);
    },

    addToFavorite() {
      this.addFavoriteItem(this.sneaker);
    },

    removeFromFavorite() {
      this.removeFavoriteItem(this.sneaker);
    },
  },
};
</script>

<template>
  <div class="card">
    <div class="favorite" @click="setFavoriteMarker">
      <div class="flipper" v-if="showIcons" :class="{ flip: liked }">
        <div class="front" @click="addToFavorite">
          <img src="/static/heart-unliked.svg" alt="Unliked" />
        </div>
        <div class="back" @click="removeFromFavorite">
          <img src="/static/heart-liked.svg" alt="Liked" />
        </div>
      </div>
    </div>
    <img
      width="133"
      height="112"
      :src="'static/sneakers/image' + sneaker.id + '.png'"
      alt="sneaker"
    />
    <h5>{{ sneaker.title }}</h5>
    <div class="cardinfo">
      <div class="cardprice">
        <span>Цена:</span>
        <b>{{ sneaker.price.toLocaleString("ru") }} руб.</b>
      </div>
      <div
        class="flipper"
        v-if="showIcons"
        :class="{ flip: inCart }"
        @click="setItemMarker"
      >
        <div class="front">
          <button @click="addToCart">
            <img width="11" height="11" src="/static/plus.svg" alt="Plus" />
          </button>
        </div>
        <div class="back">
          <button class="addedToCart" @click="removeFromCart">
            <img width="11" height="11" src="/static/checked.svg" alt="Plus" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.flipper {
  transition: 0.6s;
  transform-style: preserve-3d;
  height: 30px;
  width: 30px;

  position: relative;
}

.front {
  z-index: 2;
}

.back {
  transform: rotateY(180deg);
}

.front,
.back {
  backface-visibility: hidden;
  position: fixed;
  top: 0;
  left: 0;
}

.flip {
  transform: rotateY(180deg);
}

.card {
  border: 1px solid #f3f3f3;
  border-radius: 40px;
  padding: 30px;
  width: 220px;
  transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
  // cursor: pointer;

  &:hover {
    box-shadow: 0px 20px 35px rgba(0, 0, 0, 0.06);
    transform: translateY(-5px);
  }

  .favorite {
    position: absolute;
    cursor: pointer;
    perspective: 1000;
  }

  h5 {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
  }

  .cardinfo {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      background: #ffffff;
      border: 1px solid #f2f2f2;
      border-radius: 8px;
      width: 30px;
      height: 30px;
      cursor: pointer;
    }

    .addedToCart {
      background: linear-gradient(180deg, #89f09c 0%, #3cc755 100%);
      img {
        position: fixed;
        transform: translate(-50%, -50%);
      }
    }
  }
  .cardprice {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    span {
      font-size: 13px;
      opacity: 0.5;
      text-transform: uppercase;
    }
    b {
      font-size: 14px;
    }
  }
}
</style>
