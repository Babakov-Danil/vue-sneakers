<script>
import CartItem from "./CartItem.vue";
import { useCartStore } from "../../stores/cart";
import { mapActions, mapState } from "pinia";
import BackButton from "../backButton.vue";
export default {
  props: ["cartState"],
  data() {
    return {};
  },
  components: { CartItem, BackButton },
  computed: {
    ...mapState(useCartStore, [
      "getCartState",
      "getTotalPrice",
      "getCartItems",
      "getDrawerState",
    ]),
  },
  methods: {
    ...mapActions(useCartStore, [
      "changeCartState",
      "removeCartItem",
      "completeOrder",
    ]),
    removeFromCart(item) {
      this.removeCartItem(item);
    },
    saveOrder() {
      this.$emit("saveOrder");
    },
  },
};
</script>

<template>
  <div
    class="overlayTransition"
    :class="{ overlay: getCartState, hide: !getCartState }"
  >
    <div class="drawer" :class="{ drawer__active: getCartState }">
      <h2 class="cartClose">
        Корзина
        <img
          @click="changeCartState"
          src="/static/btn-remove.svg"
          alt="Remove"
        />
      </h2>

      <div v-if="getDrawerState" class="cartItems">
        <div class="items">
          <transition-group name="card" tag="div">
            <cart-item
              v-for="cartItem in getCartItems"
              :key="cartItem.id"
              :cartItem="cartItem"
              @removeFromCart="removeFromCart"
            >
            </cart-item>
          </transition-group>
        </div>

        <div class="checkout">
          <ul>
            <li class="checkoutTotal">
              <span>Итого:</span>
              <div></div>
              <b>{{ getTotalPrice.toLocaleString("ru") }} руб.</b>
            </li>
            <li class="checkoutTax">
              <span>Налог 5%:</span>
              <div></div>
              <b
                >{{
                  Math.round(getTotalPrice * 0.05).toLocaleString("ru")
                }}
                руб.</b
              >
            </li>
          </ul>

          <button class="orderBtn" @click="saveOrder">
            Оформить заказ
            <img class="order" src="/static/arrow-right.svg" alt="Arrow" />
          </button>
        </div>
      </div>

      <transition name="emptyCart">
        <div class="noCartItems" v-if="!getDrawerState">
          <img
            height="120"
            width="120"
            src="/static/emptyCart.png"
            alt="No items in cart"
          />
          <h2>Корзина пустая</h2>
          <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
          <back-button @click="changeCartState" />
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-enter-active,
.card-leave-active,
.emptyCart-enter-active,
.emptyCart-leave-active {
  transition: all 0.5s ease;
}
.card-enter-from,
.card-leave-to,
.emptyCart-enter-from,
.emptyCart-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.cartClose {
  margin: 0;
  margin-bottom: 30px;
  padding: 0;
  display: flex;
  justify-content: space-between;
  img {
    cursor: pointer;
  }
}

.orderBtn {
  position: relative;

  &:hover {
    img {
      transform: translateX(5px);
    }
  }

  img {
    position: absolute;
    top: 20px;
    transition: transform 0.15s ease-in-out;
  }

  .order {
    right: 30px;
  }
}
.orderBtn {
  background: #9dd558;
  border-radius: 18px;
  height: 55px;
  border: 0;
  cursor: pointer;
  color: #fff;
  width: 100%;
  font-weight: 500;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: lighten(#9dd558, 5%);
  }

  &:active {
    background: darken(#9dd558, 5%);
  }
}

.noCartItems {
  flex: 1;
  padding: 20px 30px 20px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    margin: 0;
    padding: 0;
  }
  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #000000;
    opacity: 0.4;
  }
}
.overlayTransition {
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: transparent;
}

.hide {
  transition: background 0.4s, z-index 0s 0.4s;
}
.overlay {
  transition: background 0.4s, z-index 0s 0s;

  background: rgba(0, 0, 0, 0.6);

  z-index: 1;
}

.drawer__active {
  transform: translateX(0) !important;
}

.drawer {
  display: flex;
  flex-direction: column;
  transition: 0.4s ease-in-out;
  position: absolute;
  max-width: 420px;
  width: 100%;
  height: 100%;
  right: 0;
  background: #ffffff;
  padding: 30px 20px 30px 30px;
  transform: translateX(100%);
  z-index: 2;
}

.drawer:last-child {
  justify-content: center;
}

.cartItems {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 122px);
  width: 100%;
}

::-webkit-scrollbar {
  width: 16px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}
.items {
  flex: 1;
  overflow-x: auto;
  margin-bottom: 40px;
}

.checkout {
  ul {
    margin: 0;
    padding: 0;
    margin-bottom: 20px;

    li {
      display: flex;
      align-items: flex-end;
      margin-bottom: 20px;
    }
    div {
      flex: 1;
      height: 1px;
      border-bottom: 1px dashed #dfdfdf;
      position: relative;
      top: -4px;
      margin: 0px 10px;
    }
  }
}
</style>
