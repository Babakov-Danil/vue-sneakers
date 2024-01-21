<script>
import { mapActions, mapState } from "pinia";
import DrawerCart from "./components/cart/DrawerCart.vue";
import Header from "./components/Header.vue";
import { useCartStore } from "./stores/cart";
import LoginModal from "./components/LoginModal.vue";
import router from "./router";
import { loginApi, registerApi } from "./api";
import Notification from "./components/notification.vue";
export default {
  components: { DrawerCart, Header, LoginModal, Notification },
  data() {
    return {
      cartItems: [],
      cartState: false,
      drawerNode: "",
      cartLogoNode: "",
      modalNode: "",
      profileIconNode: "",
      isLoginModalVisible: false,
      isRegisterModalVisible: false,
      notifications: [],
    };
  },

  methods: {
    ...mapActions(useCartStore, [
      "changeCartState",
      "completeOrder",
      "setOrders",
    ]),

    cartStateChange() {
      this.cartState = !this.cartState;
      console.log(this.cartState);
    },
    click(e) {
      if (
        !e.path.includes(this.drawerNode) &&
        !e.path.includes(this.cartLogoNode) &&
        this.getCartState
      ) {
        this.changeCartState();
      }
    },

    loginModal() {
      this.isLoginModalVisible = !this.isLoginModalVisible;
      this.isRegisterModalVisible = false;
    },

    registerModal() {
      this.isLoginModalVisible = false;
      this.isRegisterModalVisible = !this.isRegisterModalVisible;
    },

    async login(formState) {
      let res = await loginApi(formState);
      let a = res.data.find(
        (element) =>
          element.login == formState.login &&
          element.password == formState.password
      );
      if (a) {
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem(
          "user",
          JSON.stringify({ login: a.login, id: a.id })
        );
        this.addNotification("Авторизация:", "успешно авторизировались");
        this.isLoginModalVisible = false;
      } else {
        this.addNotification("Авторизация:", "неверный логин или пароль");
      }
    },

    addNotification(info, text) {
      this.notifications.push({
        info: info,
        text: text,
      });
      setTimeout(() => {
        this.notifications.splice(0, 1);
      }, 4000);
    },

    async register(formState) {
      let res = await loginApi();
      if (res.data.find((element) => element.login == formState.login)) {
        this.addNotification("Регистрация:", "аккаунт уже существует");
      } else {
        let a = await registerApi(formState);
        if (a) {
          localStorage.setItem("isAuthenticated", true);
          JSON.stringify({ login: a.login, id: a.id });
          this.addNotification("Регистрация:", "регистрация прошла успешно");
          this.isRegisterModalVisible = false;
        } else {
          this.addNotification("Регистрация:", "что-то пошло не так");
        }
      }
    },
    clickProfile() {
      if (localStorage.getItem("isAuthenticated")) {
        router.push("profile");
      } else {
        this.loginModal();
      }
    },
    saveOrder() {
      if (localStorage.getItem("isAuthenticated")) {
        this.completeOrder();
      } else {
        this.loginModal();
        this.changeCartState();
      }
    },
  },

  computed: {
    ...mapState(useCartStore, ["getCartState"]),
  },
  mounted() {
    this.drawerNode = document.querySelector(".drawer");
    this.cartLogoNode = document.querySelector(".cart");
  },
};
</script>

<template>
  <div style="display: flex; gap: 20px">
    <Notification :notifications="notifications" />
  </div>
  <div class="wrapper" @click="click" style="overflow: hidden">
    <transition name="modal-fade">
      <login-modal
        style="z-index: 10"
        v-if="isLoginModalVisible"
        @close="loginModal"
        @register="registerModal"
        inputType="password"
        @submited="login"
      >
        <template v-slot:footer-up>Еще нет аккаунта?</template>
        <template v-slot:footer-link> Зарегистрироваться </template>
        <template v-slot:form-btn> Войти </template>

        <template v-slot:header>
          <h2 style="margin: 0">Sign In</h2>
        </template>
      </login-modal>
    </transition>

    <transition name="modal-fade">
      <login-modal
        style="z-index: 10"
        v-if="isRegisterModalVisible"
        @close="registerModal"
        @register="loginModal"
        inputType="text"
        @submited="register"
      >
        <template v-slot:footer-up>Уже есть аккаунт?</template>
        <template v-slot:footer-link> Войти </template>
        <template v-slot:form-btn> Зарегистрироваться </template>

        <template v-slot:header>
          <h2 style="margin: 0">Sign Up</h2>
        </template>
      </login-modal>
    </transition>

    <drawer-cart :cartState="cartState" @saveOrder="saveOrder" />

    <Header @openCart="cartStateChange" @clickProfile="clickProfile" />
    <div class="content">
      <router-view v-slot="{ Component }">
        <transition name="route" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style lang="scss">
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-leave-active {
  transition: all 0.2s ease-in-out;
}

.modal-fade-enter-from {
  z-index: 1;
  opacity: 0;
}

.modal-fade-enter-active {
  z-index: 1;
  transition: all 0.4s ease-in-out;
}

.wrapper {
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.04);
  border-radius: 20px;
  max-width: 1080px;
  min-width: 355px;
  width: calc(100vw - 90px);
  margin: 50px auto;
}
.content {
  padding: 40px;
}
.route-enter-from {
  opacity: 0;
  transform: translateX(150px);
  overflow: hidden;
}
.route-enter-active {
  transition: all 0.4s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-150px);
  overflow: hidden;
}
.route-leave-active {
  transition: all 0.4s ease-in;
}
</style>
