<template>
  <div>
    <p v-for="product in products" :key="product.id">{{ product.price }}$</p>
  </div>
</template>

<script>
export default {
  name: "ProductPrice",
  computed: {
    products: function() {
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
  border: red 1px solid;
  padding: 10px 14px;
  width: 100px;
  margin: 5px;
  box-shadow: 0 0 30px 3px darkgray;
}
</style>
