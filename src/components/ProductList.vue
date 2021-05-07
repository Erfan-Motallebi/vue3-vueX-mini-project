<template>
  <div>
    <p v-for="product in products" :key="product.id">
      {{ product.name }}
    </p>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  computed: {
    products() {
      return this.$store.state.eventB.products;
    },
  },
};
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
}
div p {
  padding: 10px 14px;
  border: 1px solid darkgray;
  margin: 5px;
  width: 100px;
  box-shadow: 0 0 30px 3px darkgray;
}
</style>
