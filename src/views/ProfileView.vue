<script>
import { mapActions, mapState } from "pinia";
import EmptyData from "../components/emptyData.vue";
import { useCartStore } from "../stores/cart";
export default {
  components: { EmptyData },
  data() {
    return {
      loading: true,
      orders: [],
    };
  },
  async created() {
    this.orders = await this.getOrders;
    this.loading = false;
  },
  methods: {
    ...mapActions(useCartStore, ["setOrders"]),
  },
  computed: {
    ...mapState(useCartStore, ["getOrders"]),
  },
};
</script>

<template>
  <div>
    <div v-if="orders.length">
      <h2 class="name">
        <router-link to="/">
          <img width="35" height="35" src="/static/back.svg" alt="back" />
        </router-link>
        Мои заказы
      </h2>
      <div class="orders">
        <div class="order" v-for="order in orders" :key="order.id">
          <h3>
            Заказ № {{ order.id }}
            <div class="items">
              <div
                class="item"
                v-for="(item, index) in order.order"
                :key="index"
              >
                <img
                  :src="
                    '/vueSneakersPage/static/sneakers/image' + item.id + '.png'
                  "
                  alt=""
                />
                <p>{{ item.title }}</p>
              </div>
            </div>
          </h3>
        </div>
      </div>
    </div>
    <empty-data v-if="!orders.length">
      Вы не оформили ни одного заказа
    </empty-data>
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

.orders {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.order {
  border: 1px solid #bfbfbf;
  border-radius: 40px;
  padding: 20px;

  transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
  h3 {
    margin: 0;
  }
  .items {
    min-width: 100%;
    overflow-x: auto;
    display: flex;
    gap: 20px;
    padding: 10px;
    flex-basis: 240px;
    .item {
      flex: 1 1 0;

      border: 1px solid #f3f3f3;
      border-radius: 40px;
      transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;

      &:hover {
        box-shadow: 0px 20px 35px rgba(0, 0, 0, 0.06);
        transform: translateY(-5px);
      }
      padding: 0 20px 20px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    img {
      margin: 0 16px;
      width: 100px;
      height: 100px;
    }
    p {
      margin: 0;
      font-size: 14px;
      text-align: center;
      word-wrap: break-word;
    }
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
}
</style>
