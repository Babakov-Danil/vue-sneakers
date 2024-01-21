<template>
  <button class="orderBtn">
    <img class="back" src="/static/arrow-right.svg" alt="Arrow" />
    Вернуться назад
  </button>
</template>

<style lang="scss" scoped>
.back {
  left: 30px;
  rotate: 180deg;
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
</style>
