<!-- ShoppingCartPage.vue -->
<template>
    <div class="shopping-cart-page">
      <Navbar />
      <Checkout />
      <Footer />
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue';
  import Checkout from '@/components/Checkout.vue'
  import Footer from '@/components/Footer.vue';
  
  export default {
    name: 'ShoppingCartPage',
    components: {
      Navbar,
      Checkout,
      Footer,
    },
  };
  </script>
  
  <style scoped>
  /* Your ShoppingCartPage styles here */
  </style>
  