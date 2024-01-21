<script>
export default {
  props: ["notifications"],
};
</script>

<template>
  <div class="notifications">
    <div
      v-for="notification in notifications"
      :key="notification"
      class="container"
    >
      <div class="rectangle">
        <div class="notification-text">
          <p class="material-icons">
            {{ notification.info }} {{ notification.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.notifications {
  margin: 20px 20px 0 0;
  display: flex;
  position: absolute;
  flex-direction: column;
  right: 0;
  gap: 20px;
}
.container {
  position: relative;
}

.rectangle {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  width: 50px;
  height: 50px;
  background: #9c1e1c;
  transform: scale(0);
  border-radius: 50%;
  color: white;
  opacity: 0;
  overflow: hidden;
  animation: scale-in 0.3s ease-out forwards,
    expand 0.35s 0.25s ease-out forwards;
}

.notification-text {
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  animation: fade-in 0.65s ease-in forwards;
}

@keyframes scale-in {
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes expand {
  50% {
    width: 350px;
    border-radius: 6px;
  }
  100% {
    width: 300px;
    border-radius: 4px;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 3px 3px -1px rgba(0, 0, 0, 0.12);
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.8;
  }
}
</style>
