<template>
  <div class="product-list">
    <Product v-for="product in products" :key="product.id" :product="product" @add-to-cart="addToCart" />
  </div>
</template>

<script>
import Product from './Product.vue';

export default {
  name: 'ProductListComponent',
  components: {
    Product,
  },
  data() {
    return {
      products: [], // Initialize products as an empty array
    };
  },
  created() {
    // Call fetchProducts method when the component is created
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch('http://localhost:3000/Products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        this.products = data; // Assuming data is an array of products from API
      } catch (error) {
        console.error('Error fetching products:', error);
        // Handle error, show message, etc.
      }
    },
    addToCart(product) {
      if (this.$store.getters.isLoggedIn) {
        console.log('Adding to cart:', product);
        this.$store.commit('addToCart', product);
        this.$router.push('/cart');
      } else {
        alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
        // Redirect to login page or show login modal
      }
    },
  },
};
</script>

<style scoped>
/* Your ProductList styles here */
</style>
