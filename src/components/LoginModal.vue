<script>
export default {
  props: ["inputType"],
  data() {
    return {
      formState: {
        login: "",
        password: "",
      },
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    handleSubmit(e) {
      this.$emit("submited", this.formState);
    },
    register() {
      this.$emit("register");
    },
  },
};
</script>

<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header"> </slot>
        <button type="button" class="btn-close" @click="close">x</button>
      </header>

      <section class="modal-body">
        <slot name="body">
          <form
            id="login-form"
            class="login-form"
            @submit.prevent="handleSubmit"
          >
            <div class="login-form__input">
              <p>Username:</p>
              <div class="input">
                <input v-model="formState.login" type="text" />
              </div>
            </div>
            <div class="login-form__input">
              <p>Password:</p>
              <div class="input">
                <input
                  autocomplete="new-password"
                  v-model="formState.password"
                  :type="inputType"
                />
              </div>
            </div>
            <button class="orderBtn">
              <slot name="form-btn">Войти</slot>
            </button>
          </form>
        </slot>
      </section>

      <footer class="modal-footer">
        <div>
          <slot name="footer-up">Еще нет аккаунта?</slot>
        </div>
        <p
          style="margin: 0; cursor: pointer; font-size: 15px; color: #0000ff"
          @click="register"
        >
          <slot name="footer-link">Зарегистрируйтесь</slot>
        </p>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.orderBtn {
  background: #9dd558;
  border-radius: 18px;
  height: 40px;
  border: 0;
  cursor: pointer;
  color: #fff;
  width: 60%;
  font-weight: 500;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: lighten(#9dd558, 5%);
  }

  &:active {
    background: darken(#9dd558, 5%);
  }
}
.modal-backdrop {
  z-index: 1;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  &__input {
    display: flex;
    gap: 20px;
    align-items: center;
    p {
      flex: 1;
      width: 90px;
      padding: 0;
      margin: 0;
      font-size: 15px;
    }
    .input {
      flex: 1.9;
      border: 1px solid #cfcfcf;
      display: flex;
      border-radius: 10px;
      input {
        border-radius: 10px;
        width: 100%;
        border: 0;
        padding: 6px;
        font-size: 15px;
        outline: 0;
      }
    }
  }
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  width: 500px;
  padding: 16px;
  border-radius: 6px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: black;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: row;
  justify-content: center;
  font-size: 15px;
  gap: 10px;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: black;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
</style>
