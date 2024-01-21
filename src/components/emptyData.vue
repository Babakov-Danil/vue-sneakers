<script>
import backButton from "./backButton.vue";
export default {
  components: { backButton },

  methods: {
    getRandomEmoji() {
      return Math.floor(Math.random() * 9) + 1;
    },
  },
};
</script>

<template>
  <div style="text-align: center">
    <img :src="'static/emojis/' + getRandomEmoji() + '.png'" />
    <h3 style="font-weight: 600; font-size: 24px; color: #000000">
      Здесь пусто :(
    </h3>
    <p style="color: #000000; font-weight: 400; font-size: 16px; opacity: 0.5">
      <slot></slot>
    </p>
    <router-link to="/"
      ><back-button style="width: 320px; margin-top: 40px"
    /></router-link>
  </div>
</template>
