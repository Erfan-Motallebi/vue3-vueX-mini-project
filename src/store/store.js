import axios from "axios";
import { createStore } from "vuex";

// create a new store instance

const moduleA = {
  state: () => ({
    count: 0,
    people: [],
  }),
  mutations: {
    countUp(state, eventCount) {
      state.count = state.count + eventCount;
    },
    countDown(state, oddCount) {
      state.count = state.count - oddCount;
    },
    getAPIName(state, names) {
      // console.log(typeof names);
      state.people = names.map((person) => person.name);
    },
  },
  actions: {
    countUp({ commit }, eventCount) {
      commit("countUp", eventCount);
    },
    countDown({ commit }, { oddCount }) {
      console.log(oddCount);
      commit("countDown", oddCount);
    },
    getAPIName({ commit }) {
      !(async () => {
        try {
          const result = await axios.get(
            "http://api.open-notify.org/astros.json"
          );
          commit("getAPIName", result.data.people);
        } catch (error) {
          console.log(error.message);
        }
      })();
    },
  },
  getters: {
    countPeople: (state) => (id) => {
      return state.people.length <= id;
    },
  },
};

const moduleB = {
  namespaced: true,
  state: () => ({
    products: [
      { id: 1, name: "Shoes", price: 20 },
      { id: 2, name: "Shorts", price: 40 },
      { id: 3, name: "T-shirts", price: 60 },
      { id: 4, name: "Trousers", price: 80 },
      { id: 5, name: "Necklaces", price: 100 },
      { id: 6, name: "Hats", price: 120 },
    ],
    soldProducts: [],
  }),
  getters: {
    // eslint-disable-next-line no-unused-vars
    saleProducts(state, getters, rootState) {
      const halfPrice = state.products.map((cost) => {
        if (state.products.length < rootState.counter) {
          return cost.price / 2;
        }
      });
      return halfPrice;
    },
  },
  mutations: {
    showId(state, sold) {
      state.soldProducts = sold;
    },
  },
  actions: {
    showId({ state, commit, rootState }) {
      const newProducts = state.products.map((product) => {
        if (product.id < rootState.counter) {
          return product.name;
        } else {
          return true;
        }
      });
      if (newProducts) {
        commit("showId", newProducts);
      } else {
        console.log(new Error("failed to find the products IDs"));
      }
    },
  },
};

const store = createStore({
  state: {
    counter: 10,
  },
  modules: {
    eventA: moduleA,
    eventB: moduleB,
  },
});

export default store;
