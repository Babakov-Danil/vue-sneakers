<script>
export default {
  props: ["cartItem"],
  data() {
    return {
      id: 0,
      title: "",
      price: 0,
    };
  },
  mounted() {
    this.id = this.cartItem.id;
    this.price = this.cartItem.price;
    this.title = this.cartItem.title;
  },
  methods: {
    removeFromCart() {
      this.$emit("removeFromCart", this.cartItem);
    },
  },
};
</script>

<template>
  <div class="cartItem">
    <img
      class="cartItemSneakers"
      width="70"
      height="70"
      :src="'static/sneakers/image' + id + '.png'"
      alt="Sneakers"
    />
    <div class="cartItemInfo">
      <p>{{ title }}</p>
      <b>{{ price.toLocaleString("ru") }} руб.</b>
    </div>
    <img
      @click="removeFromCart"
      class="cartItemRemoveBtn"
      src="/static/btn-remove.svg"
      alt="Remove"
    />
  </div>
</template>

<style lang="scss" scoped>
.cartItem {
  margin-bottom: 20px;
  height: 120px;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  border: 1px solid #f3f3f3;
  overflow: hidden;

  &Sneakers {
    // margin: 0px 10px 10px 0px;
    position: relative;
    top: 37%;
    left: 8%;
    transform: translate(-50%, -50%);
  }

  &Info {
    margin-right: 20px;
    p {
      margin-bottom: 5px;
      font-size: 14px;
    }
    b {
      font-size: 13px;
    }
  }

  &RemoveBtn {
    opacity: 0.5;
    transition: opacity 0.15s ease-in-out;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
