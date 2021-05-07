<template>
  <product-list />
  <product-price />
  <h2>{{ $store.state.eventA.count }}</h2>
  <button v-on:click="increment()">ADD</button> <br />
  <button v-on:click="decrement()">Subtract</button> <br />
  <button v-on:click="showAPI()">People</button>
  <button @click="$store.dispatch('eventB/showId')">soldProducts ID</button>

  <div v-if="$store.getters.countPeople(10)">
    <p v-for="(person, index) in $store.state.eventA.people" :key="index">
      {{ person }}
    </p>
  </div>
  <div v-if="$store.state.eventB.soldProducts.length > 1">
    <p v-for="(sold, index) in $store.state.eventB.soldProducts" :key="index">
      {{ sold }}
    </p>
  </div>
  <div>
    <p
      v-for="(half, index) in $store.getters['eventB/saleProducts']"
      :key="index"
    >
      {{ half }}
    </p>
  </div>
</template>

<script>
import ProductList from "./components/ProductList.vue";
import ProductPrice from "./components/ProductPrice";
import { mapActions } from "vuex";

export default {
  components: { ProductList, ProductPrice },
  name: "App",
  data() {
    return {
      evenCount: 2,
      oddCount: 3,
    };
  },
  methods: {
    increment() {
      this.$store.commit("countUp", this.evenCount);
    },
    ...mapActions({
      showAPI: "getAPIName",
    }),
    decrement() {
      this.$store.dispatch({
        type: "countDown",
        oddCount: this.oddCount,
      });
    },

    // decrement() {
    //   this.$store.dispatch("countDown", this.oddCount);
    // },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
button {
  margin: 5px;
  position: relative;
  left: 45%;
  color: red;
}
p {
  width: 80%;
  margin: 10px auto;
  text-align: center;
  border: 1px solid purple;
  box-shadow: 0 0 20px 4px gray, 0 0 10px 2px red;
  width: 20%;
  font-size: 1.2rem;
  font-family: "Courier New", Courier, monospace;
}
h2 {
  width: 50%;
  margin: auto;
  text-align: center;
}
</style>
